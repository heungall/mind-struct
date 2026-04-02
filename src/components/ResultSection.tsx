"use client";

import type { StructuredResult } from "@/app/page";

interface Props {
  result: StructuredResult;
  onRegenerate: () => void;
  loading: boolean;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function formatResultAsText(result: StructuredResult): string {
  return `[상황 요약]
${result.situationSummary}

[핵심 문제]
${result.coreProblem}

[현재 제약]
${result.constraints}

[가능한 선택지]
1. ${result.options[0]}
2. ${result.options[1]}
3. ${result.options[2]}

[추천 액션]
${result.recommendedAction}
${result.recommendedReason}`;
}

function downloadAsFile(result: StructuredResult, format: "txt" | "md") {
  const text = formatResultAsText(result);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `structured-thought.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ResultSection({
  result,
  onRegenerate,
  loading,
}: Props) {
  const fullText = formatResultAsText(result);

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          className="px-3.5 py-1.5 bg-primary text-on-primary rounded-full text-xs font-semibold hover:translate-y-[-1px] transition-all active:scale-95 flex items-center gap-1"
          onClick={() => copyToClipboard(fullText)}
        >
          <span className="material-symbols-outlined text-sm">content_copy</span>
          전체 복사
        </button>
        <button
          className="px-3.5 py-1.5 bg-surface-container-high text-on-surface rounded-full text-xs font-semibold hover:translate-y-[-1px] transition-all active:scale-95 flex items-center gap-1"
          onClick={() => downloadAsFile(result, "md")}
        >
          <span className="material-symbols-outlined text-sm">download</span>
          다운로드
        </button>
        <button
          className="px-3.5 py-1.5 bg-surface-container-high text-on-surface rounded-full text-xs font-semibold hover:translate-y-[-1px] transition-all active:scale-95 flex items-center gap-1 disabled:opacity-50"
          onClick={onRegenerate}
          disabled={loading}
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          재생성
        </button>
      </div>

      {/* Situation Summary */}
      <div className="bg-surface-container-lowest p-5 rounded-xl editorial-shadow border-l-4 border-primary">
        <h3 className="font-headline text-xs font-bold flex items-center gap-1.5 mb-2 text-primary uppercase tracking-wide">
          <span className="material-symbols-outlined text-base">summarize</span>
          상황 요약
        </h3>
        <p className="text-on-surface leading-relaxed text-sm">
          {result.situationSummary}
        </p>
      </div>

      {/* Core Problem & Constraints */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container-low p-4 rounded-xl">
          <h3 className="font-headline text-xs font-bold mb-2 flex items-center gap-1.5 text-error uppercase tracking-wide">
            <span className="material-symbols-outlined text-base">report_problem</span>
            핵심 문제
          </h3>
          <p className="text-on-surface-variant leading-relaxed text-xs">
            {result.coreProblem}
          </p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl">
          <h3 className="font-headline text-xs font-bold mb-2 flex items-center gap-1.5 text-secondary uppercase tracking-wide">
            <span className="material-symbols-outlined text-base">block</span>
            현재 제약
          </h3>
          <p className="text-on-surface-variant leading-relaxed text-xs">
            {result.constraints}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="bg-surface-container-lowest p-5 rounded-xl editorial-shadow">
        <h3 className="font-headline text-xs font-bold mb-3 flex items-center gap-1.5 text-primary uppercase tracking-wide">
          <span className="material-symbols-outlined text-base">alt_route</span>
          가능한 선택지
        </h3>
        <ul className="space-y-2.5">
          {result.options.map((option, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span className="text-primary font-bold text-xs mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-on-surface text-xs leading-relaxed">{option}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Action */}
      <div className="bg-primary text-on-primary p-5 rounded-xl">
        <h3 className="font-headline text-xs font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wide opacity-80">
          <span
            className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stars
          </span>
          추천 액션
        </h3>
        <p className="text-primary-fixed-dim text-base font-bold leading-snug">
          {result.recommendedAction}
        </p>
        <p className="mt-3 text-xs opacity-85 leading-relaxed">
          {result.recommendedReason}
        </p>
      </div>
    </div>
  );
}
