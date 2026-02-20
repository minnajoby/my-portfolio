import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Certifications", "Contact"];

const SKILLS = {
  "Programming": ["Python", "Java", "SQL"],
  "Data Science": ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "SHAP", "SMOTE"],
  "ML Frameworks": ["CatBoost", "LightGBM", "TabNet", "TabPFN", "RandomForest"],
  "Web & Backend": ["Django", "Flask", "HTML5", "CSS3", "JavaScript"],
  "Databases": ["PostgreSQL", "MySQL", "SQLite"],
  "Dev Tools": ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
};

const PROJECTS = [
  {
    id: 1,
    title: "RetentionAI",
    subtitle: "Proactive Bank Churn Prediction",
    tag: "ML · Data Science",
    color: "#00C9A7",
    icon: "🏦",
    description:
      "A real-time predictive system for assessing bank customer churn risk using state-of-the-art tabular ML models on 165,000+ records.",
    highlights: [
      "Benchmarked 4 SOTA architectures: CatBoost (🏆 91.09% F1), LightGBM, TabNet, TabPFN",
      "SMOTE-Tomek hybrid resampling to handle 80/20 class imbalance",
      "SHAP-based Explainable AI for transparent churn driver analysis",
      "Flask REST API + Enterprise Dashboard with real-time audit logs (SQLite)",
    ],
    tech: ["Python", "CatBoost", "LightGBM", "TabNet", "TabPFN", "SHAP", "Flask", "SQLite", "Bootstrap"],
  },
  {
    id: 2,
    title: "PrepScore",
    subtitle: "Career Profile Optimizer",
    tag: "Full-Stack · ML",
    color: "#4F8EF7",
    icon: "🎯",
    description:
      "A full-stack career readiness evaluation platform that transforms a static resume into a dynamic scoring tool with personalized recommendations.",
    highlights: [
      "Django full-stack app with PostgreSQL, secure user authentication & CRUD profile management",
      "RandomForestRegressor ML model (R² = 0.99, MAE = 1.00) for live PrepScore generation",
      "Rule-based recommendation engine identifying high-impact profile improvements",
      "Interactive dashboards with Chart.js, animated donut & pie charts",
    ],
    tech: ["Python", "Django", "PostgreSQL", "Scikit-learn", "HTML5", "CSS3", "JavaScript", "Chart.js"],
  },
];

const CERTS = [
  { name: "Python for Data Science, AI & Development", org: "IBM", date: "Dec 2025" },
  { name: "Google Data Analytics", org: "Google", date: "June 2025" },
  { name: "Database Management System", org: "NPTEL", date: "Jan–Mar 2025" },
];

const EDUCATION = [
  { degree: "Master of Computer Applications", spec: "Data Science & Analytics", school: "Rajiv Gandhi Institute of Technology", score: "CGPA: 7.615/10", year: "2024–2026" },
  { degree: "Bachelor of Science in Physics", spec: "", school: "Vimala College", score: "CGPA: 7.767/10", year: "2021–2024" },
  { degree: "Higher Secondary", spec: "", school: "Sacred Heart CGHSS", score: "98.3%", year: "2019–2021" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </section>
  );
}

function Tag({ children, color = "#00C9A7" }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "20px",
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      background: color + "22",
      color: color,
      border: `1px solid ${color}55`,
      fontFamily: "'JetBrains Mono', monospace",
    }}>{children}</span>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const style = {
    root: {
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      background: "#0A0F1E",
      color: "#E8EDF8",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "0 2rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(10,15,30,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #ffffff10" : "none",
      transition: "all 0.3s ease",
    },
    logo: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: "1.2rem",
      color: "#00C9A7",
      letterSpacing: "0.02em",
    },
    navLinks: {
      display: "flex",
      gap: "0.2rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: (isActive) => ({
      padding: "6px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.85rem",
      fontWeight: isActive ? 700 : 400,
      color: isActive ? "#00C9A7" : "#B0BAD0",
      background: isActive ? "#00C9A715" : "transparent",
      border: "none",
      transition: "all 0.2s",
      fontFamily: "inherit",
    }),
  };

  return (
    <div style={style.root}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={style.nav}>
        <div style={style.logo}>MJ.</div>
        <ul style={style.navLinks}>
          {NAV_LINKS.map(l => (
            <li key={l}>
              <button style={style.navLink(active === l)} onClick={() => scrollTo(l)}>{l}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,201,167,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,167,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "15%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #00C9A722 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #4F8EF722 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1, paddingTop: "80px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <Tag color="#00C9A7">Available for Opportunities</Tag>
          </div>
          <h1 style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 1rem",
            background: "linear-gradient(135deg, #E8EDF8 30%, #00C9A7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Minna Joby
          </h1>
          <h2 style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "#7A8BA8",
            fontWeight: 400,
            margin: "0 0 1.5rem",
            letterSpacing: "0.05em",
          }}>
            MCA Student · Data Science & Analytics · Full-Stack Developer
          </h2>
          <p style={{
            fontSize: "1.05rem",
            color: "#B0BAD0",
            lineHeight: 1.8,
            maxWidth: 620,
            margin: "0 0 2.5rem",
          }}>
            Highly analytical MCA student specializing in Data Science, backed by a Physics degree.
            Proficient in Python, ML pipelines, and full-stack development — passionate about turning
            data into actionable insight.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("Projects")}
              style={{
                padding: "12px 28px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00C9A7, #0097FF)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 24px #00C9A740",
              }}
            >View Projects →</button>
            <a
              href="mailto:minnajoby27@gmail.com"
              style={{
                padding: "12px 28px",
                borderRadius: "10px",
                background: "transparent",
                color: "#00C9A7",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1.5px solid #00C9A755",
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "none",
                display: "inline-block",
              }}
            >Contact Me</a>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
            {[["2", "Projects Built"], ["3", "Certifications"], ["91%", "CatBoost F1-Score"], ["99%", "PrepScore R²"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#00C9A7", fontFamily: "'JetBrains Mono', monospace" }}>{val}</div>
                <div style={{ fontSize: "0.78rem", color: "#7A8BA8", letterSpacing: "0.06em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <Section id="skills" style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader label="Technical Skills" accent="#00C9A7" />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.2rem",
            marginTop: "2.5rem",
          }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} style={{
                background: "#111828",
                border: "1px solid #ffffff0D",
                borderRadius: "14px",
                padding: "1.4rem",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00C9A730"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#ffffff0D"}
              >
                <div style={{ fontSize: "0.72rem", color: "#00C9A7", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", marginBottom: "0.8rem" }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {items.map(skill => (
                    <span key={skill} style={{
                      padding: "4px 10px",
                      background: "#1A2540",
                      borderRadius: "6px",
                      fontSize: "0.82rem",
                      color: "#C8D4E8",
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ padding: "5rem 2rem", background: "#0D1322" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader label="Projects" accent="#4F8EF7" />
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2.5rem" }}>
            {PROJECTS.map((p, i) => (
              <div key={p.id} style={{
                background: "#111828",
                border: "1px solid #ffffff0D",
                borderRadius: "18px",
                padding: "2rem 2.2rem",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = p.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "#ffffff0D"; }}
              >
                {/* Accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)`, borderRadius: "18px 18px 0 0" }} />

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{p.icon}</div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700, color: "#E8EDF8" }}>{p.title}</h3>
                      <Tag color={p.color}>{p.tag}</Tag>
                    </div>
                    <div style={{ color: "#7A8BA8", fontSize: "0.9rem", marginBottom: "0.8rem" }}>{p.subtitle}</div>
                    <p style={{ color: "#B0BAD0", fontSize: "0.93rem", lineHeight: 1.7, margin: "0 0 1.2rem" }}>{p.description}</p>

                    <ul style={{ margin: "0 0 1.2rem", padding: 0, listStyle: "none" }}>
                      {p.highlights.map((h, j) => (
                        <li key={j} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.45rem", fontSize: "0.88rem", color: "#B0BAD0" }}>
                          <span style={{ color: p.color, marginTop: "2px", flexShrink: 0 }}>▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {p.tech.map(t => (
                        <span key={t} style={{ padding: "3px 9px", background: "#1A2540", borderRadius: "5px", fontSize: "0.75rem", color: "#7A9CC8", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader label="Experience & Education" accent="#00C9A7" />
          <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {/* Internship */}
            <div>
              <div style={{ fontSize: "0.75rem", color: "#00C9A7", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", marginBottom: "1.2rem" }}>Internship</div>
              <div style={{ background: "#111828", border: "1px solid #ffffff0D", borderRadius: "14px", padding: "1.4rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "#E8EDF8", marginBottom: "0.2rem" }}>Intern</div>
                <div style={{ color: "#00C9A7", fontSize: "0.88rem", marginBottom: "0.8rem" }}>IIT Palakkad I-Hub Foundation</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {[
                    "Hands-on experience in 3D printing and fabrication lab",
                    "Teaching & mentoring students in technical skills",
                    "Collaboration on lab projects and prototyping",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.4rem", fontSize: "0.85rem", color: "#B0BAD0" }}>
                      <span style={{ color: "#00C9A7" }}>▹</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <div style={{ fontSize: "0.75rem", color: "#4F8EF7", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", marginBottom: "1.2rem" }}>Education</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {EDUCATION.map((e, i) => (
                  <div key={i} style={{ background: "#111828", border: "1px solid #ffffff0D", borderRadius: "12px", padding: "1rem 1.2rem" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "#E8EDF8" }}>{e.degree}</div>
                    <div style={{ color: "#7A8BA8", fontSize: "0.8rem", margin: "2px 0" }}>{e.school}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                      <span style={{ color: "#4F8EF7", fontSize: "0.78rem", fontFamily: "'JetBrains Mono', monospace" }}>{e.score}</span>
                      <span style={{ color: "#4A5568", fontSize: "0.78rem" }}>{e.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" style={{ padding: "5rem 2rem", background: "#0D1322" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader label="Certifications" accent="#F7C34F" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.2rem", marginTop: "2.5rem" }}>
            {CERTS.map((c, i) => (
              <div key={i} style={{
                background: "#111828",
                border: "1px solid #F7C34F22",
                borderRadius: "14px",
                padding: "1.5rem",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#F7C34F55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#F7C34F22"; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ fontSize: "1.6rem", marginBottom: "0.7rem" }}>🏅</div>
                <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "#E8EDF8", marginBottom: "0.3rem" }}>{c.name}</div>
                <div style={{ color: "#F7C34F", fontSize: "0.8rem", fontWeight: 700 }}>{c.org}</div>
                <div style={{ color: "#4A5568", fontSize: "0.78rem", marginTop: "0.3rem", fontFamily: "'JetBrains Mono', monospace" }}>{c.date}</div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div style={{ marginTop: "3rem" }}>
            <div style={{ fontSize: "0.75rem", color: "#7A8BA8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", marginBottom: "1rem" }}>Soft Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
              {["Analytical & Critical Thinking", "Teamwork & Collaboration", "Communication & Presentation", "Discipline & Detail-Oriented", "Adaptability & Quick Learning"].map(s => (
                <span key={s} style={{ padding: "6px 14px", background: "#1A2540", borderRadius: "20px", fontSize: "0.85rem", color: "#B0BAD0", border: "1px solid #ffffff10" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ padding: "5rem 2rem 6rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <SectionHeader label="Contact" accent="#00C9A7" centered />
          <p style={{ color: "#7A8BA8", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            I'm actively seeking opportunities in Data Science, Analytics, and Full-Stack Development. Let's connect!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            {[
              { icon: "✉️", label: "minnajoby27@gmail.com", href: "mailto:minnajoby27@gmail.com" },
              { icon: "📞", label: "+91 9496075090", href: "tel:+919496075090" },
              { icon: "🔗", label: "linkedin.com/in/minnajoby", href: "https://linkedin.com/in/minnajoby" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "12px 28px",
                background: "#111828",
                border: "1px solid #ffffff0D",
                borderRadius: "12px",
                color: "#B0BAD0",
                textDecoration: "none",
                fontSize: "0.92rem",
                width: "100%",
                maxWidth: 360,
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00C9A755"; e.currentTarget.style.color = "#00C9A7"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff0D"; e.currentTarget.style.color = "#B0BAD0"; }}
              >
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ffffff0A", padding: "1.5rem 2rem", textAlign: "center", color: "#2E3A50", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
        Designed & built by Minna Joby · 2025
      </footer>
    </div>
  );
}

function SectionHeader({ label, accent, centered = false }) {
  return (
    <div style={{ textAlign: centered ? "center" : "left" }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.7rem",
        marginBottom: "0.4rem",
      }}>
        <span style={{ display: "block", width: 28, height: 2, background: accent, borderRadius: 2 }} />
        <span style={{ fontSize: "0.72rem", color: accent, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
      </div>
      <h2 style={{
        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: "#E8EDF8",
        margin: 0,
      }}>{label}</h2>
    </div>
  );
}
