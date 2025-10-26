import { GraduationCap, Gauge } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ totalCredits, coursesCount, computedCount }) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
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
            <h1 className="text-lg font-semibold tracking-tight">SRU CGPA Calculator</h1>
            <p className="text-xs text-white/85">Relative grading • Credit-weighted CGPA</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs">
            <Gauge className="h-4 w-4 opacity-90" />
            <span>
              {computedCount ?? 0}/{coursesCount ?? 0} subjects calculated • {totalCredits ?? 0} credits
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
