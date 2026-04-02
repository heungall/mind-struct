import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const BUSINESS_PROMPT = `너는 사용자의 생각을 "구조화"하는 도구다.

절대 해석하거나 과장하지 말고,
사용자가 말한 내용 안에서만 정리해라.

톤: 회사 보고용. 간결하고 딱딱하게. 감정 표현 최소화.

출력은 반드시 아래 JSON 형식으로만 응답해라 (다른 텍스트 없이 순수 JSON만):
{
  "situationSummary": "상황 요약 (1-2문장)",
  "coreProblem": "핵심 문제 (1-2문장)",
  "constraints": "현재 제약 사항 (1-2문장)",
  "options": ["선택지1", "선택지2", "선택지3"],
  "recommendedAction": "추천 액션 제목 (간결하게)",
  "recommendedReason": "추천 이유 (1-2문장)"
}

규칙:
- 문장은 짧고 명확하게
- 감정 표현 최소화
- 새로운 정보 추가 금지
- 반드시 유효한 JSON으로만 응답`;

const COACHING_PROMPT = `너는 사용자의 생각을 "구조화"하는 도구다.

절대 해석하거나 과장하지 말고,
사용자가 말한 내용 안에서만 정리해라.

톤: 자기코칭용. 부드럽고 따뜻하게. 공감과 성찰을 돕는 문체.

출력은 반드시 아래 JSON 형식으로만 응답해라 (다른 텍스트 없이 순수 JSON만):
{
  "situationSummary": "상황 요약 (1-2문장)",
  "coreProblem": "핵심 문제 (1-2문장)",
  "constraints": "현재 제약 사항 (1-2문장)",
  "options": ["선택지1", "선택지2", "선택지3"],
  "recommendedAction": "추천 액션 제목 (간결하게)",
  "recommendedReason": "추천 이유 (1-2문장)"
}

규칙:
- 문장은 따뜻하되 명확하게
- 사용자의 감정을 존중하되 과장하지 말 것
- 새로운 정보 추가 금지
- 반드시 유효한 JSON으로만 응답`;

const FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite-preview",
];

export async function POST(request: NextRequest) {
  try {
    const { text, tone } = await request.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "텍스트를 입력해주세요." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const prompt = tone === "coaching" ? COACHING_PROMPT : BUSINESS_PROMPT;
    const fullPrompt = `${prompt}\n\n사용자 입력:\n${text}`;

    let lastError: unknown = null;

    for (const modelName of FALLBACK_MODELS) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        const response = result.response.text();

        // Extract JSON from response (handle markdown code blocks, thinking text, etc.)
        let jsonStr = response;
        const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          jsonStr = codeBlockMatch[1].trim();
        } else {
          const braceMatch = response.match(/\{[\s\S]*\}/);
          if (braceMatch) {
            jsonStr = braceMatch[0];
          }
        }

        const parsed = JSON.parse(jsonStr);

        // Validate structure
        if (
          !parsed.situationSummary ||
          !parsed.coreProblem ||
          !parsed.constraints ||
          !Array.isArray(parsed.options) ||
          parsed.options.length < 3 ||
          !parsed.recommendedAction ||
          !parsed.recommendedReason
        ) {
          throw new Error("Invalid response structure");
        }

        console.log(`Success with model: ${modelName}`);
        return NextResponse.json(parsed);
      } catch (err) {
        console.warn(`Model ${modelName} failed:`, err instanceof Error ? err.message : err);
        lastError = err;
      }
    }

    console.error("All models failed. Last error:", lastError);
    return NextResponse.json(
      { error: "모든 모델의 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요." },
      { status: 503 }
    );
  } catch (error) {
    console.error("Structurize error:", error);
    return NextResponse.json(
      { error: "구조화에 실패했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
