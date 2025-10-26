export default function FooterActions({ onCalculate, onReset, onExport, statusLabel }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-slate-800 dark:bg-slate-900/90 print:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 py-1.5 sm:py-2">
          <div className="flex-1 truncate text-[11px] leading-4 text-slate-600 dark:text-slate-400 sm:text-xs">
            {statusLabel}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Reset
            </button>
            <button
              onClick={onCalculate}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              Calculate
            </button>
            <button
              onClick={onExport}
              className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Export PDF
            </button>
          </div>
        </div>
        <div className="pb-2 text-[11px] leading-4 text-slate-500 dark:text-slate-400 sm:text-xs">
          Inputs are validated and clamped to their maximums. Re Mid replaces the original component if higher.
        </div>
      </div>
    </div>
  );
}
