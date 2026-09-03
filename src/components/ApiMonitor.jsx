import { useEffect, useRef, useState } from "react";

/* Floating live console: logs an entry every time a section fires api:call */
export default function ApiMonitor() {
  const [log, setLog] = useState([]);
  const [open, setOpen] = useState(true);
  const bodyRef = useRef(null);
  const idRef = useRef(1);

  useEffect(function () {
    function onCall(e) {
      const d = e.detail || {};
      const entry = {
        id: idRef.current++,
        time: new Date().toLocaleTimeString("en-GB"),
        method: d.method || "GET",
        endpoint: d.endpoint || "/api/unknown",
        status: d.status || 200,
        ms: typeof d.ms === "number" ? d.ms : 20 + Math.round(Math.random() * 100),
      };
      setLog(function (prev) { return prev.slice(-29).concat(entry); });
    }
    window.addEventListener("api:call", onCall);
    return function () { window.removeEventListener("api:call", onCall); };
  }, []);

  useEffect(function () {
    const t = setTimeout(function () {
      window.dispatchEvent(new CustomEvent("api:call", { detail: { method: "GET", endpoint: "/api/profile", ms: 34 } }));
      window.dispatchEvent(new CustomEvent("api:call", { detail: { method: "GET", endpoint: "/api/stats", ms: 51 } }));
    }, 1400);
    return function () { clearTimeout(t); };
  }, []);

  useEffect(function () {
    const el = bodyRef.current;
    if (el && open) el.scrollTop = el.scrollHeight;
  }, [log, open]);

  function clear() { setLog([]); }

  if (!open) {
    return (
      <button className="api-fab mono" onClick={function () { setOpen(true); }} aria-label="Open API monitor">
        <span className="api-dot" /> API · {log.length}
      </button>
    );
  }

  return (
    <div className="api-mon" role="log" aria-label="Live API monitor">
      <div className="api-mon-head">
        <span className="api-dot" />
        <span className="mono">LIVE · api.folio</span>
        <span className="mono api-count">{log.length}</span>
        <button className="api-x" onClick={clear}>clear</button>
        <button className="api-x" onClick={function () { setOpen(false); }} aria-label="Minimize monitor">—</button>
      </div>
      <div className="api-mon-body mono" ref={bodyRef}>
        {log.length === 0 && <div className="api-line dim">listening… scroll to fire requests</div>}
        {log.map(function (l) {
          return (
            <div key={l.id} className="api-line">
              <span className="api-t">{l.time}</span>
              <span className={"api-m " + l.method.toLowerCase()}>{l.method}</span>
              <span className="api-p">{l.endpoint}</span>
              <span className="api-s">→ {l.status}</span>
              <span className="api-ms">{l.ms}ms</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
