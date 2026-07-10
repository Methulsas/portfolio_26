export const profile = {
  firstName: "METHUL",
  lastName: "SASRUTHA",
  roles: ["AI Engineer", "Full Stack Developer", "MLOps Learner"],
  location: "Sri Lanka",
  email: "methuldev@gmail.com",
  github: "https://github.com/methul-sasrutha",
  githubUsername: "methul-sasrutha",
  linkedin: "https://linkedin.com/in/methulsasrutha",
  instagram: "https://instagram.com/methulsasrutha",
  resumeUrl: "#",
};

export const timeline = [
  {
    year: "2024",
    title: "Started Programming",
    desc: "Wrote my first lines of Python and fell in love with building things from scratch.",
  },
  {
    year: "2025",
    title: "Web Development",
    desc: "Learned Django, React and shipped full-stack applications end to end.",
  },
  {
    year: "2025",
    title: "Machine Learning",
    desc: "Dove into ML fundamentals, model training and data pipelines.",
  },
  {
    year: "2026",
    title: "MLOps",
    desc: "Learning to deploy, monitor and scale ML systems in production.",
  },
  {
    year: "Future",
    title: "AI Company Founder",
    desc: "Building an AI-first company that ships real products to the world.",
  },
];

export const experienceRoadmap = [
  "Student",
  "Web Developer",
  "ML Engineer",
  "MLOps Engineer",
  "AI Architect",
  "Founder",
];

export const skills = [
  { name: "Python", level: 90 },
  { name: "Django", level: 82 },
  { name: "React", level: 85 },
  { name: "Docker", level: 75 },
  { name: "Git", level: 88 },
  { name: "Linux", level: 70 },
  { name: "TensorFlow", level: 35 },
  { name: "PostgreSQL", level: 78 },
  { name: "AWS", level: 40 },
  { name: "Kubernetes", level: 30 },
];

export const techStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "Docker",
  "GitHub",
  "Linux",
  "PostgreSQL",
  "FastAPI",
  "VS Code",
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  cover: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  features: string[];
  screenshots: string[];
  architecture: string;
  challenges: string;
  lessons: string;
};

export const projects: Project[] = [
  {
    id: "sms",
    title: "Student Management System",
    tagline: "Full-stack platform to manage students, grades and attendance.",
    cover: "linear-gradient(135deg,#7c5cff,#22d3ee)",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Django", "React", "PostgreSQL", "Docker", "Tailwind CSS"],
    features: [
      "Role based auth for admins, teachers & students",
      "Attendance tracking with analytics dashboard",
      "Automated grade reports & CSV export",
      "Realtime notifications for parents",
    ],
    screenshots: [
      "linear-gradient(135deg,#111827,#312e81)",
      "linear-gradient(135deg,#0f172a,#1e3a8a)",
      "linear-gradient(135deg,#1e293b,#4c1d95)",
    ],
    architecture:
      "React SPA talks to a Django REST API secured with JWT. PostgreSQL stores relational data, Celery handles background jobs (report generation, emails), everything is containerized with Docker Compose and deployed to Railway.",
    challenges:
      "Designing a permission system flexible enough for 4 different user roles while keeping the API simple, and optimizing N+1 queries in the reporting dashboard.",
    lessons:
      "Learned to profile Django ORM queries with django-debug-toolbar, and how to structure a scalable REST API with DRF viewsets & serializers.",
  },
  {
    id: "mlpipe",
    title: "MLOps Training Pipeline",
    tagline: "Automated pipeline to train, version and deploy ML models.",
    cover: "linear-gradient(135deg,#ff5cad,#7c5cff)",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Python", "TensorFlow", "Docker", "GitHub Actions", "AWS"],
    features: [
      "CI/CD pipeline that retrains models on new data",
      "Experiment tracking & versioning",
      "One-click model deployment to a REST endpoint",
      "Drift detection & monitoring dashboard",
    ],
    screenshots: [
      "linear-gradient(135deg,#1e1b4b,#701a75)",
      "linear-gradient(135deg,#312e81,#831843)",
      "linear-gradient(135deg,#0f172a,#581c87)",
    ],
    architecture:
      "GitHub Actions triggers training jobs on a schedule, artifacts are pushed to S3, a FastAPI service serves the latest model version behind a Docker container on AWS ECS.",
    challenges:
      "Keeping training reproducible across environments and building a lightweight model registry without expensive managed tools.",
    lessons:
      "Understood the full ML lifecycle from data validation to production monitoring, and why MLOps is as much about engineering discipline as it is about ML.",
  },
  {
    id: "portfolio",
    title: "AI Portfolio Website",
    tagline: "This very site — an interactive, AI-powered developer portfolio.",
    cover: "linear-gradient(135deg,#22d3ee,#ff5cad)",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    features: [
      "3D animated hero with particle background",
      "Rule-based AI chatbot answering visitor questions",
      "Command terminal for power users",
      "Live GitHub statistics integration",
    ],
    screenshots: [
      "linear-gradient(135deg,#020617,#3730a3)",
      "linear-gradient(135deg,#0c0a1d,#9333ea)",
      "linear-gradient(135deg,#111827,#0891b2)",
    ],
    architecture:
      "A single-page React app with themeable CSS variables, canvas-based particle system and modular sections, deployable as a static site to Vercel.",
    challenges:
      "Balancing visual flair with performance — keeping animations smooth at 60fps while running a canvas particle simulation.",
    lessons:
      "Learned advanced Framer Motion patterns, canvas rendering optimisation and how to design a component architecture that stays maintainable as features grow.",
  },
];

export const certificates = [
  { title: "Python for Everybody", issuer: "University of Michigan", year: "2024", color: "#7c5cff" },
  { title: "Django Web Framework", issuer: "Udemy", year: "2024", color: "#22d3ee" },
  { title: "Machine Learning Specialization", issuer: "DeepLearning.AI", year: "2025", color: "#ff5cad" },
  { title: "Docker & Kubernetes", issuer: "KodeKloud", year: "2025", color: "#f97316" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2025", color: "#facc15" },
  { title: "MLOps Fundamentals", issuer: "Coursera", year: "2026", color: "#4ade80" },
];

export const blogPosts = [
  { title: "How I Learned Docker", date: "Coming soon", excerpt: "A breakdown of containers, images and why Docker changed how I ship code." },
  { title: "My First AI Project", date: "Coming soon", excerpt: "Building and training my very first machine learning model from scratch." },
  { title: "Deploying Django", date: "Coming soon", excerpt: "A practical guide to shipping Django apps to production with confidence." },
  { title: "Learning Kubernetes", date: "Coming soon", excerpt: "Notes from my journey learning container orchestration at scale." },
  { title: "Building an AI Portfolio", date: "Coming soon", excerpt: "How I designed and built this very portfolio site, feature by feature." },
];

export const liveStats = [
  { label: "Projects", value: 12, suffix: "" },
  { label: "GitHub Commits", value: 650, suffix: "+" },
  { label: "Certificates", value: 18, suffix: "" },
  { label: "Coffee", value: 0, suffix: "∞" },
];

export const chatbotKnowledge: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey"],
    answer: "Hey there 👋 I'm Methul's AI assistant. Ask me about his projects, skills, or how to reach him!",
  },
  {
    keywords: ["about", "who", "methul"],
    answer:
      "Methul Sasrutha is an AI Engineer, Full Stack Developer and MLOps learner from Sri Lanka, on a mission to found an AI company.",
  },
  {
    keywords: ["project", "built", "work"],
    answer:
      "Methul has built a Student Management System, an MLOps training pipeline, and this AI-powered portfolio. Check the Projects section for full case studies!",
  },
  {
    keywords: ["skill", "tech", "stack", "language"],
    answer:
      "His core stack: Python, Django, React, Docker, Git, Linux, TensorFlow, PostgreSQL, AWS and Kubernetes.",
  },
  {
    keywords: ["cv", "resume", "download"],
    answer: "You can download his CV from the Resume section — I'll scroll you there!",
  },
  {
    keywords: ["contact", "email", "reach"],
    answer: "You can reach Methul via the Contact section, email, or LinkedIn — all linked at the bottom of the page.",
  },
  {
    keywords: ["experience", "career", "roadmap"],
    answer:
      "His roadmap: Student → Web Developer → ML Engineer → MLOps Engineer → AI Architect → Founder. He's actively climbing it!",
  },
  {
    keywords: ["certificate", "certification"],
    answer: "He holds 18 certificates including Python, Django, Machine Learning, Docker/Kubernetes and AWS.",
  },
];
