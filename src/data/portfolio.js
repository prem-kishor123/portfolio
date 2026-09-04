// ============================================================
// ★ EDIT EVERYTHING HERE ★
// Change your name, links, projects, skills in this ONE file.
// No need to touch any other code.
// ============================================================

export const profile = {
  name: "KISHAN KUMAR",
  firstName: "KISHAN",
  lastName: "KUMAR",
  roles: ["SOFTWARE DEVELOPER", "FULL-STACK", "API DEVELOPMENT"],
  tagline:
    "MCA student ('27) building full-stack & AI-integrated apps. 600+ DSA problems solved. I ship scalable SaaS.",
  location: "India",
  phone: "+91 94733 93799",
  email: "codewithkishanxyz@gmail.com",
  resumeLink: "#", // <-- paste your resume Google Drive link here

  socials: [
    { label: "GITHUB", handle: "codewithkishanx", url: "https://github.com/codewithkishanx" },
    { label: "LINKEDIN", handle: "codewithkishanx", url: "https://linkedin.com/in/codewithkishanx" },
    { label: "LEETCODE", handle: "codewithkishanx", url: "https://leetcode.com/codewithkishanx" },
    { label: "EMAIL", handle: "codewithkishanxyz@gmail.com", url: "mailto:codewithkishanxyz@gmail.com" },
  ],

  // Ticker that scrolls across the top
  marquee: [
    "REACT",
    "NODE.JS",
    "EXPRESS",
    "MONGODB",
    "TYPESCRIPT",
    "NEXT.JS",
    "POSTGRESQL",
    "DOCKER",
    "600+ LEETCODE",
    "OPEN TO WORK",
  ],

  about: {
    heading: "I BUILD LOUD, SCALABLE STUFF.",
    paragraphs: [
      "MCA student (Expected Graduation: 2027) with hands-on experience building full-stack and AI-integrated applications using JavaScript, React, and Node.js.",
      "Strong foundation in Data Structures & Algorithms. Proficient in Java, JavaScript and Python, focused on scalable SaaS and solving complex engineering problems.",
    ],
    stats: [
      { value: "600+", label: "DSA PROBLEMS" },
      { value: "1650+", label: "LEETCODE RATING" },
      { value: "TOP 15%", label: "GLOBAL RANK" },
      { value: "2+", label: "FULL-STACK APPS" },
    ],
  },

  skills: [
    { category: "LANGUAGES", items: ["Java", "JavaScript", "TypeScript", "Python", "SQL"], color: "#FFE600" },
    { category: "FRONTEND", items: ["React", "Next.js", "HTML", "CSS"], color: "#FF6B00" },
    { category: "BACKEND", items: ["Node.js", "Express.js", "REST APIs", "FastAPI"], color: "#00E676" },
    { category: "DB & CLOUD", items: ["PostgreSQL", "MongoDB", "Firebase", "Vercel"], color: "#00D0FF" },
    { category: "TOOLS", items: ["Git", "GitHub", "Docker", "Jira", "Postman", "Figma", "VS Code"], color: "#FF2E9A" },
  ],

  projects: [
    {
      id: "01",
      title: "MyFolio — AI Portfolio Builder",
      stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase", "Vercel", "MiMo AI"],
      description:
        "Generate, customize & deploy portfolios with AI resume parsing (PDF/DOCX/TXT), custom subdomains, analytics & passwordless auth.",
      bullets: [
        "AI resume parsing → auto profile, skills, exp, projects",
        "Auto-deploy SEO-ready HTML to Vercel + subdomain checks",
        "Firebase passwordless + Google OAuth, role-based admin",
      ],
      links: [
        { label: "LIVE ↗", url: "#" },
        { label: "CODE ↗", url: "#" },
      ],
      color: "#FFE600",
      featured: true,
    },
    {
      id: "02",
      title: "Student Project Mgmt System",
      stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Multer", "ImageKit"],
      description:
        "Role-based platform for Students, Mentors & Admins with secure JWT auth, real-time chat & project workflows.",
      bullets: [
        "RESTful APIs for profiles, groups, mentors, projects",
        "Socket.IO real-time student ↔ mentor collaboration",
        "Secure image uploads via Multer + ImageKit",
      ],
      links: [
        { label: "LIVE ↗", url: "https://loomboard.codewithkishanx.co.in/" },
        { label: "CODE ↗", url: "https://github.com/codewithkishanx/STMP-FRONTEND" },
      ],
      color: "#00E676",
      featured: true,
    },
    {
      id: "03",
      title: "DSA Arcade — Learn DSA by Playing",
      stack: ["React", "Python", "FastAPI", "Canvas", "PostgreSQL"],
      description:
        "A gamified platform that teaches DSA through playable visualizations — sort, search and traverse your way up the leaderboard.",
      bullets: [
        "Playable visualizers for sorting, searching, trees & graphs",
        "XP, levels, streaks and leaderboards to keep the grind fun",
        "Python (FastAPI) backend serving challenges and test cases",
      ],
      links: [
        { label: "LIVE ↗", url: "#" },
        { label: "CODE ↗", url: "#" },
      ],
      color: "#FF2E9A",
      featured: false,
    },
  ],

  education: [
    {
      degree: "MCA — Masters of Computer Application",
      school: "Galgotias College of Eng. & Tech.",
      period: "2025 – 27",
      score: "7.57 CGPA (till 2nd sem)",
      color: "#FFE600",
    },
    {
      degree: "BCA — Bachelor of Computer Application",
      school: "L. N. Mishra Institute",
      period: "2022 – 25",
      score: "7.47 CGPA",
      color: "#00D0FF",
    },
  ],

  achievements: [
    "Solved 600+ DSA problems on LeetCode",
    "1650+ Contest Rating — Top 15% globally",
    "Getting Started with AI — IBM SkillsBuild (Feb 2026)",
  ],

  contact: {
    heading: "LET'S BUILD SOMETHING UGLY-GOOD.",
    sub: "Open to internships, freelance & collabs. Fastest reply on email.",
  },

  // What you can do for clients / teams (my suggestion — edit freely)
  services: [
    { icon: "▣", title: "Full-Stack Web Apps", desc: "Complete React + Node.js apps — from idea and DB design to deployed product." },
    { icon: "⇄", title: "REST API Development", desc: "Clean, secure, documented APIs with auth, validation and real-time features." },
    { icon: "✦", title: "AI Feature Integration", desc: "Resume parsing, chatbots and AI workflows wired into real products." },
  ],

  // What you're learning right now — edit freely
  currentlyLearning: [
    { topic: "Docker & Compose", note: "containerizing full-stack apps", pct: 70, color: "#00D0FF" },
    { topic: "AWS Basics", note: "S3, EC2, IAM fundamentals", pct: 45, color: "#FF6B00" },
    { topic: "CI/CD", note: "GitHub Actions pipelines", pct: 55, color: "#00E676" },
    { topic: "Redis & Caching", note: "sessions, rate limits, queues", pct: 40, color: "#FF2E9A" },
  ],

  // Life outside the editor (AI-suggested — edit freely)
  hobbies: [
    { icon: "★", title: "DSA Contests", text: "Weekend LeetCode/CodeChef contests — rating grinding is my cardio." },
    { icon: "⇄", title: "Open Source", text: "Fixing bugs and docs in projects I use. Giving back, learning lots." },
    { icon: "✦", title: "AI Experiments", text: "Testing every new AI tool and API, then breaking it in a side project." },
    { icon: "✎", title: "Tech Writing", text: "Turning things I learn into short notes and threads for others." },
    { icon: "●", title: "Cricket", text: "Gully cricket purist. Fast bowling > everything." },
    { icon: "♪", title: "Music", text: "Lo-fi on loop while coding. Bollywood classics off-duty." },
  ],
};
