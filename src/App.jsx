import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, Copy, ExternalLink, Search, Star, X } from "lucide-react";

const STORAGE_KEY = "scholarprompt-data";

const rawCourses = [
  ["h1","🎓","CS50: Introduction to Computer Science","Harvard","https://pll.harvard.edu/course/cs50-introduction-computer-science"],
  ["h2","🐍","CS50’s Introduction to Programming with Python","Harvard","https://pll.harvard.edu/course/cs50s-introduction-programming-python"],
  ["h3","🤖","CS50’s Introduction to Artificial Intelligence with Python","Harvard","https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python"],
  ["h4","🔐","CS50’s Introduction to Cybersecurity","Harvard","https://pll.harvard.edu/course/cs50s-introduction-cybersecurity"],
  ["h5","🌐","CS50’s Web Programming with Python and JavaScript","Harvard","https://pll.harvard.edu/course/cs50s-web-programming-python-and-javascript"],
  ["h6","🗄️","CS50’s Introduction to Databases with SQL","Harvard","https://pll.harvard.edu/course/cs50s-introduction-databases-sql"],
  ["h7","🧩","CS50’s Introduction to Programming with Scratch","Harvard","https://pll.harvard.edu/course/cs50s-introduction-programming-scratch"],
  ["h8","💼","CS50’s Computer Science for Business Professionals","Harvard","https://pll.harvard.edu/course/cs50s-computer-science-business-professionals"],
  ["h9","⚖️","CS50 for Lawyers","Harvard","https://pll.harvard.edu/course/cs50-for-lawyers"],
  ["h10","🏛️","Justice","Harvard","https://pll.harvard.edu/course/justice"],
  ["h11","🎤","Rhetoric: The Art of Persuasive Writing and Public Speaking","Harvard","https://pll.harvard.edu/course/rhetoric-art-persuasive-writing-and-public-speaking"],
  ["h12","😊","Managing Happiness","Harvard","https://pll.harvard.edu/course/managing-happiness"],
  ["h13","🧭","Exercising Leadership: Foundational Principles","Harvard","https://pll.harvard.edu/course/exercising-leadership-foundational-principles"],
  ["h14","🚀","Entrepreneurship in Emerging Economies","Harvard","https://pll.harvard.edu/course/entrepreneurship-emerging-economies"],
  ["h15","🏠","Remote Work Revolution for Everyone","Harvard","https://pll.harvard.edu/course/remote-work-revolution-everyone"],
  ["h16","📜","Contract Law: From Trust to Promise to Contract","Harvard","https://pll.harvard.edu/course/contract-law-trust-promise-contract"],
  ["h17","🇺🇸","American Government: Constitutional Foundations","Harvard","https://pll.harvard.edu/course/american-government-constitutional-foundations"],
  ["h18","🏛️","U.S. Political Institutions: Congress, Presidency, Courts and Bureaucracy","Harvard","https://pll.harvard.edu/course/us-political-institutions-congress-presidency-courts-and-bureaucracy"],
  ["h19","🏙️","CitiesX: The Past, Present and Future of Urban Life","Harvard","https://pll.harvard.edu/course/citiesx-past-present-and-future-urban-life"],
  ["h20","🔬","Technology Entrepreneurship: Lab to Market","Harvard","https://pll.harvard.edu/course/technology-entrepreneurship-lab-market"],
  ["h21","🧠","Machine Learning and AI with Python","Harvard","https://pll.harvard.edu/course/machine-learning-and-ai-python"],
  ["h22","🔎","Using Python for Research","Harvard","https://pll.harvard.edu/course/using-python-research"],
  ["h23","📊","Introduction to Data Science with Python","Harvard","https://pll.harvard.edu/course/introduction-data-science-python"],
  ["y1","💰","Financial Markets","Yale","https://oyc.yale.edu/economics/econ-252"],
  ["y2","📈","Financial Theory","Yale","https://oyc.yale.edu/economics/econ-251"],
  ["y3","♟️","Game Theory","Yale","https://oyc.yale.edu/economics/econ-159"],
  ["y4","🧠","Introduction to Psychology","Yale","https://oyc.yale.edu/psychology/psyc-110"],
  ["y5","🧭","Philosophy and the Science of Human Nature","Yale","https://oyc.yale.edu/philosophy/phil-181"],
  ["y6","⚰️","Death","Yale","https://oyc.yale.edu/philosophy/phil-176"],
  ["y7","📚","Introduction to Theory of Literature","Yale","https://oyc.yale.edu/english/engl-300"],
  ["y8","✒️","Modern Poetry","Yale","https://oyc.yale.edu/english/engl-310"],
  ["y9","🏛️","Roman Architecture","Yale","https://oyc.yale.edu/history-art/hsar-252"],
  ["y10","🏺","Introduction to Ancient Greek History","Yale","https://oyc.yale.edu/history/hist-210"],
  ["y11","🗽","The American Revolution","Yale","https://oyc.yale.edu/history/hist-116"],
  ["y12","⚔️","The Civil War and Reconstruction Era 1845–1877","Yale","https://oyc.yale.edu/history/hist-119"],
  ["y13","🌍","European Civilization 1648–1945","Yale","https://oyc.yale.edu/history/hist-202"],
  ["y14","🦠","Epidemics in Western Society Since 1600","Yale","https://oyc.yale.edu/history/hist-234"],
  ["y15","🧬","Principles of Evolution, Ecology and Behavior","Yale","https://oyc.yale.edu/ecology-and-evolutionary-biology/eeb-122"],
  ["y16","🌌","Frontiers and Controversies in Astrophysics","Yale","https://oyc.yale.edu/astronomy/astr-160"],
  ["y17","🧪","Frontiers of Biomedical Engineering","Yale","https://oyc.yale.edu/biomedical-engineering/beng-100"],
  ["y18","⚗️","Freshman Organic Chemistry I","Yale","https://oyc.yale.edu/chemistry/chem-125a"],
  ["y19","🌱","Environmental Politics and Law","Yale","https://oyc.yale.edu/environmental-studies/evst-255"],
  ["y20","🏦","Capitalism: Success, Crisis and Reform","Yale","https://oyc.yale.edu/economics/econ-159"],
  ["y21","⚖️","Introduction to Political Philosophy","Yale","https://oyc.yale.edu/political-science/plsc-114"],
  ["y22","👥","Foundations of Modern Social Theory","Yale","https://oyc.yale.edu/sociology/socy-151"],
  ["y23","✊🏿","African American History: From Emancipation to the Present","Yale","https://oyc.yale.edu/history/hist-119"],
  ["m1","💻","Introduction to Computer Science and Programming in Python","MIT","https://ocw.mit.edu/courses/6-100l-introduction-to-computer-science-and-programming-in-python-fall-2022/"],
  ["m2","📐","Linear Algebra","MIT","https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/"],
  ["m3","∫","Single Variable Calculus","MIT","https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"],
  ["m4","∬","Multivariable Calculus","MIT","https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/"],
  ["m5","〰️","Differential Equations","MIT","https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/"],
  ["m6","⚛️","Classical Mechanics","MIT","https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/"],
  ["m7","🌊","Physics III: Vibrations and Waves","MIT","https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/"],
  ["m8","🧬","Fundamentals of Biology","MIT","https://ocw.mit.edu/courses/7-013-introductory-biology-spring-2018/"],
  ["m9","🧪","Principles of Chemical Science","MIT","https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/"],
  ["m10","🔬","Introduction to Solid State Chemistry","MIT","https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/"],
  ["m11","⚡","Introduction to Electrical Engineering and Computer Science I","MIT","https://ocw.mit.edu/courses/6-01sc-introduction-to-electrical-engineering-and-computer-science-i-fall-2011/"],
  ["m12","🎲","Probabilistic Systems Analysis and Applied Probability","MIT","https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/"],
  ["m13","⚙️","Engineering Dynamics","MIT","https://ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/"],
  ["m14","🧠","Introduction to Psychology","MIT","https://ocw.mit.edu/courses/9-00sc-introduction-to-psychology-fall-2011/"],
  ["m15","💵","Principles of Microeconomics","MIT","https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/"],
  ["m16","🧮","Introduction to Algorithms","MIT","https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"],
  ["m17","🤖","Artificial Intelligence","MIT","https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/"],
  ["m18","⛓️","Blockchain and Money","MIT","https://ocw.mit.edu/courses/15-s12-blockchain-and-money-fall-2018/"],
  ["m19","🚀","New Enterprises","MIT","https://ocw.mit.edu/courses/15-390-new-enterprises-fall-2013/"],
  ["m20","📊","The Analytics Edge","MIT","https://ocw.mit.edu/courses/15-071-the-analytics-edge-spring-2017/"],
  ["m21","🧠","Introduction to Computational Thinking and Data Science","MIT","https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/"],
  ["m22","🔌","Circuits and Electronics","MIT","https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/"],
  ["m23","📊","Introduction to Probability and Statistics","MIT","https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/"],
];

const COURSES = rawCourses.map(([id, emoji, title, uni, url]) => ({ id, emoji, title, uni, url }));
const FILTERS = ["All", "Harvard", "Yale", "MIT", "Saved"];

const universityClass = {
  Harvard: "badge harvard",
  Yale: "badge yale",
  MIT: "badge mit",
};

export default function App() {
  const [savedCourseIds, setSavedCourseIds] = useState(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCourseIds)); } catch {}
  }, [savedCourseIds]);

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return COURSES.filter((course) => {
      const matchesFilter = filter === "All" || (filter === "Saved" ? savedCourseIds.includes(course.id) : course.uni === filter);
      const matchesSearch = !query || `${course.title} ${course.uni}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [filter, savedCourseIds, searchTerm]);

  function toggleSave(id) {
    setSavedCourseIds((current) => current.includes(id) ? current.filter((courseId) => courseId !== id) : [...current, id]);
  }

  async function copyToClipboard(course) {
    try {
      await navigator.clipboard.writeText(course.url);
      setCopiedId(course.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {}
  }

  return (
    <main className="app-shell">
      <div className="container">
        <header className="hero">
          <div className="brand-row">
            <div className="brand-icon"><BookOpen size={27} /></div>
            <div>
              <p className="eyebrow">FREE UNIVERSITY LEARNING</p>
              <h1>ScholarPrompt Hub</h1>
            </div>
          </div>
          <p className="hero-copy">Explore 69 free courses from Harvard, Yale & MIT. Build a serious self-directed curriculum without tuition.</p>
          <div className="stats"><span><strong>{COURSES.length}</strong> courses</span><span><strong>{savedCourseIds.length}</strong> saved</span><span><strong>3</strong> universities</span></div>
        </header>

        <section className="toolbar" aria-label="Course filters">
          <div className="search-wrap">
            <Search size={19} />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search courses..." aria-label="Search courses" />
            {searchTerm && <button className="icon-button" onClick={() => setSearchTerm("")} aria-label="Clear search"><X size={17} /></button>}
          </div>
          <div className="filters">
            {FILTERS.map((tab) => (
              <button key={tab} className={`filter ${filter === tab ? "active" : ""}`} onClick={() => setFilter(tab)}>
                {tab === "Saved" && <Star size={15} fill="currentColor" />}{tab}
              </button>
            ))}
          </div>
        </section>

        <div className="result-row"><span>{filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}</span>{(searchTerm || filter !== "All") && <button className="clear-button" onClick={() => { setSearchTerm(""); setFilter("All"); }}>Clear filters</button>}</div>

        {filteredCourses.length > 0 ? (
          <section className="course-grid">
            {filteredCourses.map((course) => {
              const isSaved = savedCourseIds.includes(course.id);
              const isCopied = copiedId === course.id;
              return (
                <article className="course-card" key={course.id}>
                  <div className="card-top"><span className="course-emoji">{course.emoji}</span><button className={`save-button ${isSaved ? "saved" : ""}`} onClick={() => toggleSave(course.id)} aria-label={isSaved ? `Remove ${course.title} from saved` : `Save ${course.title}`}><Star size={18} fill={isSaved ? "currentColor" : "none"} /></button></div>
                  <div className={universityClass[course.uni]}>{course.uni}</div>
                  <h2>{course.title}</h2>
                  <div className="card-actions">
                    <a className="primary-action" href={course.url} target="_blank" rel="noreferrer">View course <ExternalLink size={15} /></a>
                    <button className="copy-button" onClick={() => copyToClipboard(course)} aria-label={`Copy link for ${course.title}`}>{isCopied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy</>}</button>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="empty-state"><div className="empty-icon"><Search size={24} /></div><h2>No courses found</h2><p>Try another search or reset your filters.</p><button className="primary-action" onClick={() => { setSearchTerm(""); setFilter("All"); }}>Show all courses</button></section>
        )}

        <footer>ScholarPrompt Hub · 69-course learning collection · Links point to university course pages.</footer>
      </div>
    </main>
  );
}
