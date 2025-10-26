import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import ResultPanel from "./components/ResultPanel";
import FooterActions from "./components/FooterActions";

// Course sets for different years with elective groups for 3rd year
const THIRD_YEAR_BASE = [
  {
    id: "cloud",
    name: "Cloud Computing",
    code: "23CS101ES301",
    credits: 2,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid", max: 20 },
      { key: "cert", label: "Certifications", max: 5 },
      { key: "labExam", label: "Lab Exam", max: 10 },
      { key: "labTest", label: "Lab Test", max: 10 },
      { key: "classTest", label: "Class Test", max: 5 },
      { key: "project", label: "Project", max: 10 },
      { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term", max: 40 },
    ],
  },
  {
    id: "swe",
    name: "Software Eng. & System Design",
    code: "23CS201PC302",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid", max: 20 },
      { key: "classTest", label: "Class Test", max: 10 },
      { key: "labExam", label: "Lab Exam", max: 20 },
      { key: "project", label: "Project", max: 5 },
      { key: "cert", label: "Certifications", max: 5 },
      { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term", max: 40 },
    ],
  },
  {
    id: "qla",
    name: "Quantitative Aptitude & Logical Reasoning",
    code: "23HS102CR202",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "ut1", label: "UT1", max: 20 },
      { key: "ut2", label: "UT2", max: 20 },
      { key: "ut3", label: "UT3", max: 20 },
      { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "ut3" },
      { key: "end", label: "End Term", max: 40 },
    ],
  },
  {
    // Elective Group: Open Elective
    id: "elec_oe",
    type: "elective",
    label: "Open Elective",
    options: [
      {
        id: "fin",
        name: "Financial Accounting and Management",
        code: "23SB300OE307",
        credits: 3,
        maxTotal: 100,
        components: [
          { key: "mid", label: "Mid Term Examination", max: 20 },
          { key: "classTest", label: "Class Test", max: 10 },
          { key: "assignment", label: "Assignment", max: 15 },
          { key: "cert", label: "Certification", max: 10 },
          { key: "quiz", label: "Quiz", max: 5 },
          { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "mid" },
          { key: "end", label: "End Term Examination", max: 40 },
        ],
      },
      {
        id: "lhtl",
        name: "Learning How to Learn",
        code: "23EN300OE302",
        credits: 3,
        maxTotal: 100,
        components: [
          { key: "mid", label: "Mid Term Examination", max: 20 },
          { key: "smp", label: "Social Media Post", max: 20 },
          { key: "cie", label: "Continuous Internal Evaluation", max: 20 },
          { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "mid" },
          { key: "end", label: "End Term Examination", max: 40 },
        ],
      },
    ],
  },
  {
    id: "toc",
    name: "Theory of Computation",
    code: "23CS300PC301",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid", max: 30 },
      { key: "classTest", label: "Class Test", max: 30 },
      { key: "end", label: "End Term", max: 40 },
    ],
  },
  {
    id: "sei",
    name: "Sustainability and Ethical Innovation",
    code: "23CE200HS310",
    credits: 2,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid Term Examination", max: 30 },
      { key: "classTest", label: "Class Test", max: 20 },
      { key: "remid", label: "Re Mid (optional)", max: 30, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term Examination", max: 50 },
    ],
  },
  {
    // Elective Group: AI Specialization
    id: "elec_ai",
    type: "elective",
    label: "AI Specialization",
    options: [
      {
        id: "aiuav",
        name: "AI Technologies in Unmanned Aerial Vehicles",
        code: "23CA201SE404",
        credits: 3,
        maxTotal: 100,
        components: [
          { key: "mid", label: "Mid Term Examination", max: 15 },
          { key: "classTest", label: "Class Test", max: 10 },
          { key: "cert", label: "Certifications/Workshops/Webinars", max: 7 },
          { key: "cae", label: "Continuous Activity Evaluation", max: 5 },
          { key: "labExam", label: "Lab Exam", max: 10 },
          { key: "hackathon", label: "Hackathon", max: 8 },
          { key: "project", label: "Project", max: 15 },
          { key: "remid", label: "Re Mid (optional)", max: 15, type: "remid", replaces: "mid" },
          { key: "end", label: "End Term Examination", max: 30 },
        ],
      },
      {
        id: "eai",
        name: "Explainable AI",
        code: "23CA201SE402",
        credits: 3,
        maxTotal: 100,
        components: [
          { key: "mid", label: "Mid Term Examination", max: 30 },
          { key: "midLab", label: "Mid Lab Exam", max: 10 },
          { key: "endLab", label: "End Lab Exam", max: 10 },
          { key: "project", label: "Project", max: 5 },
          { key: "review", label: "Review paper writing", max: 5 },
          { key: "remid", label: "Re Mid (optional)", max: 30, type: "remid", replaces: "mid" },
          { key: "end", label: "End Term Examination", max: 40 },
        ],
      },
    ],
  },
];

const FIRST_YEAR = [
  {
    id: "dm1",
    name: "DISCRETE MATHEMATICS",
    code: "25CAI310PC101",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid Term Examination", max: 25 },
      { key: "cert", label: "Certification", max: 10 },
      { key: "recitation", label: "Recitation", max: 10 },
      { key: "classTest", label: "Class Test", max: 15 },
      { key: "remid", label: "Re Mid (optional)", max: 25, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term Examination", max: 40 },
    ],
  },
  {
    id: "life1",
    name: "LIFE SKILLS: ENTREPRENEURSHIP, LANGUAGE, COMMUNICATION AND PERSONALITY",
    code: "25HUM204HS101",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid Term Examination", max: 30 },
      { key: "presentation", label: "Presentation", max: 10 },
      { key: "assignment", label: "Assignment", max: 10 },
      { key: "project", label: "Project Internal", max: 10 },
      { key: "remid", label: "Re Mid (optional)", max: 30, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term Examination", max: 40 },
    ],
  },
  {
    id: "calc1",
    name: "CALCULUS AND DIFFERENTIAL EQUATIONS",
    code: "25MAT310BS107",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid Term Examination", max: 25 },
      { key: "classTest", label: "Class Test", max: 15 },
      { key: "cert", label: "Certification", max: 5 },
      { key: "presentation", label: "Presentation", max: 5 },
      { key: "recitation", label: "Recitation", max: 10 },
      { key: "remid", label: "Re Mid (optional)", max: 25, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term Examination", max: 40 },
    ],
  },
  {
    id: "ccbio1",
    name: "COMPUTATIONAL CHEMISTRY AND BIOLOGY",
    code: "25SCI202BS106",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid Term Examination", max: 30 },
      { key: "classTest", label: "Class Test", max: 10 },
      { key: "labExam", label: "Lab Exam", max: 10 },
      { key: "labTest", label: "Lab Test", max: 10 },
      { key: "remid", label: "Re Mid (optional)", max: 30, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term Examination", max: 40 },
    ],
  },
  {
    id: "apcs1",
    name: "Applied Physics for Computer Science and Engineering",
    code: "25SCI312BS101",
    credits: 3,
    maxTotal: 100,
    components: [
      { key: "mid", label: "Mid Term Examination", max: 20 },
      { key: "classTest", label: "Class Test", max: 10 },
      { key: "labTest", label: "Lab Test", max: 5 },
      { key: "recitation", label: "Recitation", max: 10 },
      { key: "labExam", label: "Lab Exam", max: 15 },
      { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "mid" },
      { key: "end", label: "End Term Examination", max: 40 },
    ],
  },
];

const COURSES_BY_YEAR = {
  third: THIRD_YEAR_BASE,
  first: FIRST_YEAR,
};

const gradeFromPercent = (percent) => {
  if (percent >= 85) return { grade: "A", points: 10 };
  if (percent >= 70) return { grade: "B", points: 8 };
  if (percent >= 55) return { grade: "C", points: 6 };
  if (percent >= 40) return { grade: "D", points: 5 };
  return { grade: "F", points: 0 };
};

export default function App() {
  const [yearKey, setYearKey] = useState("third");
  const [electiveSelections, setElectiveSelections] = useState({
    elec_ai: 0,
    elec_oe: 0,
  });
  const [theme, setTheme] = useState("light");

  // Apply dark mode class on mount and when theme changes
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Resolve active courses based on year and elective selections
  const ACTIVE_COURSES = useMemo(() => {
    const base = COURSES_BY_YEAR[yearKey] || [];
    const list = [];
    for (const item of base) {
      if (item.type === "elective") {
        const idx = electiveSelections[item.id] ?? 0;
        const opt = item.options[idx] || item.options[0];
        list.push(opt);
      } else {
        list.push(item);
      }
    }
    return list;
  }, [yearKey, electiveSelections]);

  const totalCredits = useMemo(() => ACTIVE_COURSES.reduce((s, c) => s + (c.credits || 0), 0), [ACTIVE_COURSES]);

  // Initialize marks based on currently active courses
  const initialMarks = useMemo(() => {
    const base = {};
    for (const c of ACTIVE_COURSES) {
      base[c.id] = {};
      for (const comp of c.components) base[c.id][comp.key] = "";
    }
    return base;
  }, [ACTIVE_COURSES]);

  const [marks, setMarks] = useState(initialMarks);
  const [results, setResults] = useState({});
  const [cgpa, setCgpa] = useState(null);

  // Reset all when the active course set changes (year or electives global change)
  useEffect(() => {
    setMarks(initialMarks);
    setResults({});
    setCgpa(null);
  }, [initialMarks]);

  const handleInputChange = (courseId, key, value, max) => {
    let v = (value ?? "").toString().replace(/\D/g, "");
    if (v === "") {
      setMarks((prev) => ({ ...prev, [courseId]: { ...prev[courseId], [key]: "" } }));
      return;
    }
    let num = parseInt(v, 10);
    if (Number.isNaN(num) || num < 0) num = 0;
    if (typeof max === "number") num = Math.min(num, max);
    setMarks((prev) => ({ ...prev, [courseId]: { ...prev[courseId], [key]: String(num) } }));
  };

  const calculateCourse = (course) => {
    const vals = marks[course.id] || {};
    let total = 0;

    const valueOf = (key) => {
      const raw = parseInt(vals[key], 10);
      return Number.isFinite(raw) ? raw : 0;
    };

    const remidEntries = course.components.filter((c) => c.type === "remid");
    const replaced = new Set(remidEntries.map((r) => r.replaces));

    for (const comp of course.components) {
      if (comp.type === "remid") continue;
      const raw = valueOf(comp.key);
      if (replaced.has(comp.key)) {
        const remid = remidEntries.find((r) => r.replaces === comp.key);
        const remVal = valueOf(remid?.key);
        total += Math.max(raw, remVal);
      } else {
        total += raw;
      }
    }

    total = Math.min(total, course.maxTotal);
    const percent = (total / course.maxTotal) * 100;
    const { grade, points } = gradeFromPercent(percent);

    const courseResult = {
      total,
      percent: Number(percent.toFixed(2)),
      grade,
      points,
    };

    setResults((prev) => ({ ...prev, [course.id]: courseResult }));
    return courseResult;
  };

  const calculateAllCGPA = () => {
    let sumWeighted = 0;
    let sumCredits = 0;

    for (const course of ACTIVE_COURSES) {
      const res = results[course.id] || calculateCourse(course);
      if (!res) continue;
      sumWeighted += res.points * course.credits;
      sumCredits += course.credits;
    }

    if (sumCredits === 0) {
      setCgpa(null);
      return null;
    }

    const value = Number((sumWeighted / sumCredits).toFixed(2));
    setCgpa(value);
    return value;
  };

  const resetAll = () => {
    setMarks(initialMarks);
    setResults({});
    setCgpa(null);
  };

  const onChangeElective = (groupId, optionIndex) => {
    setElectiveSelections((prev) => ({ ...prev, [groupId]: optionIndex }));
    // marks/results reset is handled by initialMarks effect when ACTIVE_COURSES changes
  };

  const performance = useMemo(() => {
    if (cgpa == null) return { label: "", color: "" };
    if (cgpa >= 8.5) return { label: "Excellent", color: "text-emerald-600 dark:text-emerald-400" };
    if (cgpa >= 6.0) return { label: "Average", color: "text-amber-600 dark:text-amber-400" };
    return { label: "Needs Improvement", color: "text-rose-600 dark:text-rose-400" };
  }, [cgpa]);

  useEffect(() => {
    setCgpa(null);
  }, [marks]);

  const exportPDF = () => {
    window.print();
  };

  const computedCount = useMemo(
    () => Object.values(results).filter((r) => r && typeof r.points === "number").length,
    [results]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <Header
        totalCredits={totalCredits}
        coursesCount={ACTIVE_COURSES.length}
        computedCount={computedCount}
        selectedYear={yearKey}
        onChangeYear={(key) => setYearKey(key)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <main className="mx-auto max-w-7xl px-3 pb-[96px] pt-4 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 print:hidden"
        >
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Select year at the top. Enter marks for each component. Re Mid automatically replaces the original component if it’s higher. Tap “Calculate Subject”, then “Calculate CGPA”.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:mt-4 sm:flex sm:gap-2">
            <span className="rounded-lg bg-slate-50 px-3 py-1.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Total Credits: <span className="font-semibold text-slate-900 dark:text-white">{totalCredits}</span>
            </span>
            <span className="rounded-lg bg-slate-50 px-3 py-1.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Subjects: <span className="font-semibold text-slate-900 dark:text-white">{ACTIVE_COURSES.length}</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {COURSES_BY_YEAR[yearKey].map((item, idx) => {
              if (item.type === "elective") {
                const selectedIdx = electiveSelections[item.id] ?? 0;
                const active = item.options[selectedIdx] || item.options[0];
                const optionsForCard = item.options.map((o) => ({ id: o.id, name: o.name, code: o.code, credits: o.credits }));
                const res = results[active.id];
                return (
                  <CourseCard
                    key={`${item.id}-${selectedIdx}`}
                    index={idx}
                    course={active}
                    values={marks[active.id]}
                    result={res}
                    onChange={(key, value, max) => handleInputChange(active.id, key, value, max)}
                    onCalculate={() => calculateCourse(active)}
                    onClear={() => {
                      setMarks((prev) => ({ ...prev, [active.id]: Object.fromEntries(active.components.map((c) => [c.key, ""])) }));
                      setResults((prev) => ({ ...prev, [active.id]: undefined }));
                    }}
                    isElective
                    electiveLabel={item.label}
                    electiveOptions={optionsForCard}
                    selectedOptionId={active.id}
                    onSelectOption={(newId) => {
                      const newIndex = item.options.findIndex((o) => o.id === newId);
                      onChangeElective(item.id, newIndex >= 0 ? newIndex : 0);
                    }}
                  />
                );
              }
              const course = item;
              const res = results[course.id];
              return (
                <CourseCard
                  key={course.id}
                  index={idx}
                  course={course}
                  values={marks[course.id]}
                  result={res}
                  onChange={(key, value, max) => handleInputChange(course.id, key, value, max)}
                  onCalculate={() => calculateCourse(course)}
                  onClear={() => {
                    setMarks((prev) => ({ ...prev, [course.id]: Object.fromEntries(course.components.map((c) => [c.key, ""])) }));
                    setResults((prev) => ({ ...prev, [course.id]: undefined }));
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      <ResultPanel cgpa={cgpa} performance={performance} />

      <FooterActions onCalculate={calculateAllCGPA} onReset={resetAll} onExport={exportPDF} />
    </div>
  );
}
