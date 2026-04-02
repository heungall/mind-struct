"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import ResultSection from "@/components/ResultSection";
import AdBanner from "@/components/AdBanner";
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
  const [result, setResult] = useState<StructuredResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<{ text: string; tone: Tone } | null>(null);

  const handleStructurize = useCallback(async (text: string, tone: Tone) => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/structurize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "구조화에 실패했습니다.");
      }

      const data = await res.json();
      setResult(data);
      setLastRequest({ text, tone });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, []);

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
          <InputSection
            loading={loading}
            error={error}
            onStructurize={handleStructurize}
          />

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
                  <strong className="text-primary font-semibold">
                    구조화하기
                  </strong>
                  를 눌러보세요.
                </p>
              </div>
            )}

            {result && (
              <ResultSection
                result={result}
                onRegenerate={() => {
                  if (lastRequest) handleStructurize(lastRequest.text, lastRequest.tone);
                }}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>

      <AdBanner />
      <Footer />
    </>
  );
}
