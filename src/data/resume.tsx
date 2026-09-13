import { Icons, type IconProps } from "@/components/icons";
import {
  BriefcaseIcon,
  CodeXmlIcon,
  HomeIcon,
  LayersIcon,
  LayoutTemplateIcon,
  MailIcon,
  ServerIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";

// Everything on the site is driven from this file.
// Items marked "TODO(content)" are placeholders: replace them with your real details.

export type ProjectCategory = "internship" | "personal";

export interface Project {
  title: string;
  category: ProjectCategory;
  /** Company or client the project was built for (internship/client work). */
  client?: string;
  href?: string;
  dates?: string;
  role: string;
  /** The goal or problem the project solves. */
  problem?: string;
  description: string;
  /** What was delivered, or the result. */
  outcome?: string;
  technologies: string[];
  links: { type: string; href: string; icon: ReactNode }[];
  video?: string;
  /** Lightweight still shown instead of loading the video up front. */
  poster?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
}

export interface WorkItem {
  company: string;
  href?: string;
  /** Text for the link to `href`, e.g. "Certificate". */
  linkLabel?: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
}

export interface Skill {
  name: string;
  /** File name in /public/logos (without .svg). */
  logo: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface Social {
  name: string;
  url: string;
  icon: ComponentType<IconProps>;
  navbar: boolean;
}

const services: Service[] = [
  {
    title: "Website redesign & fixes",
    description:
      "Make an existing site faster, mobile-friendly and modern, or fix the bugs and layout issues holding it back.",
    icon: WrenchIcon,
    deliverables: [
      "Speed & Core Web Vitals",
      "Mobile & responsive fixes",
      "UI refresh",
      "Bug fixes & SEO basics",
    ],
  },
  {
    title: "Business & landing websites",
    description:
      "A professional, responsive website or landing page that explains what you do and turns visitors into enquiries.",
    icon: LayoutTemplateIcon,
    deliverables: [
      "Custom responsive design",
      "Contact & WhatsApp enquiry forms",
      "SEO-ready pages",
      "Domain & hosting setup",
    ],
  },
  {
    title: "React & Next.js web apps",
    description:
      "Interactive web apps, dashboards and single-page apps built with React and Next.js.",
    icon: CodeXmlIcon,
    deliverables: [
      "Dashboards & SPAs",
      "API integrations",
      "Reusable components",
      "Fast, SEO-friendly builds",
    ],
  },
  {
    title: "Full-stack MERN",
    description:
      "Complete applications with a Node.js and Express API, a MongoDB database and a React front end.",
    icon: ServerIcon,
    deliverables: [
      "REST APIs",
      "MongoDB data models",
      "Login & admin panels",
      "Deployment",
    ],
  },
];

const projects: Project[] = [
  // TODO(content): add your internship/client projects here with category "internship", e.g.
  // {
  //   title: "Apple Vision Pro landing page",
  //   category: "internship",
  //   client: "Codsoft",
  //   href: "https://…",
  //   dates: "Aug 2023",
  //   role: "Front-end developer",
  //   problem: "What the client needed…",
  //   description: "What you built…",
  //   outcome: "The result…",
  //   technologies: ["HTML", "CSS", "JavaScript"],
  //   links: [{ type: "Website", href: "https://…", icon: <Icons.globe className="size-3" /> }],
  //   poster: "/posters/your-screenshot.webp",
  // },
  // Add a `dates` field to any project below if you want dates shown on its card.
  {
    title: "Home Review",
    category: "internship",
    href: "https://homereview.co.nz/",
    role: "Full-stack & mobile development",
    problem:
      "Turn room-by-room walkthrough videos into property condition reports automatically.",
    description:
      "An AI-driven video inspection web and mobile app that analyses walkthrough recordings to generate property condition reports and tenant ratings.",
    outcome:
      "Dynamic pricing engine, portable AI-based tenant ratings across the tenancy lifecycle, tenant report generation, digital NDA signing and a cross-platform mobile app built with Capacitor.",
    technologies: ["Java", "Spring Boot", "React", "Capacitor", "REST APIs"],
    links: [
      {
        type: "Website",
        href: "https://homereview.co.nz/",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    poster: "/posters/homereview.webp",
  },
  {
    title: "ICOSA",
    category: "internship",
    href: "https://icosaonline.com/",
    role: "Full-stack development",
    problem:
      "Run research-backed accreditation for K-12 schools in 15+ countries online.",
    description:
      "A global school accreditation platform offering dual-assessment certification for K-12 schools.",
    outcome:
      "Four role-based portals (School, Counsellor, Admin, Super Admin) connected to Spring Boot REST APIs, with secure Razorpay payments for accreditation fees.",
    technologies: ["Java", "Spring Boot", "React", "Razorpay API"],
    links: [
      {
        type: "Website",
        href: "https://icosaonline.com/",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    poster: "/posters/icosa.webp",
  },
  {
    title: "T-FOMS",
    category: "internship",
    client: "Telangana Forest Department",
    href: "https://tfoms.pages.dev/",
    role: "Backend & mobile development",
    problem: "Digitise forest-offence case management across 8 officer roles.",
    description:
      "A role-based forest offence case management system for recording, reviewing and approving cases.",
    outcome:
      "Spring Boot REST APIs for offence recording, case review and approval workflows, plus a Capacitor mobile app for field officers to log offences and capture evidence on-site.",
    technologies: ["Java", "Spring Boot", "Capacitor", "REST APIs"],
    links: [
      {
        type: "Website",
        href: "https://tfoms.pages.dev/",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    poster: "/posters/tfoms.webp",
  },
  {
    title: "CallEase",
    category: "personal",
    href: "https://video-calling-web-app-call-ease-seven.vercel.app/",
    dates: "Mar 2025 – Apr 2025",
    role: "Solo project: design & development",
    problem:
      "Start a video call straight from the browser, with no app to install.",
    description:
      "A responsive audio/video calling web app built with React and Tailwind CSS on top of a video-calling API.",
    outcome:
      "Call start and end, mute/unmute and live UI updates with React Hooks and Context API, working on desktop and mobile.",
    technologies: ["React", "Tailwind CSS", "Vite", "Video API"],
    // The source repo (github.com/17ishan/video-calling-web-app-CallEase.-) no longer exists, so only the live site is linked.
    links: [
      {
        type: "Website",
        href: "https://video-calling-web-app-call-ease-seven.vercel.app/",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    video: "/callEase.mp4",
    poster: "/posters/callEase.webp",
  },
];

const work: WorkItem[] = [
  {
    company: "Vidyayatan Technologies",
    badges: [],
    location: "On-site, Bhopal",
    title: "Software Development Intern",
    logoUrl: "/vidyayatanLogo.jpg",
    start: "Feb 2026",
    end: "Jun 2026",
    description:
      "Built a real-time dashboard for internal use so users could view live data and interact with system features. Fixed integration issues between the frontend and backend to keep data flowing reliably, and built reusable UI components and application state, collaborating with the team through Git-based version control.",
  },
  {
    company: "MP Police",
    href: "https://www.linkedin.com/posts/ishan-sinha-858097230_mppoliceinternship-lawenforcement-professionalgrowth-activity-7071545684755103744-jqyk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADmtTQQBFr8x9Ng3zT8cOYAZjLAwp5kIJys",
    linkLabel: "LinkedIn post",
    badges: [],
    location: "Bhopal, Madhya Pradesh",
    title: "Cyber Security Intern",
    logoUrl: "/MPpoliceLogo.png",
    start: "May 2022",
    end: "Apr 2023",
    description:
      "Selected among 200 of 500 applicants for an internship focused on cyber-security awareness and fraud detection. Worked with the authorities to analyse areas prone to cyber fraud, learning how different fraud types work and how to prevent them.",
  },
];

const testimonials: Testimonial[] = [
  // TODO(content): add 1–3 short quotes from clients or internship mentors. The section stays hidden while this is empty.
  // { quote: "Ishan rebuilt our website in two weeks…", name: "Name Surname", role: "Owner, Company" },
];

// Shown as logo tiles in the Skills section, in this order (main stack first).
// Logos live in /public/logos (monochrome SVGs from simple-icons).
const skills: Skill[] = [
  { name: "Java", logo: "java" },
  { name: "Spring Boot", logo: "springboot" },
  { name: "React", logo: "react" },
  { name: "Next.js", logo: "nextdotjs" },
  { name: "Node.js", logo: "nodedotjs" },
  { name: "JavaScript", logo: "javascript" },
  { name: "Express", logo: "express" },
  { name: "SQL", logo: "mysql" },
  { name: "MongoDB", logo: "mongodb" },
  { name: "Supabase", logo: "supabase" },
  { name: "Capacitor", logo: "capacitor" },
  { name: "Tailwind CSS", logo: "tailwindcss" },
  { name: "shadcn/ui", logo: "shadcnui" },
  { name: "Razorpay", logo: "razorpay" },
  { name: "Git & GitHub", logo: "github" },
  { name: "Postman", logo: "postman" },
  { name: "HTML", logo: "html5" },
  { name: "CSS", logo: "css" },
];

// Skills without a logo, listed as text under the grid.
const otherSkills = ["REST APIs", "Responsive design"];

export const DATA = {
  name: "Ishan Sinha",
  initials: "IS",
  // TODO(content): switch to your custom domain once you have one.
  url: "https://my-portfolio-dhey.vercel.app",
  location: "Bhopal, India",
  role: "Freelance Web Developer",
  description:
    "Freelance web developer. I build fast, modern websites and web apps for businesses in India and worldwide.",
  summary:
    "I'm Ishan, a full-stack developer from Bhopal with a B.Tech in Information Technology (2025). I've shipped three production web and mobile apps with Java, Spring Boot, React and Capacitor, and I also build responsive websites and Next.js and MERN apps. I care about the details that make a site fast, easy to use and easy to find. Whether you need a new website, a redesign or a fix, I'd love to help.",
  avatarUrl: "/myPhoto.jpg",
  availability: {
    status: "Available for new projects",
    responseTime: "I usually reply within 24 hours",
  },
  skills,
  otherSkills,
  // Dock links. `sections`: the page sections that highlight the link while in view.
  navbar: [
    { href: "#hero", icon: HomeIcon, label: "Home", sections: ["hero", "about"] },
    { href: "#services", icon: LayersIcon, label: "Services", sections: ["services"] },
    { href: "#projects", icon: BriefcaseIcon, label: "Work", sections: ["projects", "process"] },
    { href: "#contact", icon: MailIcon, label: "Contact", sections: ["faq", "contact"] },
  ],
  contact: {
    email: "iishansinhaa@gmail.com",
    // TODO(content): confirm this is your WhatsApp number (country code + number, digits only).
    whatsapp: "917987492361",
    // Optional booking link, e.g. "https://calendly.com/your-name/intro-call". Leave empty to hide the button.
    calendly: "",
    // Web3Forms access key for the contact form: get one free at https://web3forms.com by entering your email.
    // It's designed to be public. While it's empty, the form offers WhatsApp, email and Gmail buttons instead of sending.
    formAccessKey: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/17ishan",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ishan-sinha-858097230/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:iishansinhaa@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    } satisfies Record<string, Social>,
  },
  services,
  process: [
    {
      title: "Discover",
      description:
        "We talk about your goals, audience and must-have features. You get a clear scope and timeline before any work starts.",
    },
    {
      title: "Design",
      description:
        "I plan the structure and look of your site so you can review and approve it before development.",
    },
    {
      title: "Build",
      description:
        "I develop your site or app with regular updates and a live preview link you can check at any time.",
    },
    {
      title: "Launch & support",
      description:
        "I deploy to your domain, hand everything over, and stay available for fixes and updates.",
    },
  ],
  // TODO(content): review these answers so they match how you want to work.
  faq: [
    {
      question: "How long does a project take?",
      answer:
        "A landing page usually takes 1–2 weeks and a multi-page business website 2–4 weeks. Web apps depend on the features, and you get a timeline before we start.",
    },
    {
      question: "Do you work with clients outside India?",
      answer:
        "Yes. I work remotely with clients in India and abroad, communicate over email, WhatsApp or video calls, and adjust meeting times to your time zone.",
    },
    {
      question: "Can I ask for changes?",
      answer:
        "Of course. Rounds of revisions are agreed as part of the scope, so you know exactly what's included before we begin.",
    },
    {
      question: "Can you help with hosting and a domain?",
      answer:
        "Yes. I can deploy your site on Vercel, Netlify or your existing hosting and connect it to your domain.",
    },
    {
      question: "Do you offer support after launch?",
      answer:
        "Yes. I fix any bugs in what I built and can take on ongoing updates whenever you need them.",
    },
    {
      question: "How do we get started?",
      answer:
        "Send a message through the form below or on WhatsApp with a short description of your project, and I'll get back to you with next steps.",
    },
  ],
  testimonials,
  work,
  education: [
    {
      school: "Oriental College of Technology",
      href: "https://oriental.ac.in/oct-bhopal",
      degree: "B.Tech, Information Technology",
      logoUrl: "/OCTlogo.jpg",
      start: "2021",
      end: "2025",
    },
    {
      school: "Mother Teresa Senior Secondary School",
      href: "https://www.motherteresaschool.net/",
      degree: "Class 12",
      logoUrl: "/mtsslogo.jpg",
      start: "2020",
      end: "2021",
    },
    {
      school: "Mother Teresa Senior Secondary School",
      href: "https://www.motherteresaschool.net/",
      degree: "Class 10",
      logoUrl: "/mtsslogo.jpg",
      start: "2018",
      end: "2019",
    },
  ],
  projects,
};
