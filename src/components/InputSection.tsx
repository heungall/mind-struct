import type { Tone } from "@/app/page";

interface Props {
  input: string;
  setInput: (value: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  loading: boolean;
  onStructurize: () => void;
}

export default function InputSection({
  input,
  setInput,
  tone,
  setTone,
  loading,
  onStructurize,
}: Props) {
  return (
    <section className="lg:col-span-7 flex flex-col gap-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200" />
        <div className="relative bg-surface-container-low rounded-2xl overflow-hidden transition-all duration-300 focus-within:bg-surface-container-lowest focus-within:editorial-shadow">
          <textarea
            className="w-full h-80 p-10 bg-transparent border-none focus:ring-0 focus:outline-none text-xl font-body text-on-surface placeholder:text-outline/50 resize-none"
            placeholder="지금 머릿속 생각을 편하게 적어주세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container p-6 rounded-2xl">
        {/* Tone Selector */}
        <div className="flex items-center gap-3 bg-surface-container-high p-1.5 rounded-full w-full md:w-auto">
          <button
            className={`flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              tone === "business"
                ? "bg-primary text-on-primary editorial-shadow"
                : "text-on-surface-variant hover:bg-surface-container-highest/50"
            }`}
            onClick={() => setTone("business")}
          >
            회사용
          </button>
          <button
            className={`flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
          className="w-full md:w-auto px-10 py-3.5 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-full font-bold tracking-tight shadow-lg hover:translate-y-[-2px] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          onClick={onStructurize}
          disabled={loading || !input.trim()}
        >
          <span>{loading ? "구조화 중..." : "구조화하기"}</span>
          <span className="material-symbols-outlined text-lg">
            {loading ? "progress_activity" : "auto_awesome"}
          </span>
        </button>
      </div>
    </section>
  );
}
