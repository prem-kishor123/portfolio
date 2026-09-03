import { useEffect, useRef, useState } from "react";

/* Shared building blocks (also lazy-loaded by the /projects page) */

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return (
    <div ref={ref} className={"reveal" + (inView ? " in" : "") + " " + className} style={{ transitionDelay: delay + "ms" }}>
      {children}
    </div>
  );
}

export function SecHead({ no, file, title }) {
  return (
    <div className="sec-head">
      <span className="sec-no mono">{no}</span>
      <span className="sec-file mono">~/folio/{file}</span>
      <h2>{title}</h2>
    </div>
  );
}

export function WorkCard({ p }) {
  return (
    <article className="work">
      <a className="work-cover" href={(p.links[0] && p.links[0].url) || "#"} target="_blank" rel="noreferrer" aria-label={p.title}>
        <span className="work-ghost">{p.id}</span>
        <span className="work-badge mono">{p.featured ? "★ FEATURED" : "PROJECT"}</span>
        <span className="work-go">↗</span>
      </a>
      <div className="work-body">
        <span className="mono work-idx">[{p.id}]</span>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul>
          {p.bullets.map(function (b) { return <li key={b}>{b}</li>; })}
        </ul>
        <div className="mono work-stack">{p.stack.join(" · ")}</div>
        <div className="work-links">
          {p.links.map(function (l) {
            return <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="btn-line sm">{l.label}</a>;
          })}
        </div>
      </div>
    </article>
  );
}
