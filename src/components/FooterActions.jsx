export default function FooterActions({ onCalculate, onReset }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row">
        <div className="text-xs text-slate-500">
          Inputs are validated and clamped to their maximums. Re Mid replaces the original component if higher.
        </div>
        <div className="flex gap-2">
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
