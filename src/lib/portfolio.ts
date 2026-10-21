// Replace these values with your own links when you are ready to publish.
export const profile = {
  name: "Raffael Nathaniel Siregar",
  shortName: "Raffael",
  role: "Vibe coder & digital builder",
  photo: "/profile.png",
  email: "raffaelnathanielsiregar@gmail.com",
  whatsapp: "https://wa.me/6287884440256",
  github: "",
  linkedin: "https://www.linkedin.com/in/raffaelnathanielsiregar/",
  tagline: "Turning curiosity into things you can actually use.",
};

export type Status = "Released" | "In development" | "Upcoming";
export type Category = "AI automation" | "Web apps" | "Windows apps";
export type Project = {
  id: string;
  name: string;
  category: Category;
  status: Status;
  description: string;
  detail: string;
  tags: string[];
  features: string[];
  accent: "orange" | "purple" | "blue";
  image?: string;
  captureNote?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: "ezscan",
    name: "ezScan",
    category: "Web apps",
    status: "Released",
    accent: "purple",
    description:
      "From paper to searchable PDF. A private, browser-based document scanner with built-in OCR.",
    detail:
      "Capture or upload pages, fine-tune the crop, and recognize Indonesian and English text. ezScan creates searchable PDFs without uploading your documents to a server.",
    tags: ["JavaScript", "Tesseract.js", "Canvas"],
    features: [
      "Multi-page scanning, cropping, and image filters",
      "Indonesian and English OCR in the browser",
      "Searchable PDF and per-page ZIP export",
    ],
    image: "/projects/ezscan.jpg",
    captureNote:
      "Captured from the local app. Camera access is optional; documents can also be uploaded.",
    url: "https://ezscan.vercel.app",
  },
  {
    id: "worshipnow",
    name: "WorshipNow",
    category: "Web apps",
    status: "Released",
    accent: "purple",
    description:
      "Rehearse the details. Lead with confidence. Songs, setlists, and practice cues in one workspace.",
    detail:
      "A workspace for the people behind the song. WorshipNow brings song organization, setlists, rehearsal markers, and live performance views together so the whole set stays close at hand.",
    tags: ["Next.js", "TypeScript", "Prisma"],
    features: [
      "Song bank and worship setlist organization",
      "Practice markers and rehearsal notes",
      "A dedicated live mode for the room",
    ],
    image: "/projects/worshipnow.png",
    captureNote:
      "Existing local project capture of a rehearsal setlist. The released app requires sign-in.",
    url: "https://worshipnow.vercel.app",
  },
  {
    id: "gbi-bkp-bcp",
    name: "GBI BKP BCP",
    category: "Web apps",
    status: "Released",
    accent: "orange",
    description:
      "A digital home for a real community. A welcoming website for GBI BKP BCP.",
    detail:
      "A church website that introduces the community, its vision, and its ministries. Visitors can explore service schedules, discover COOL groups, and find the right way to connect.",
    tags: ["HTML", "CSS", "JavaScript"],
    features: [
      "Church vision, annual theme, and ministry information",
      "Service schedules and COOL community details",
      "Responsive pages with contact and location information",
    ],
    image: "/projects/gbi-bkp-bcp.jpg",
    captureNote: "Captured from the local church website.",
    url: "https://gbibkpbcp.my.id",
  },
  {
    id: "mfd-usage-report",
    name: "MFD Usage Report",
    category: "Web apps",
    status: "Released",
    accent: "blue",
    description:
      "Machine exports, made meaningful. Turn copier usage logs into clear reports and cost insights.",
    detail:
      "A browser-based analytics dashboard for multifunction printer job histories. Merge exports, clean the records, and explore page counts, users, and estimated printing costs while keeping file processing local.",
    tags: ["Next.js", "Recharts", "IndexedDB"],
    features: [
      "Merge and clean multiple CSV job-history exports",
      "Filter usage and calculate printing cost estimates",
      "Export reports as CSV, HTML, or print-ready PDF",
    ],
    image: "/projects/mfd-usage-report.jpg",
    captureNote:
      "Captured from the local dashboard using synthetic sample data, not customer reports.",
    url: "https://usagereport.vercel.app",
  },
  {
    id: "rns-salescrm",
    name: "RNS Sales CRM",
    category: "Web apps",
    status: "Released",
    accent: "orange",
    description:
      "A clearer picture of every opportunity. A focused workspace for day-to-day sales activity.",
    detail:
      "A customized sales CRM with customer records, canvassing activity, project tracking, calendar, dashboard, and machine-in-field views. Built to keep the sales workflow in one place.",
    tags: ["Next.js", "React", "Prisma"],
    features: [
      "Customer and sales opportunity management",
      "Canvassing, project, and calendar views",
      "Dashboard and machine-in-field tracking",
    ],
    image: "/projects/rns-salescrm.jpg",
    captureNote:
      "Captured from an isolated local preview using sample data, without production credentials or customer records. The released app requires sign-in.",
    url: "https://rns-salescrm.vercel.app",
  },
  {
    id: "stock-research-copilot",
    name: "Stock Research Copilot",
    category: "AI automation",
    status: "In development",
    accent: "blue",
    description:
      "A research companion for Indonesian equities. Fundamental, technical, and AI-assisted analysis in one workspace.",
    detail:
      "An in-progress research workspace for the Indonesian stock market. It explores market dashboards, AI-assisted research, data verification, and portfolio views. This project is still being developed and is not a finished release.",
    tags: ["Next.js", "AI", "TypeScript"],
    features: [
      "Market overview and Indonesian equity research",
      "AI-assisted fundamental and technical research workflows",
      "Data verification and portfolio views under development",
    ],
    image: "/projects/stock-research-copilot.png",
    captureNote:
      "Existing local development capture with demo market data. The interface may change before release.",
  },
  {
    id: "praisenow",
    name: "PraiseNow",
    category: "Windows apps",
    status: "In development",
    accent: "purple",
    description:
      "Built for the people behind the screen. An offline worship presentation app, designed for Windows.",
    detail:
      "A Windows-first worship presentation application built with Tauri. Current work covers songs, Bible passages, playlists, media, and separate preview and audience output. Development and platform verification are ongoing.",
    tags: ["Tauri", "Rust", "React"],
    features: [
      "Song lyrics, Bible passages, and service playlists",
      "Media backgrounds and separate preview/program views",
      "Offline local storage; Windows-first desktop experience",
    ],
    image: "/projects/praisenow.png",
    captureNote:
      "Captured from the native macOS development build. The intended release platform is Windows; this project is still in development.",
  },
  {
    id: "easyquot",
    name: "easyQuot",
    category: "AI automation",
    status: "Upcoming",
    accent: "orange",
    description:
      "Less time assembling quotations. More time working with customers.",
    detail:
      "A planned retail-market quotation automation application for Astragraphia business consultants. This project is at the idea stage; implementation and screenshots are not available yet.",
    tags: ["Quotation automation", "Planning"],
    features: [
      "Planned focus: retail-market quotation preparation",
      "Designed around the business consultant workflow",
    ],
  },
  {
    id: "onlinepo",
    name: "onlinePO",
    category: "Web apps",
    status: "Upcoming",
    accent: "blue",
    description:
      "The next idea on the workbench. Details will follow as the project takes shape.",
    detail:
      "An upcoming project with a reserved workspace. Its scope and technical stack have not been defined yet; there is no working application to preview.",
    tags: ["Upcoming", "Scope to follow"],
    features: [
      "Reserved for a future project",
      "Scope and implementation to be announced",
    ],
  },
  {
    id: "pocketrav",
    name: "pockeTrav",
    category: "Web apps",
    status: "Upcoming",
    accent: "purple",
    description:
      "Shared adventures. Simpler expenses. A pocket companion for group travel.",
    detail:
      "An idea for helping groups manage shared expenses while traveling. This project is in planning, with its experience and implementation still to come.",
    tags: ["Travel", "Shared expenses", "Planning"],
    features: [
      "Planned focus: group travel expenses",
      "An early-stage idea, with implementation still ahead",
    ],
  },
];
