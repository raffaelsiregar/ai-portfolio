// Replace these values with your own links when you are ready to publish.
export const profile = {
  name: "Raffael Nathaniel Siregar",
  shortName: "Raffael",
  role: "Vibe coder & digital builder",
  email: "",
  github: "",
  linkedin: "",
  tagline: "Turning curiosity into things you can actually use.",
};

export type Category =
  "All projects" | "AI automation" | "Web apps" | "Windows apps";
export type Project = {
  id: "flow" | "orbit" | "clarity";
  name: string;
  category: Exclude<Category, "All projects">;
  description: string;
  detail: string;
  tags: string[];
  features: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    id: "flow",
    name: "Flowstate",
    category: "AI automation",
    description:
      "Less busywork. More possibility. An intelligent workflow concept that connects the dots for you.",
    detail:
      "A concept for turning repetitive work into a connected, intelligent workflow. Incoming information is organized, summarized, and routed to the right destination, with a human in control.",
    tags: ["Python", "n8n", "AI"],
    features: [
      "Connect everyday tools in one visual workflow",
      "Use AI to summarize and organize information",
      "Review each step before moving forward",
    ],
    accent: "orange",
  },
  {
    id: "orbit",
    name: "Orbit",
    category: "Web apps",
    description:
      "A little space for your next big thing. A calmer, clearer way to keep projects moving.",
    detail:
      "A focused project workspace concept designed around clarity. Gather ideas, organize tasks, and make progress without a crowded interface getting in your way.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    features: [
      "A clear view of what matters next",
      "Lightweight task planning with instant feedback",
      "A responsive workspace for any screen",
    ],
    accent: "purple",
  },
  {
    id: "clarity",
    name: "Clarity",
    category: "Windows apps",
    description:
      "Your desktop, with room to think. A native utility concept for finding focus in the everyday.",
    detail:
      "A Windows utility concept that brings your files into a simple, searchable view. Designed to feel quiet, quick, and at home on your desktop.",
    tags: ["Tauri", "React", "Windows"],
    features: [
      "Find files through a focused search",
      "Keep useful folders within easy reach",
      "A compact interface that stays out of your way",
    ],
    accent: "blue",
  },
];
