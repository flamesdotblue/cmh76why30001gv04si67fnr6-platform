import { GraduationCap, Gauge } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ totalCredits, coursesCount, computedCount, selectedYear, onChangeYear }) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="rounded-xl bg-white/15 p-2"
          >
            <GraduationCap className="h-5 w-5" />
          </motion.div>
          <div>
            <h1 className="text-base font-semibold tracking-tight sm:text-lg">SRU CGPA Calculator</h1>
            <p className="text-[10px] text-white/85 sm:text-xs">Relative grading • Credit-weighted CGPA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs sm:flex">
            <Gauge className="h-4 w-4 opacity-90" />
            <span>
              {computedCount ?? 0}/{coursesCount ?? 0} calculated • {totalCredits ?? 0} credits
            </span>
          </div>
          <select
            aria-label="Select year"
            value={selectedYear}
            onChange={(e) => onChangeYear?.(e.target.value)}
            className="rounded-md border-none bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 outline-none ring-2 ring-white/20 focus:ring-white/40 sm:text-sm"
          >
            <option value="third">3rd Year</option>
            <option value="first">1st Year</option>
          </select>
        </div>
      </div>
    </header>
  );
}
