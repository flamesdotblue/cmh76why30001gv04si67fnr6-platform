import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="rounded-lg bg-sky-100 p-2 text-sky-600">
          <GraduationCap className="h-5 w-5" />
        </motion.div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">SRU CGPA Calculator</h1>
          <p className="text-xs text-slate-600">Relative grading with credit-weighted CGPA</p>
        </div>
      </div>
    </header>
  );
}
