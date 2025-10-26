import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

export default function ResultPanel({ cgpa, performance }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 90, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="fixed inset-x-0 bottom-[72px] z-20 px-3 sm:bottom-16 print:static print:px-0"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
      >
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/85 sm:px-5 sm:py-4 print:rounded-none print:border-0 print:shadow-none">
          {cgpa == null ? (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300 print:justify-start">
              <Award className="h-4 w-4 text-slate-400" />
              Your CGPA will appear here after calculation.
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-xs">Final Result</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Performance: <span className={`font-medium ${performance.color}`}>{performance.label}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">Your CGPA</div>
                <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{cgpa.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
