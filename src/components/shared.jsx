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
    <div ref={ref} className={"reveal" + (inView ? " in" : "") + " " + className} style={{ transitionDelay: inView ? "0ms" : delay + "ms" }}>
      {children}
    </div>
  );
}

export function SecHead({ no, file, title, method, endpoint }) {
  return (
    <div className="sec-head">
      <span className="sec-no mono">{no}</span>
      <span className="sec-file mono">~/folio/{file}</span>
      <h2>{title}</h2>
      {endpoint && (
        <span className="api-badge mono" title="Live endpoint">
          <span className="api-dot" />
          <span className={"api-method " + (method || "GET").toLowerCase()}>{method || "GET"}</span>
          <span className="api-path">{endpoint}</span>
          <span className="api-status">200</span>
        </span>
      )}
    </div>
  );
}

/* Invisible sentinel: fires one api:call when its section scrolls into view */
export function ApiPing({ method, endpoint }) {
  const ref = useRef(null);
  useEffect(function () {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        const ms = 18 + Math.round(Math.random() * 120);
        window.dispatchEvent(new CustomEvent("api:call", { detail: { method: method || "GET", endpoint: endpoint, ms: ms } }));
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, [endpoint, method]);
  return <span ref={ref} className="api-ping" aria-hidden="true" />;
}

export function WorkCard({ p }) {
  const validLinks = (p.links || []).filter(function (l) { return l.url && l.url !== "#"; });
  const coverHref = (validLinks[0] && validLinks[0].url) || null;
  return (
    <article className="work">
      {coverHref ? (
        <a className="work-cover" href={coverHref} target="_blank" rel="noreferrer" aria-label={p.title}>
          <span className="work-ghost">{p.id}</span>
          <span className="work-badge mono">{p.featured ? "★ FEATURED" : "PROJECT"}</span>
          <span className="work-go">↗</span>
        </a>
      ) : (
        <div className="work-cover" aria-label={p.title}>
          <span className="work-ghost">{p.id}</span>
          <span className="work-badge mono">{p.featured ? "★ FEATURED" : "PROJECT"}</span>
        </div>
      )}
      <div className="work-body">
        <span className="mono work-idx">[{p.id}]</span>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul>
          {p.bullets.map(function (b) { return <li key={b}>{b}</li>; })}
        </ul>
        <div className="mono work-stack">{p.stack.join(" · ")}</div>
        {validLinks.length > 0 && (
          <div className="work-links">
            {validLinks.map(function (l) {
              return <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="btn-line sm">{l.label}</a>;
            })}
          </div>
        )}
      </div>
    </article>
  );
}
