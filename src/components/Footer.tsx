export default function Footer() {
  return (
    <footer className="w-full py-12 mt-24 bg-slate-50 border-t border-slate-200/20">
      <div className="flex flex-col items-center justify-center gap-4 text-center w-full max-w-screen-2xl mx-auto px-6">
        <p className="font-body text-xs tracking-widest uppercase opacity-60">
          &copy; 2024 Thought Structurer. An Editorial Sanctuary for the Mind.
        </p>
        <div className="flex gap-8">
          <a
            className="font-body text-xs tracking-widest uppercase text-slate-400 hover:underline"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body text-xs tracking-widest uppercase text-slate-400 hover:underline"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body text-xs tracking-widest uppercase text-slate-400 hover:underline"
            href="#"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
