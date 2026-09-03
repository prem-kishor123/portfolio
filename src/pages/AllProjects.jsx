import { Link } from "react-router-dom";
import { profile } from "../data/portfolio.js";
import { Reveal, WorkCard } from "../components/shared.jsx";

export default function AllProjects() {
  return (
    <main id="main" className="projects-page">
      <div className="page-head">
        <Link to="/" className="btn-line sm">← Back home</Link>
        <h1>All <mark>projects</mark> <span className="mono">({profile.projects.length})</span></h1>
        <p className="contact-sub">Everything shipped so far — more cooking.</p>
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
