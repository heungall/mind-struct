"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ResultSection from "@/components/ResultSection";
import Footer from "@/components/Footer";

export interface StructuredResult {
  situationSummary: string;
  coreProblem: string;
  constraints: string;
  options: string[];
  recommendedAction: string;
  recommendedReason: string;
}

export type Tone = "business" | "coaching";

export default function Home() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("business");
  const [result, setResult] = useState<StructuredResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStructurize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/structurize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "구조화에 실패했습니다.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="pt-24 pb-24 px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto">
        {/* Hero - compact */}
        <div className="mb-8">
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-background tracking-tight leading-tight mb-2">
            생각의 무질서를 <span className="text-primary">명료함</span>으로.
          </h1>
          <p className="text-on-surface-variant text-sm font-light max-w-xl">
            파편화된 생각들을 정제된 구조로 변환하세요.
          </p>
        </div>

        {/* Main Grid: Input (left) + Result (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Input + Controls */}
          <div className="flex flex-col gap-0">
            {/* Textarea */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-0 group-focus-within:opacity-50 transition duration-500" />
              <div className="relative bg-surface-container-low rounded-t-2xl overflow-hidden transition-all duration-300 focus-within:bg-surface-container-lowest focus-within:editorial-shadow">
                <textarea
                  className="w-full h-72 p-6 sm:p-8 bg-transparent border-none focus:ring-0 focus:outline-none text-base sm:text-lg font-body text-on-surface placeholder:text-outline/50 resize-none"
                  placeholder="지금 머릿속 생각을 편하게 적어주세요"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>

            {/* Control Bar - attached to textarea */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container p-4 rounded-b-2xl">
              {/* Tone Selector */}
              <div className="flex items-center bg-surface-container-high p-1 rounded-full w-full sm:w-auto">
                <button
                  className={`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    tone === "business"
                      ? "bg-primary text-on-primary editorial-shadow"
                      : "text-on-surface-variant hover:bg-surface-container-highest/50"
                  }`}
                  onClick={() => setTone("business")}
                >
                  회사용
                </button>
                <button
                  className={`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    tone === "coaching"
                      ? "bg-primary text-on-primary editorial-shadow"
                      : "text-on-surface-variant hover:bg-surface-container-highest/50"
                  }`}
                  onClick={() => setTone("coaching")}
                >
                  자기코칭용
                </button>
              </div>

              {/* CTA */}
              <button
                className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-full font-bold text-sm tracking-tight shadow-lg hover:translate-y-[-1px] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                onClick={handleStructurize}
                disabled={loading || !input.trim()}
              >
                <span>{loading ? "구조화 중..." : "구조화하기"}</span>
                <span className="material-symbols-outlined text-base">
                  {loading ? "progress_activity" : "auto_awesome"}
                </span>
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 bg-error-container/20 border border-error/30 rounded-xl text-error text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div>
            {loading && !result && (
              <div className="bg-surface-container-lowest editorial-shadow rounded-2xl p-10 flex flex-col items-center justify-center min-h-[380px]">
                <span className="material-symbols-outlined text-5xl text-primary animate-spin">
                  progress_activity
                </span>
                <p className="mt-4 text-on-surface-variant font-light text-sm">
                  생각을 구조화하고 있습니다...
                </p>
              </div>
            )}

            {!result && !loading && (
              <div className="bg-surface-container-lowest editorial-shadow rounded-2xl p-10 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <span className="material-symbols-outlined text-6xl text-primary/15 mb-4">
                  psychology
                </span>
                <p className="text-on-surface-variant font-light text-sm text-center leading-relaxed">
                  왼쪽에 생각을 입력하고
                  <br />
                  <strong className="text-primary font-semibold">구조화하기</strong>를
                  눌러보세요.
                </p>
              </div>
            )}

            {result && (
              <ResultSection
                result={result}
                onRegenerate={handleStructurize}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
