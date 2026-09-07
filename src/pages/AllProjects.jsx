import { useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/portfolio.js";
import { Reveal, WorkCard, ApiPing } from "../components/shared.jsx";

export default function AllProjects() {
  useEffect(function () {
    document.title = "All Projects — Prem Kishor";
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", "All projects by Prem Kishor — React, Node.js, AI-integrated apps and live demos.");
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute("href", "https://github.com/prem-kishor123");
  }, []);
  return (
    <main id="main" className="projects-page">
      <div className="page-head">
        <Link to="/" className="btn-line sm">← Back home</Link>
        <h1>All <mark>projects</mark> <span className="mono">({profile.projects.length})</span></h1>
        <p className="contact-sub">Everything shipped so far — more cooking.</p>
        <ApiPing method="GET" endpoint="/api/projects?all=true" />
      </div>
      <div className="work-list">
        {profile.projects.map(function (p, i) {
          return (
            <Reveal key={p.id} delay={i * 60}>
              <WorkCard p={p} />
            </Reveal>
          );
        })}
      </div>
    </main>
  );
}
