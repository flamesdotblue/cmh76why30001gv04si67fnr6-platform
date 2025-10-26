import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import ResultPanel from "./components/ResultPanel";
import FooterActions from "./components/FooterActions";

// Course sets for different years
const COURSES_BY_YEAR = {
  third: [
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
      id: "fin",
      name: "Financial Accounting & Management",
      code: "23SB300OE307",
      credits: 3,
      maxTotal: 100,
      components: [
        { key: "mid", label: "Mid", max: 20 },
        { key: "classTest", label: "Class Test", max: 10 },
        { key: "assignment", label: "Assignment", max: 15 },
        { key: "cert", label: "Certifications", max: 10 },
        { key: "quiz", label: "Quiz", max: 5 },
        { key: "remid", label: "Re Mid (optional)", max: 20, type: "remid", replaces: "mid" },
        { key: "end", label: "End Term", max: 40 },
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
  ],
  first: [
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
  ],
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

  const COURSES = useMemo(() => COURSES_BY_YEAR[yearKey] || [], [yearKey]);
  const totalCredits = useMemo(() => COURSES.reduce((sum, c) => sum + c.credits, 0), [COURSES]);

  const initialMarks = useMemo(() => {
    const base = {};
    for (const c of COURSES) {
      base[c.id] = {};
      for (const comp of c.components) base[c.id][comp.key] = "";
    }
    return base;
  }, [COURSES]);

  const [marks, setMarks] = useState(initialMarks);
  const [results, setResults] = useState({});
  const [cgpa, setCgpa] = useState(null);

  // Reset data when year changes
  useEffect(() => {
    setMarks(initialMarks);
    setResults({});
    setCgpa(null);
  }, [initialMarks]);

  const handleInputChange = (courseId, key, value, max) => {
    let v = value.replace(/\D/g, "");
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

    for (const course of COURSES) {
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

  const performance = useMemo(() => {
    if (cgpa == null) return { label: "", color: "" };
    if (cgpa >= 8.5) return { label: "Excellent", color: "text-emerald-600" };
    if (cgpa >= 6.0) return { label: "Average", color: "text-amber-600" };
    return { label: "Needs Improvement", color: "text-rose-600" };
  }, [cgpa]);

  const computedCount = useMemo(
    () => Object.values(results).filter((r) => r && typeof r.points === "number").length,
    [results]
  );

  useEffect(() => {
    setCgpa(null);
  }, [marks]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white text-slate-800">
      <Header
        totalCredits={totalCredits}
        coursesCount={COURSES.length}
        computedCount={computedCount}
        selectedYear={yearKey}
        onChangeYear={(key) => setYearKey(key)}
      />

      <main className="mx-auto max-w-7xl px-3 pb-[96px] pt-4 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur"
        >
          <p className="text-sm text-slate-600">
            Select year at the top. Enter marks for each component. Re Mid automatically replaces the original component if it’s higher. Tap “Calculate Subject”, then “Calculate CGPA”.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:mt-4 sm:flex sm:gap-2">
            <span className="rounded-lg bg-slate-50 px-3 py-1.5 font-medium text-slate-600">
              Total Credits: <span className="font-semibold text-slate-900">{totalCredits}</span>
            </span>
            <span className="rounded-lg bg-slate-50 px-3 py-1.5 font-medium text-slate-600">
              Subjects: <span className="font-semibold text-slate-900">{COURSES.length}</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {COURSES.map((course, idx) => (
              <CourseCard
                key={course.id}
                index={idx}
                course={course}
                values={marks[course.id]}
                result={results[course.id]}
                onChange={(key, value, max) => handleInputChange(course.id, key, value, max)}
                onCalculate={() => calculateCourse(course)}
                onClear={() => {
                  setMarks((prev) => ({
                    ...prev,
                    [course.id]: Object.fromEntries(course.components.map((c) => [c.key, ""])) ,
                  }));
                  setResults((prev) => ({ ...prev, [course.id]: undefined }));
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      <ResultPanel cgpa={cgpa} performance={performance} />

      <FooterActions onCalculate={calculateAllCGPA} onReset={resetAll} />
    </div>
  );
}
