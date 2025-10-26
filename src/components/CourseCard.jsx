import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeIn = (i) => ({
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.04 * i, duration: 0.35 } },
});

const gradeColor = (g) => {
  switch (g) {
    case "A":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900";
    case "B":
      return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-900";
    case "C":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900";
    case "D":
      return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-900";
    case "F":
      return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  }
};

export default function CourseCard({ index = 0, course, values = {}, result, onChange, onCalculate, onClear, isElective = false, electiveLabel, electiveOptions = [], selectedOptionId, onSelectOption }) {
  const [open, setOpen] = useState(true);
  const percent = result?.percent ?? null;
  const progress = useMemo(() => Math.min(Math.max(percent ?? 0, 0), 100), [percent]);

  return (
    <motion.div
      variants={fadeIn(index)}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500/60 via-sky-400/60 to-sky-500/60" />

      <div className="flex w-full items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{course.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{course.code} • {course.credits} credits</p>
        </div>
        <div className="flex items-center gap-2">
          {isElective ? (
            <div className="flex items-center gap-2">
              <label className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">{electiveLabel}</label>
              <select
                aria-label="Select elective"
                value={selectedOptionId}
                onChange={(e) => onSelectOption?.(e.target.value)}
                className="max-w-[220px] truncate rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none ring-sky-200 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {electiveOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-slate-200 p-1 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle course details"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden px-4 pb-4"
      >
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {course.components.map((comp) => (
            <div key={comp.key} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 sm:text-xs">
                {comp.label} <span className="text-slate-400 dark:text-slate-500">(max {comp.max})</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={values?.[comp.key] ?? ""}
                onChange={(e) => onChange(comp.key, e.target.value, comp.max)}
                placeholder="0"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-200 placeholder:text-slate-300 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>Progress</span>
            <span>{percent != null ? `${percent}%` : "0%"}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {result ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-50 px-2 py-0.5 dark:bg-slate-800">Total: <span className="font-semibold text-slate-900 dark:text-white">{result.total}</span></span>
                <span className="rounded-md bg-slate-50 px-2 py-0.5 dark:bg-slate-800">{result.percent}%</span>
                <span className={`rounded-md border px-2 py-0.5 font-medium ${gradeColor(result.grade)}`}>Grade: {result.grade}</span>
                <span className="rounded-md bg-slate-50 px-2 py-0.5 dark:bg-slate-800">Points: <span className="font-semibold">{result.points}</span></span>
              </div>
            ) : (
              <span className="text-slate-400 dark:text-slate-500">Fill marks and calculate</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
            <button
              onClick={onClear}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Clear
            </button>
            <button
              onClick={onCalculate}
              className="col-span-2 rounded-lg bg-sky-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98] sm:col-span-1"
            >
              Calculate Subject
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
