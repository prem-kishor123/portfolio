# Kishan Kumar — Portfolio (folio/OS)

Personal portfolio site. An editor-chrome themed single-page app + a `/projects` archive page.

## Run it

```powershell
npm install
npm run dev
```

Build for production:

```powershell
npm run build
npm run preview
```

## Edit content — one file

Everything (name, links, projects, skills, learning, hobbies) lives in
`src/data/portfolio.js`. No other code needs touching for content updates.

Still TODO (needs real URLs):

- `resumeLink` — paste resume Drive link
- Each project's `LIVE` / `CODE` urls (currently `"#"`)
- Absolute domain for `og:image` in `index.html` once deployed

## Structure

- `src/App.jsx` — shell, navbar, hero, home sections, footer
- `src/components/shared.jsx` — Reveal, SecHead, WorkCard (shared with lazy page)
- `src/pages/AllProjects.jsx` — lazy-loaded `/projects` archive
- `src/data/portfolio.js` — all content
