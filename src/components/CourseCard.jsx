import { motion } from "framer-motion";

const fadeIn = (i) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.04 * i, duration: 0.35 } },
});

export default function CourseCard({ index = 0, course, values = {}, result, onChange, onCalculate, onClear }) {
  return (
    <motion.div variants={fadeIn(index)} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} className="group relative rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:shadow">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{course.name}</h3>
          <p className="text-xs text-slate-500">{course.code} • {course.credits} credits</p>
        </div>
        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">/ {course.maxTotal}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {course.components.map((comp) => (
          <div key={comp.key} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">{comp.label} <span className="text-slate-400">(max {comp.max})</span></label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={values?.[comp.key] ?? ""}
              onChange={(e) => onChange(comp.key, e.target.value, comp.max)}
              placeholder="0"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-200 placeholder:text-slate-300 focus:ring"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          {result ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-md bg-slate-50 px-2 py-0.5">Total: <span className="font-semibold text-slate-900">{result.total}</span></span>
              <span className="rounded-md bg-slate-50 px-2 py-0.5">{result.percent}%</span>
              <span className="rounded-md bg-slate-50 px-2 py-0.5">Grade: <span className="font-semibold">{result.grade}</span></span>
              <span className="rounded-md bg-slate-50 px-2 py-0.5">Points: <span className="font-semibold">{result.points}</span></span>
            </div>
          ) : (
            <span className="text-slate-400">Fill marks and calculate</span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={onClear} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Clear</button>
          <button onClick={onCalculate} className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-700">Calculate Subject</button>
        </div>
      </div>
    </motion.div>
  );
}
