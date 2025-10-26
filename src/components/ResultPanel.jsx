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
        className="fixed inset-x-0 bottom-16 z-20"
      >
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-xl backdrop-blur">
          {cgpa == null ? (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <Award className="h-4 w-4 text-slate-400" />
              Your CGPA will appear here after calculation.
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Final Result</div>
                <div className="text-sm text-slate-600">
                  Performance: <span className={`font-medium ${performance.color}`}>{performance.label}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Your CGPA</div>
                <div className="text-3xl font-extrabold tracking-tight text-slate-900">{cgpa.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
