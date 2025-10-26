export default function FooterActions({ onCalculate, onReset }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="text-xs text-slate-500">Marks outside allowed ranges are clamped automatically.</div>
        <div className="flex gap-2">
          <button onClick={onReset} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Reset All</button>
          <button onClick={onCalculate} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Calculate CGPA</button>
        </div>
      </div>
    </div>
  );
}
