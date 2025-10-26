export default function FooterActions({ onCalculate, onReset }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
        <div className="text-[11px] leading-4 text-slate-500 sm:text-xs">
          Inputs are validated and clamped to their maximums. Re Mid replaces the original component if higher.
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          >
            Reset All
          </button>
          <button
            onClick={onCalculate}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Calculate CGPA
          </button>
        </div>
      </div>
    </div>
  );
}
