import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { profile } from "./data/portfolio.js";
import { Reveal, SecHead, WorkCard, ApiPing } from "./components/shared.jsx";
import ApiMonitor from "./components/ApiMonitor.jsx";

const AllProjects = lazy(function () { return import("./pages/AllProjects.jsx"); });
import "./index.css";

/* ================= BOOT LOADER ================= */
function Loader({ onDone }) {
  const [n, setN] = useState(0);
  const [leave, setLeave] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const t0 = performance.now(), dur = 900;
    let raf;
    const timers = [];
    function finish() {
      if (fired.current) return;
      fired.current = true;
      timers.push(setTimeout(function () { setLeave(true); }, 120));
      timers.push(setTimeout(onDone, 600));
    }
    function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      setN(Math.round(k * 100));
      if (k < 1) raf = requestAnimationFrame(step);
      else finish();
    }
    raf = requestAnimationFrame(step);
    // Failsafe: rAF can stall (background tab / throttling) — never trap the user.
    timers.push(setTimeout(finish, 3000));
    return function () { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blocks = "▓".repeat(Math.round(n / 10)) + "░".repeat(10 - Math.round(n / 10));

  return (
    <div className={"loader" + (leave ? " leave" : "")} aria-hidden="true">
      <div className="loader-box">
        <div className="loader-head"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="mono">prem@dev — zsh</span></div>
        <div className="mono loader-body">
          <div><span className="p">$</span> boot portfolio --prod</div>
          <div className="dim">[{blocks}] {n}%</div>
          <div><span className="p">$</span> <span className="caret">▌</span></div>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL HOOKS ================= */
function useClock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    function upd() {
      try {
        setT(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: true }) + " IST");
      } catch (e) { setT(new Date().toLocaleTimeString()); }
    }
    upd();
    const id = setInterval(upd, 15000);
    return function () { clearInterval(id); };
  }, []);
  return t;
}

function useTheme() {
  const [theme, setTheme] = useState(function () {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("folio-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(function () {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("folio-theme", theme); } catch (e) {}
  }, [theme]);
  function toggleTheme() {
    setTheme(function (t) { return t === "light" ? "dark" : "light"; });
  }
  return [theme, toggleTheme];
}

function Counter({ value }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const obs = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now(), dur = 1100;
        function step(t) {
          const k = Math.min(1, (t - t0) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return function () { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function useTypewriter(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, c = 0, del = false, timer;
    function tick() {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      if (!del && c === word.length) { del = true; timer = setTimeout(tick, 1500); }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; timer = setTimeout(tick, 350); }
      else timer = setTimeout(tick, del ? 32 : 62);
    }
    timer = setTimeout(tick, 1400);
    return function () { clearTimeout(timer); };
  }, [words]);
  return text;
}

/* Section navigation that works across both pages.
   Fix: don't fight ScrollToTop — navigate first, then scroll after paint. */
function useGo() {
  const nav = useNavigate();
  const loc = useLocation();
  return function go(id) {
    function scroll() {
      if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (loc.pathname !== "/") { nav("/", { state: { scrollTo: id } }); }
    else scroll();
  };
}

/* Fix: only jump to top on the /projects page.
   Old version scrolled to top on EVERY route change, killing useGo()'s
   delayed scroll back to a section. Home now handles pending scrollTo state. */
function ScrollToTop() {
  const loc = useLocation();
  useEffect(function () {
    if (loc.pathname === "/projects") window.scrollTo(0, 0);
    else if (loc.state && loc.state.scrollTo) {
      const t = setTimeout(function () {
        const id = loc.state.scrollTo;
        if (id === "top") window.scrollTo({ top: 0 });
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState({}, "");
      }, 120);
      return function () { clearTimeout(t); };
    }
  }, [loc.pathname]);
  return null;
}

/* Per-route SEO: keeps title + meta description unique for Google */
function usePageMeta(title, description, canonical) {
  useEffect(function () {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute("content", description);
    }
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute("href", canonical);
    }
  }, [title, description, canonical]);
}

/* Scrollspy: returns id of section currently in view */
function useActiveSection(ids) {
  const [active, setActive] = useState("");
  const loc = useLocation();
  useEffect(function () {
    if (loc.pathname !== "/") return;
    let raf = 0;
    let pending = null;
    const obs = new IntersectionObserver(
      function (entries) {
        const visible = entries.filter(function (e) { return e.isIntersecting; });
        if (!visible.length) return;
        // Pick the last visible entry to keep bottom sections (hobbies/contact) stable
        pending = visible[visible.length - 1].target.id;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          if (pending) setActive(function (prev) { return prev === pending ? prev : pending; });
          pending = null;
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return function () { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [loc.pathname]);
  return active;
}

/* ================= SCROLL PROGRESS HAIRLINE ================= */
function ScrollBar() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    let last = -1;
    function render() {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      if (Math.abs(p - last) < 0.001) return;
      last = p;
      if (ref.current) ref.current.style.transform = "scaleX(" + p + ")";
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(render);
    }
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div className="scrollbar"><div ref={ref} /></div>;
}

/* ================= HEADER ================= */
/* FIX: ids must match real <section id="..."> values.
   Old "stack"/"journey" matched nothing, so those tabs never scrolled. */
const TABS = [["work", "work.ts"], ["services", "services.js"], ["about", "about.md"], ["skills", "stack.json"], ["learning", "learning.log"], ["education", "edu.log"], ["hobbies", "fun.txt"], ["contact", "hello.sh"]];

function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clock = useClock();
  const go = useGo();
  const loc = useLocation();
  const active = useActiveSection(["work", "services", "about", "skills", "learning", "education", "hobbies", "contact"]);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () { window.removeEventListener("scroll", onScroll); };
  }, []);

  function close() { setOpen(false); }
  function pick(id) { close(); go(id); }
  const palRef = useRef(null);

  useEffect(function () {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const rows = palRef.current ? Array.prototype.slice.call(palRef.current.querySelectorAll(".palette-row")) : [];
      if (!rows.length) return;
      e.preventDefault();
      const i = rows.indexOf(document.activeElement);
      const n = e.key === "ArrowDown" ? (i + 1) % rows.length : (i - 1 + rows.length) % rows.length;
      rows[n].focus();
    }
    document.addEventListener("keydown", onKey);
    return function () { document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={"chrome" + (scrolled ? " scrolled" : "")}>
      <ScrollBar />
      <div className="chrome-bar">
        <Link to="/" className="brand-link" aria-label="home" onClick={function () { close(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="logo-mark mono">P</span>
          <span className="brand mono">prem.dev<span className="blink-caret">_</span></span>
        </Link>
        <nav className="tabs">
          {TABS.map(function (t, i) {
            const isActive = loc.pathname === "/" && active === t[0];
            return (
              <button key={t[0]} className={"tab mono" + (isActive ? " active" : "")} aria-current={isActive ? "true" : undefined} onClick={function () { pick(t[0]); }}>
                <span className="tab-no">{i + 1}</span>{t[1]}
              </button>
            );
          })}
        </nav>
        <div className="chrome-right">
          <span className="clock mono hide-m"><span className="live-dot" />{clock}</span>
          <button className="theme-btn mono" onClick={toggleTheme} aria-label="Toggle dark mode" title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            {theme === "light" ? "◐ DARK" : "◑ LIGHT"}
          </button>
          <a href={"mailto:" + profile.email} className="hire">Hire me ↗</a>
          <button className={"cmd-btn" + (open ? " active" : "")} onClick={function () { setOpen(!open); }} aria-label="menu">
            {open ? "✕" : "⌘K"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="palette" ref={palRef}>
          <div className="mono palette-hint">TYPE A COMMAND… JUST KIDDING — PICK A SECTION</div>
          {TABS.map(function (t) {
            return <button key={t[0]} onClick={function () { pick(t[0]); }} className="palette-row"><span className="mono">→</span> {t[1]}</button>;
          })}
          <button onClick={toggleTheme} className="palette-row"><span className="mono">→</span> toggle-{theme === "light" ? "dark" : "light"}-mode</button>
          <a href={"mailto:" + profile.email} onClick={close} className="palette-row hot"><span className="mono">→</span> hire-me ↗</a>
        </nav>
      )}
    </header>
  );
}

/* ================= HERO ================= */
const TERM_LINES = [
  { c: "whoami", o: "prem kishor — full-stack developer" },
  { c: "cat focus.txt", o: "react · node · apis · dsa (200+ solved)" },
  { c: "open --hire", o: "status: available ✓" },
];

function Hero() {
  const typed = useTypewriter(profile.roles);
  const go = useGo();
  const first = profile.firstName.charAt(0) + profile.firstName.slice(1).toLowerCase();
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-left">
          <p className="hello mono"><span className="live-dot" /><span className="hello-hi">नमस्ते</span> — I AM</p>
          <h1 className="hero-title">
            <span className="ht-serif">{first}</span>
            <span className="ht-sans">{profile.lastName}<span className="ht-mark">.</span></span>
          </h1>
          <div className="typer mono"><span className="p">$</span> {typed}<span className="caret">▌</span></div>
          <p className="tagline">{profile.tagline}</p>
          <div className="hero-cta">
            <button className="btn-solid" onClick={function () { go("work"); }}>View selected work ↓</button>
            <a href={profile.resumeLink} target="_blank" rel="noreferrer" className="btn-line">Résumé ↗</a>
          </div>
          <div className="hero-stats">
            {profile.about.stats.map(function (s) {
              return (
                <div key={s.label} className="hstat">
                  <span className="hstat-val"><Counter value={s.value} /></span>
                  <span className="hstat-label mono">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hero-right">
          <div className="term">
            <div className="term-head"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="mono">prem@dev: ~/folio</span></div>
            <div className="term-body mono">
              {TERM_LINES.map(function (l, i) {
                return (
                  <div key={l.c} className="term-line" style={{ animationDelay: (1 + i * 0.55) + "s" }}>
                    <div><span className="p">$</span> {l.c}</div>
                    <div className="term-out">{l.o}</div>
                  </div>
                );
              })}
              <div className="term-line" style={{ animationDelay: "2.7s" }}><span className="p">$</span> <span className="caret">▌</span></div>
            </div>
            <div className="term-tape" aria-hidden="true" />
          </div>
          <div className="id-card">
            <div className="mono id-row"><span>EMAIL</span><a href={"mailto:" + profile.email}>{profile.email}</a></div>
            <div className="mono id-row"><span>PHONE</span><span>{profile.phone}</span></div>
            <div className="mono id-row"><span>BASE</span><span>{profile.location} / remote</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= ROTATED TICKER ================= */
function Strip() {
  const items = profile.marquee.concat(profile.marquee);
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
        {items.map(function (t, i) {
          return <span key={i} className="strip-item mono">{t}<span className="strip-star"> ✦ </span></span>;
        })}
      </div>
    </div>
  );
}

/* ================= SHARED BITS ================= */
/* ================= HOME SECTIONS ================= */
function Projects() {
  const showAll = profile.projects.length > 2;
  const list = showAll ? profile.projects.slice(0, 2) : profile.projects;
  return (
    <section id="work" className="section">
      <SecHead no="01" file="work.ts" method="GET" endpoint="/api/projects" title={<>Work that <mark>ships</mark></>} />
      <ApiPing method="GET" endpoint="/api/projects" />
      <div className="work-list">
        {list.map(function (p, i) {
          return (
            <Reveal key={p.id} delay={i * 80}>
              <WorkCard p={p} />
            </Reveal>
          );
        })}
      </div>
      {showAll && (
        <div className="view-all">
          <Link to="/projects" className="btn-solid">View all {profile.projects.length} projects →</Link>
        </div>
      )}
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <SecHead no="02" file="services.js" method="GET" endpoint="/api/services" title={<>What I <mark>can do</mark> for you</>} />
      <ApiPing method="GET" endpoint="/api/services" />
      <div className="services-grid">
        {profile.services.map(function (s, i) {
          return (
            <Reveal key={s.title} delay={i * 90}>
              <div className="service-card">
                <span className="service-icon">{s.icon}</span>
                <span className="mono service-no">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SecHead no="03" file="about.md" method="GET" endpoint="/api/profile" title={<>A developer, <mark>not a template</mark></>} />
      <ApiPing method="GET" endpoint="/api/profile" />
      <Reveal>
        <div className="about-card">
          <p className="about-lead">{profile.about.heading}</p>
          <div className="about-cols">
            {profile.about.paragraphs.map(function (p, i) { return <p key={i}>{p}</p>; })}
          </div>
          <div className="about-socials">
            {profile.socials.map(function (s) {
              return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="soc mono">{s.label} ↗</a>;
            })}
          </div>
          <div className="proof">
            <span className="mono proof-label">DON'T TAKE MY WORD FOR IT —</span>
            <div className="proof-cards">
              {["LEETCODE", "GITHUB", "LINKEDIN"].map(function (label) {
                const s = profile.socials.find(function (x) { return x.label === label; });
                if (!s) return null;
                const hint = label === "LEETCODE" ? "200+ solved — live" : label === "GITHUB" ? "repos & contributions — live" : "posts & experience — live";
                return <a key={label} href={s.url} target="_blank" rel="noreferrer" className="proof-card"><strong className="mono">{label} ↗</strong><span>{hint}</span></a>;
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SecHead no="04" file="stack.json" method="GET" endpoint="/api/stack" title={<>The <mark>source code</mark> of my stack</>} />
      <ApiPing method="GET" endpoint="/api/stack" />
      <Reveal>
        <div className="code-card">
          <div className="code-head"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="mono">stack.json — read-only (edit in portfolio.js)</span><span className="mono code-lang">JSON</span></div>
          <pre className="code-body mono">
            <code>{"{"}</code>
            {profile.skills.map(function (g, gi) {
              const last = gi === profile.skills.length - 1;
              const key = g.category.toLowerCase().replace(/[^a-z]+/g, "_");
              return (
                <code key={g.category} className="code-line">
                  <span className="cl-no">{gi + 1}</span>
                  <span className="ck">  "{key}"</span>
                  <span className="cp">: [</span>
                  {g.items.map(function (s, si) {
                    return (
                      <span key={s}>
                        <span className="cs">"{s}"</span>
                        {si < g.items.length - 1 && <span className="cp">, </span>}
                      </span>
                    );
                  })}
                  <span className="cp">]{last ? "" : ","}</span>
                </code>
              );
            })}
            <code>{"}"}</code>
          </pre>
        </div>
      </Reveal>
    </section>
  );
}

function Learning() {
  const C = 2 * Math.PI * 34;
  return (
    <section id="learning" className="section">
      <SecHead no="05" file="learning.log" method="GET" endpoint="/api/learning" title={<>Loading <mark>new skills…</mark></>} />
      <ApiPing method="GET" endpoint="/api/learning" />
      <div className="learn-grid">
        {profile.currentlyLearning.map(function (l, i) {
          const off = (C * (1 - l.pct / 100)).toFixed(1);
          return (
            <Reveal key={l.topic} delay={(i % 4) * 80}>
              <div className="learn-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 84 84" className="ring" aria-hidden="true">
                    <circle cx="42" cy="42" r="34" className="ring-bg" />
                    <circle cx="42" cy="42" r="34" className="ring-fg" style={{ "--off": off, stroke: l.color }} />
                  </svg>
                  <span className="ring-pct mono">{l.pct}%</span>
                </div>
                <span className="learn-tag mono"><span className="live-dot sm" />LEARNING</span>
                <h3>{l.topic}</h3>
                <p className="mono learn-note">{l.note}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <SecHead no="06" file="edu.log" method="GET" endpoint="/api/education" title={<>The <mark>paper trail</mark></>} />
      <ApiPing method="GET" endpoint="/api/education" />
      <div className="timeline">
        {profile.education.map(function (e) {
          return (
            <Reveal key={e.degree}>
              <div className="t-row">
                <span className="t-dot" />
                <span className="mono t-when">{e.period}</span>
                <div className="t-body">
                  <h3>{e.degree}</h3>
                  <p>{e.school} — <strong>{e.score}</strong></p>
                </div>
              </div>
            </Reveal>
          );
        })}
        <Reveal>
          <div className="t-row awards">
            <span className="t-dot hot" />
            <span className="mono t-when">PROOF</span>
            <div className="t-body">
              <h3>Wins & certs</h3>
              <ul>
                {profile.achievements.map(function (a) { return <li key={a}>★ {a}</li>; })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Hobbies() {
  return (
    <section id="hobbies" className="section">
      <SecHead no="07" file="fun.txt" method="GET" endpoint="/api/fun" title={<>Beyond <mark>the code</mark></>} />
      <ApiPing method="GET" endpoint="/api/fun" />
      <div className="hobby-grid">
        {profile.hobbies.map(function (h, i) {
          return (
            <Reveal key={h.title} delay={(i % 3) * 80}>
              <div className="hobby-card">
                <span className="hobby-icon">{h.icon}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  function copyEmail() {
    if (navigator.clipboard) navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(function () { setCopied(false); }, 1500);
  }
  return (
    <section id="contact" className="section contact">
      <Reveal>
        <p className="mono contact-kicker">08 · ~/folio/hello.sh
          <span className="api-badge mono"><span className="api-dot" /><span className="api-method post">POST</span><span className="api-path">/api/contact</span><span className="api-status">200</span></span>
        </p>
        <ApiPing method="POST" endpoint="/api/contact" />
        <h2 className="contact-big">Have something to build? <a href={"mailto:" + profile.email}><mark>Let's talk.</mark></a></h2>
        <p className="contact-sub">{profile.contact.sub}</p>
        <div className="contact-row">
          <a href={"mailto:" + profile.email} className="btn-solid">Say hello →</a>
          <button className="btn-line" onClick={copyEmail}>{copied ? "Copied ✓" : "Copy " + profile.email}</button>
        </div>
        <p className="mono contact-alt">{profile.phone} · {profile.location}</p>
      </Reveal>
    </section>
  );
}

/* ================= PAGES ================= */
function Home() {
  usePageMeta(
    "Prem Kishor — Software Developer",
    "Prem Kishor — full-stack software developer building React, Node.js and AI-integrated apps. 200+ DSA problems solved. Open to internships, freelance and collabs.",
    "https://github.com/prem-kishor123"
  );
  return (
    <main id="main">
      <Hero />
      <Strip />
      <Projects />
      <Services />
      <About />
      <Skills />
      <Learning />
      <Education />
      <Hobbies />
      <Contact />
    </main>
  );
}

function Footer() {
  const go = useGo();
  return (
    <footer className="footer mono">
      <span>© 2026 Prem Kishor</span>
      <span className="hide-m">made by prem with love ♥</span>
      <button className="to-top mono" onClick={function () { go("top"); }}>back to top ↑</button>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, toggleTheme] = useTheme();
  return (
    <BrowserRouter>
      <div className={"page" + (loading ? " is-loading" : " is-ready") + " theme-" + theme}>
        <button className="skip mono" onClick={function () { const el = document.getElementById("main"); if (el) el.scrollIntoView(); }}>Skip to content ↓</button>
        {loading && <Loader onDone={function () { setLoading(false); }} />}
        <ScrollToTop />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Suspense fallback={<main id="main"><div className="page-load mono">loading projects…</div></main>}><AllProjects /></Suspense>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ApiMonitor />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
