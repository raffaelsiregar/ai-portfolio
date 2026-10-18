"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Circle,
  Code2,
  Command,
  FileText,
  Folder,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import {
  profile,
  projects,
  type Category,
  type Project,
} from "@/lib/portfolio";

const categories: Category[] = [
  "All projects",
  "AI automation",
  "Web apps",
  "Windows apps",
];

function Mark({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${small ? "small" : ""}`}
      aria-label="Raffael, back to top"
    >
      r<span>.</span>
    </a>
  );
}

function Sculpture() {
  const lines = Array.from({ length: 74 }, (_, index) => {
    const u = (index / 74) * Math.PI * 2;
    const points = Array.from({ length: 65 }, (_, j) => {
      const v = (j / 64) * Math.PI * 2;
      const x = (130 + 48 * Math.cos(v)) * Math.cos(u);
      const y = (130 + 48 * Math.cos(v)) * Math.sin(u);
      const z = 48 * Math.sin(v);
      const ry = y * Math.cos(0.85) - z * Math.sin(0.85);
      const rz = y * Math.sin(0.85) + z * Math.cos(0.85);
      const rx = x * Math.cos(-0.56) - ry * Math.sin(-0.56);
      const yy = x * Math.sin(-0.56) + ry * Math.cos(-0.56);
      const perspective = 700 / (700 - rz);
      return `${(250 + rx * perspective).toFixed(2)},${(250 + yy * perspective).toFixed(2)}`;
    });
    return (
      <polyline
        key={index}
        points={points.join(" ")}
        fill="none"
        stroke="url(#copper)"
        strokeWidth={1.05}
        opacity={0.45 + Math.sin(u) * 0.25}
      />
    );
  });
  return (
    <div className="sculpture" aria-hidden="true">
      <div className="sculpture-glow" />
      <div className="orbital orbit-one" />
      <div className="orbital orbit-two" />
      <svg className="torus" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="copper" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff0c5" />
            <stop offset=".25" stopColor="#ffb36c" />
            <stop offset=".55" stopColor="#ff783f" />
            <stop offset="1" stopColor="#86301a" />
          </linearGradient>
          <filter id="bloom">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <g className="torus-bloom" filter="url(#bloom)">
          {lines}
        </g>
        <g>{lines}</g>
      </svg>
      <div className="float-token token-code">
        <Code2 size={25} strokeWidth={1.5} />
      </div>
      <div className="float-token token-layers">
        <Layers3 size={25} strokeWidth={1.5} />
      </div>
      <div className="sculpture-caption">
        <span className="tiny-star">✦</span> A little code. A lot of
        possibility.
      </div>
      <span className="coordinate coordinate-one">IDEA_001</span>
      <span className="coordinate coordinate-two">∞ POSSIBILITIES</span>
      <span className="spark spark-one" />
      <span className="spark spark-two" />
    </div>
  );
}

function TrafficLights() {
  return (
    <div className="traffic-lights">
      <i />
      <i />
      <i />
    </div>
  );
}

function FlowPreview({ interactive = false }: { interactive?: boolean }) {
  const [step, setStep] = useState(-1);
  useEffect(() => {
    if (step < 0 || step >= 3) return;
    const timer = setTimeout(() => setStep((value) => value + 1), 650);
    return () => clearTimeout(timer);
  }, [step]);
  return (
    <div
      className={`app-window flow-window ${interactive ? "interactive-preview" : ""}`}
    >
      <div className="window-bar">
        <TrafficLights />
        <span>flowstate</span>
        <MoreHorizontal size={13} />
      </div>
      <div className="flow-body">
        <div className="preview-heading">
          <div>
            <span className="mini-eyebrow">YOUR WORKFLOWS</span>
            <strong>A little less manual.</strong>
          </div>
          <span className="mini-label">
            <span /> Active
          </span>
        </div>
        <div className="workflow-track">
          <div className={`workflow-node ${step >= 0 ? "node-active" : ""}`}>
            <Mail size={20} />
            <span>New email</span>
            <small>Trigger</small>
          </div>
          <div className={`flow-connector ${step >= 1 ? "connected" : ""}`}>
            <span />
            <ChevronRight size={11} />
          </div>
          <div
            className={`workflow-node ai-node ${step >= 1 ? "node-active" : ""}`}
          >
            <Sparkles size={20} />
            <span>AI magic</span>
            <small>Summarize</small>
          </div>
          <div className={`flow-connector ${step >= 2 ? "connected" : ""}`}>
            <span />
            <ChevronRight size={11} />
          </div>
          <div className={`workflow-node ${step >= 2 ? "node-active" : ""}`}>
            <Send size={19} />
            <span>Send to you</span>
            <small>Action</small>
          </div>
        </div>
        <div className="flow-status">
          <span>
            <i />{" "}
            {step === 3
              ? "Workflow complete. All three steps finished."
              : step >= 0
                ? "Running your workflow…"
                : "Your ideas, on autopilot."}
          </span>
          {interactive ? (
            <button onClick={() => setStep(0)} disabled={step >= 0 && step < 3}>
              <Play size={11} />
              {step === 3 ? "Run again" : "Run flow"}
            </button>
          ) : (
            <span className="preview-run">
              <Play size={9} /> Run flow
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function OrbitPreview({ interactive = false }: { interactive?: boolean }) {
  const [done, setDone] = useState([false, true, false]);
  const tasks = [
    "Explore the possibilities",
    "Make something thoughtful",
    "Bring it to life",
  ];
  return (
    <div
      className={`app-window orbit-window ${interactive ? "interactive-preview" : ""}`}
    >
      <div className="window-bar">
        <TrafficLights />
        <span>
          <Circle size={9} /> orbit
        </span>
        <MoreHorizontal size={13} />
      </div>
      <div className="orbit-body">
        <div className="orbit-sidebar">
          <div className="orbit-logo">
            <Circle size={16} />
          </div>
          <Layers3 size={12} />
          <Folder size={12} />
          <div className="sidebar-bottom">R</div>
        </div>
        <div className="orbit-content">
          <div className="orbit-greeting">A little progress, every day.</div>
          <div className="preview-heading">
            <strong>
              My workspace <span>✦</span>
            </strong>
            <span className="purple-plus">
              <Plus size={11} />
            </span>
          </div>
          <div className="orbit-tabs">
            <span className="selected">Today</span>
            <span>Upcoming</span>
            <span>Someday</span>
          </div>
          <div className="task-list">
            {tasks.map((task, i) =>
              interactive ? (
                <button
                  key={task}
                  onClick={() =>
                    setDone((items) =>
                      items.map((value, n) => (n === i ? !value : value)),
                    )
                  }
                  className={`task ${done[i] ? "done" : ""}`}
                  aria-pressed={done[i]}
                >
                  <span className="task-check">
                    {done[i] && <Check size={9} />}
                  </span>
                  <span>{task}</span>
                  <span className="task-dot" />
                </button>
              ) : (
                <div key={task} className={`task ${done[i] ? "done" : ""}`}>
                  <span className="task-check">
                    {done[i] && <Check size={9} />}
                  </span>
                  <span>{task}</span>
                  <span className="task-dot" />
                </div>
              ),
            )}
          </div>
          <div className="orbit-bottom">
            {done.filter(Boolean).length} of 3 little wins{" "}
            <div>
              <span
                style={{ width: `${(done.filter(Boolean).length / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClarityPreview({ interactive = false }: { interactive?: boolean }) {
  const [query, setQuery] = useState("");
  const files = [
    { name: "Projects", count: "Your next big thing", icon: "folder" },
    { name: "Inspiration", count: "A place for the sparks", icon: "folder" },
    { name: "Notes.md", count: "Thoughts, collected", icon: "file" },
  ];
  return (
    <div
      className={`app-window clarity-window ${interactive ? "interactive-preview" : ""}`}
    >
      <div className="window-bar">
        <span className="clarity-title">
          <span className="clarity-symbol">✧</span> Clarity
        </span>
        <span className="windows-controls">
          − <span>□</span> ×
        </span>
      </div>
      <div className="clarity-body">
        <div className="preview-heading">
          <div>
            <span className="mini-eyebrow">A CLEARER HEADSPACE</span>
            <strong>Find your focus.</strong>
          </div>
          <span className="clarity-symbol">✧</span>
        </div>
        <div className="mini-search">
          <Search size={12} />
          {interactive ? (
            <input
              aria-label="Search demo files"
              placeholder="Find something…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          ) : (
            <span>Find something…</span>
          )}
          <span className="search-shortcut">Ctrl K</span>
        </div>
        <div className="file-list">
          {files
            .filter((file) =>
              file.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((file) => (
              <div className="file-row" key={file.name}>
                <span className={`file-icon ${file.icon}`}>
                  {file.icon === "folder" ? (
                    <Folder size={17} fill="currentColor" />
                  ) : (
                    <FileText size={17} />
                  )}
                </span>
                <div>
                  <strong>{file.name}</strong>
                  <span>{file.count}</span>
                </div>
                <ChevronRight size={11} />
              </div>
            ))}
          {files.filter((file) =>
            file.name.toLowerCase().includes(query.toLowerCase()),
          ).length === 0 && (
            <p className="no-files">No files found. Try “Projects”.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Preview({
  id,
  interactive = false,
}: {
  id: Project["id"];
  interactive?: boolean;
}) {
  return id === "flow" ? (
    <FlowPreview interactive={interactive} />
  ) : id === "orbit" ? (
    <OrbitPreview interactive={interactive} />
  ) : (
    <ClarityPreview interactive={interactive} />
  );
}

function Modal({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
      dialog?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal m-auto"
      aria-label={label}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={19} />
        </button>
        {children}
      </div>
    </dialog>
  );
}

function Contact({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Project inquiry for ${profile.name}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("idea")}`;
    if (profile.email) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's build something")}&body=${encodeURIComponent(message)}`;
    } else {
      const url = URL.createObjectURL(
        new Blob([message], { type: "text/plain" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "project-brief.txt";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSaved(true);
    }
  }
  return (
    <Modal onClose={onClose} label="Start a project">
      <div className="contact-modal">
        <span className="eyebrow">THE NEXT GOOD IDEA</span>
        <h2>
          It starts with
          <br />a conversation<span>.</span>
        </h2>
        <p>Tell me what you have in mind.</p>
        <form onSubmit={submit}>
          <label>
            Your name
            <input
              required
              name="name"
              placeholder="Alex Taylor"
              autoComplete="name"
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label>
            The spark
            <textarea
              required
              name="idea"
              placeholder="I have an idea for…"
              rows={4}
              maxLength={4000}
            />
          </label>
          <button className="button button-primary" type="submit">
            {profile.email ? "Create email draft" : "Save project brief"}
            {profile.email ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownToLine size={16} />
            )}
          </button>
          <p className="form-note" role="status">
            {saved
              ? "Brief downloaded. Nothing was sent or stored online."
              : profile.email
                ? "Opens a draft in your email app."
                : "Contact details coming soon. Download your brief to keep it handy; this form does not send messages."}
          </p>
        </form>
      </div>
    </Modal>
  );
}

export default function Portfolio() {
  const [category, setCategory] = useState<Category>("All projects");
  const [project, setProject] = useState<Project | null>(null);
  const [contact, setContact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="header">
        <div className="nav-shell">
          <Mark />
          <nav
            className={menu ? "navigation open" : "navigation"}
            aria-label="Main navigation"
          >
            {[
              { id: "home", label: "Home" },
              { id: "work", label: "Work" },
              { id: "about", label: "About" },
            ].map((item) => (
              <a
                href={`#${item.id}`}
                key={item.id}
                className={active === item.id ? "active" : ""}
                onClick={() => setMenu(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="nav-contact">
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero section-shell overflow-clip">
          <div className="hero-content">
            <div className="intro-pill">
              <span className="status-dot" /> A curious mind. A builder at
              heart.
            </div>
            <p className="hero-intro">
              HEY, I’M {profile.shortName.toUpperCase()}
            </p>
            <h1>
              Ideas,
              <br />
              made{" "}
              <span className="hero-real">
                real<span className="orange-period">.</span>
              </span>
            </h1>
            <p className="hero-description">
              I turn “what if” into “it works.”
              <br />
              Building thoughtful digital experiences with code,
              <br className="desktop-break" /> curiosity, and a little help from
              AI.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                Explore my work <ArrowDown size={16} />
              </a>
              <a href="#about" className="text-link">
                A little about me <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-disciplines">
              <span>AI automation</span>
              <i />
              <span>Web apps</span>
              <i />
              <span>Windows apps</span>
            </div>
          </div>
          <Sculpture />
          <a className="scroll-hint" href="#work">
            <span className="scroll-mouse">
              <i />
            </span>{" "}
            SCROLL TO EXPLORE
          </a>
          <div className="hero-index">PORTFOLIO — VOL. 01</div>
        </section>
        <div className="toolkit section-shell">
          <span className="toolkit-caption">BIG IDEAS. GREAT TOOLS.</span>
          <div className="toolkit-items">
            <span>
              <span className="next-logo">N</span> Next.js
            </span>
            <span>
              <span className="react-logo">⚛</span> React
            </span>
            <span>
              <span className="ts-logo">TS</span> TypeScript
            </span>
            <span>
              <span className="tailwind-logo">≈</span> Tailwind CSS
            </span>
            <span>
              <Workflow size={21} /> n8n
            </span>
            <span>
              <Sparkles size={20} /> AI-powered
            </span>
          </div>
        </div>
        <section id="work" className="work section-shell">
          <div className="section-title-row">
            <div>
              <span className="eyebrow">
                <span /> SELECTED WORK
              </span>
              <h2>
                Curiosity. Meet execution<span className="muted-period">.</span>
              </h2>
            </div>
            <p>
              Small sparks. Thoughtful builds.
              <br />A few possibilities brought to life.
            </p>
          </div>
          <div className="work-toolbar">
            <div
              className="filter-list"
              role="group"
              aria-label="Filter projects"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  {item === "All projects" && (
                    <span>{projects.length.toString().padStart(2, "0")}</span>
                  )}
                </button>
              ))}
            </div>
            <span className="concept-note">
              <Circle size={8} /> Concept collection
            </span>
          </div>
          <div className="project-grid" aria-live="polite">
            {projects
              .filter(
                (item) =>
                  category === "All projects" || item.category === category,
              )
              .map((item) => (
                <button
                  key={item.id}
                  className={`project-card project-${item.accent}`}
                  onClick={() => setProject(item)}
                  aria-label={`Explore ${item.name}, a ${item.category.toLowerCase()} concept`}
                >
                  <div className="project-visual">
                    <div className="project-visual-top">
                      <span>{item.category}</span>
                      <span className="project-number">
                        0{projects.indexOf(item) + 1}
                      </span>
                    </div>
                    <div className="preview-stage">
                      <Preview id={item.id} />
                    </div>
                    <div className="project-visual-bottom">
                      <span>CONCEPT PROJECT</span>
                      <span>✦</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-title">
                      <h3>{item.name}</h3>
                      <span className="project-arrow">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                    <p>{item.description}</p>
                    <div className="tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div className="work-footnote">
            <span className="small-plus">+</span> Always experimenting. Always
            building something new.
          </div>
        </section>
        <section id="about" className="about section-shell">
          <div className="about-visual">
            <div className="about-visual-grid" />
            <span className="about-card-label">
              THE PERSON BEHIND THE PIXELS
            </span>
            <div className="monogram">
              rn<span>.</span>
            </div>
            <div className="profile-window">
              <span className="profile-avatar">R</span>
              <div>
                <strong>{profile.name}</strong>
                <span>{profile.role}</span>
              </div>
              <span className="status-dot" />
            </div>
            <span className="about-visual-footer">
              <Command size={12} /> Driven by curiosity
            </span>
            <span className="about-plus">+</span>
          </div>
          <div className="about-copy">
            <span className="eyebrow">
              <span /> A LITTLE ABOUT ME
            </span>
            <h2>
              Builder by mindset.
              <br />
              Curious by default<span>.</span>
            </h2>
            <p>
              I’m {profile.name}. I explore the space where human ideas meet AI
              possibilities, turning a spark of curiosity into something
              tangible.
            </p>
            <p>
              From automating the repetitive to crafting a web app or making the
              desktop a little more useful, I care about one thing: building
              things that feel good to use.
            </p>
            <div className="about-principles">
              <span>
                <Sparkles size={16} /> AI as a creative partner
              </span>
              <span>
                <Layers3 size={16} /> Thoughtful, inside and out
              </span>
              <span>
                <Code2 size={16} /> Learn. Build. Make it better.
              </span>
            </div>
            <a className="text-link" href="#contact">
              Let’s make something useful <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section className="approach section-shell">
          <div className="approach-intro">
            <span className="eyebrow">THE WAY I BUILD</span>
            <h2>
              A simple idea.
              <br />
              An intentional process.
            </h2>
          </div>
          <div className="process-step">
            <span>01 / IMAGINE</span>
            <h3>Start with “what if.”</h3>
            <p>
              Find a real problem. Ask better questions. Make room for a
              different answer.
            </p>
          </div>
          <div className="process-step">
            <span>02 / BUILD</span>
            <h3>Make it tangible.</h3>
            <p>
              Work with AI, write the code, and turn the first spark into a
              working experience.
            </p>
          </div>
          <div className="process-step">
            <span>03 / REFINE</span>
            <h3>Care for the details.</h3>
            <p>
              Try it. Question it. Keep improving until every interaction feels
              considered.
            </p>
          </div>
        </section>
        <section id="contact" className="contact-section section-shell">
          <div className="contact-glow" />
          <span className="eyebrow">
            <span /> GOOD THINGS START WITH A HELLO
          </span>
          <h2>
            Your next “what if”
            <br />
            could be <span>something great.</span>
          </h2>
          <p>
            An idea, a project, or a conversation.
            <br />
            I’m curious to see where it goes.
          </p>
          <button
            className="button button-primary"
            onClick={() => setContact(true)}
          >
            Let’s build something <ArrowUpRight size={17} />
          </button>
          <div className="contact-signature">
            A human idea. A little AI. A world of possibility.
          </div>
        </section>
      </main>
      <footer className="footer section-shell">
        <div className="footer-brand">
          <Mark small />
          <span>{profile.name}</span>
        </div>
        <span className="footer-crafted">
          Thoughtfully built. Endlessly curious.
        </span>
        <div className="footer-links">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
          )}
          <a href="#home">
            Back to top <ArrowUpRight size={13} />
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
      {project && (
        <Modal
          onClose={() => setProject(null)}
          label={`${project.name} concept project`}
        >
          <div className={`project-detail project-${project.accent}`}>
            <span className="eyebrow">
              {project.category} / CONCEPT PROJECT
            </span>
            <h2>
              {project.name}
              <span>.</span>
            </h2>
            <p>{project.detail}</p>
            <div className="detail-preview">
              <Preview id={project.id} interactive />
            </div>
            <div className="demo-caption">
              <Sparkles size={13} /> Interactive concept —{" "}
              {project.id === "flow"
                ? "run the workflow to see it in action"
                : project.id === "orbit"
                  ? "click a task to mark it complete"
                  : "type in the search to find a file"}
              .
            </div>
            <h3>Built around the little things.</h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="concept-disclaimer">
              This is an illustrative project concept, not a released product.
              Replace it with a real project in the portfolio configuration.
            </p>
          </div>
        </Modal>
      )}
      {contact && <Contact onClose={() => setContact(false)} />}
    </>
  );
}
