export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50/70 backdrop-blur-xl">
      <nav className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
        <div className="text-2xl font-bold font-headline text-slate-900 tracking-tight">
          Mind Struct
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-out">
            <span className="material-symbols-outlined text-slate-500">
              settings
            </span>
          </button>
          <button className="p-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-out">
            <span className="material-symbols-outlined text-indigo-600">
              account_circle
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
