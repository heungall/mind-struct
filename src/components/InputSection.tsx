"use client";

import { useState } from "react";
import type { Tone } from "@/app/page";

interface Props {
  loading: boolean;
  error: string | null;
  onStructurize: (text: string, tone: Tone) => void;
}

export default function InputSection({ loading, error, onStructurize }: Props) {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("business");

  return (
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
          onClick={() => onStructurize(input, tone)}
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
  );
}
