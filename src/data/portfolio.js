// ============================================================
// ★ EDIT EVERYTHING HERE ★
// Change your name, links, projects, skills in this ONE file.
// No need to touch any other code.
// ============================================================

export const profile = {
  name: "PREM KISHOR",
  firstName: "PREM",
  lastName: "KISHOR",
  roles: ["SOFTWARE DEVELOPER", "FULL-STACK", "API DEVELOPMENT"],
  tagline:
    "MCA student ('27) building full-stack & AI-integrated apps. 200+ DSA problems solved. I ship scalable SaaS.",
  location: "India",
  phone: "+91 6299082449",
  email: "premkishor131@gmail.com",
  resumeLink: "#", // <-- paste your resume Google Drive link here

  socials: [
    { label: "GITHUB", handle: "prem-kishor123", url: "https://github.com/prem-kishor123" },
    { label: "LINKEDIN", handle: "premkishor131", url: "https://linkedin.com/in/premkishor131" },
    { label: "LEETCODE", handle: "PREM2604", url: "https://leetcode.com/PREM2604" },
    { label: "EMAIL", handle: "premkishor131@gmail.com", url: "mailto:premkishor131@gmail.com" },
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
    "POSTMAN",
    "200+ LEETCODE",
    "OPEN TO WORK",
  ],

  about: {
    heading: "I BUILD LOUD, SCALABLE STUFF.",
    paragraphs: [
      "MCA student (Expected Graduation: 2027) with hands-on experience building full-stack and AI-integrated applications using JavaScript, React, and Node.js.",
      "Strong foundation in Data Structures & Algorithms. Proficient in Java, JavaScript and Python, focused on scalable SaaS and solving complex engineering problems.",
    ],
    stats: [
      { value: "200+", label: "DSA PROBLEMS" },
      { value: "2+", label: "FULL-STACK APPS" },
      { value: "10+", label: "REST APIS BUILT" },
      { value: "8+", label: "TECH STACK" },
    ],
  },

  skills: [
    { category: "LANGUAGES", items: ["Java", "JavaScript", "TypeScript", "Python", "SQL"], color: "#FFE600" },
    { category: "FRONTEND", items: ["React", "Next.js", "HTML", "CSS"], color: "#FF6B00" },
    { category: "BACKEND", items: ["Node.js", "Express.js", "REST APIs", "FastAPI"], color: "#00E676" },
    { category: "DB & CLOUD", items: ["PostgreSQL", "MongoDB", "Firebase", "Vercel"], color: "#00D0FF" },
    { category: "TOOLS", items: ["Git", "GitHub", "Postman", "VS Code"], color: "#FF2E9A" },
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
        { label: "LIVE ↗", url: "#" },
        { label: "CODE ↗", url: "#" },
      ],
      color: "#00E676",
      featured: true,
    },
  ],

  education: [
    {
      degree: "MCA — Masters of Computer Application",
      school: "Noida Institute of Engineering and Technology",
      period: "2025 – 27",
      score: "8.24 CGPA (till 2nd sem)",
      color: "#FFE600",
    },
    {
      degree: "BCA — Bachelor of Computer Application",
      school: "L. N. Mishra Institute",
      period: "2022 – 25",
      score: "7.72 CGPA",
      color: "#00D0FF",
    },
  ],

  achievements: [
    "Solved 200+ DSA problems on LeetCode",
    "Getting Started with Artificial Intelligence — IBM SkillsBuild (Feb 2026)",
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
    { icon: "★", title: "DSA Contests", text: "Weekend LeetCode contests — rating grinding is my cardio." },
    { icon: "⇄", title: "Open Source", text: "Fixing bugs and docs in projects I use. Giving back, learning lots." },
    { icon: "✦", title: "AI Experiments", text: "Testing every new AI tool and API, then breaking it in a side project." },
    { icon: "✎", title: "Tech Writing", text: "Turning things I learn into short notes and threads for others." },
    { icon: "●", title: "Cricket", text: "Gully cricket purist. Fast bowling > everything." },
    { icon: "♪", title: "Music", text: "Lo-fi on loop while coding. Bollywood classics off-duty." },
  ],
};
