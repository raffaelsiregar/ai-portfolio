"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  AppWindow,
  Check,
  ChevronDown,
  Circle,
  Code2,
  Command,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { profile, projects, type Status, type Project } from "@/lib/portfolio";

const statuses: ("All projects" | Status)[] = [
  "All projects",
  "Released",
  "In development",
  "Upcoming",
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
  const sculptureRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
  } | null>(null);

  function moveSculpture(element: HTMLDivElement, x: number, y: number) {
    position.current = {
      x: Math.max(
        -Math.min(80, element.clientWidth * 0.15),
        Math.min(Math.min(80, element.clientWidth * 0.15), x),
      ),
      y: Math.max(-65, Math.min(65, y)),
    };
    element.style.setProperty("--drag-x", `${position.current.x}px`);
    element.style.setProperty("--drag-y", `${position.current.y}px`);
  }

  function resetSculpture() {
    if (!sculptureRef.current) return;
    moveSculpture(sculptureRef.current, 0, 0);
    sculptureRef.current.style.setProperty("--pointer-x", "0deg");
    sculptureRef.current.style.setProperty("--pointer-y", "0deg");
  }

  function followPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId === event.pointerId) {
      moveSculpture(
        event.currentTarget,
        drag.current.x + event.clientX - drag.current.startX,
        drag.current.y + event.clientY - drag.current.startY,
      );
      return;
    }
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      -0.5,
      Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
    );
    const y = Math.max(
      -0.5,
      Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
    );
    event.currentTarget.style.setProperty("--pointer-x", `${x * 10}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * -10}deg`);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

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
    <div
      ref={sculptureRef}
      className="sculpture"
      role="group"
      aria-label="Interactive light sculpture"
      aria-describedby="sculpture-help"
      tabIndex={0}
      onPointerDown={(event) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          (event.target as Element).closest("button")
        )
          return;
        event.currentTarget.focus({ preventScroll: true });
        drag.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          ...position.current,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = "true";
      }}
      onPointerMove={followPointer}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      onDoubleClick={resetSculpture}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        const steps: Record<string, [number, number]> = {
          ArrowLeft: [-12, 0],
          ArrowRight: [12, 0],
          ArrowUp: [0, -12],
          ArrowDown: [0, 12],
        };
        if (steps[event.key]) {
          event.preventDefault();
          moveSculpture(
            event.currentTarget,
            position.current.x + steps[event.key][0],
            position.current.y + steps[event.key][1],
          );
        } else if (event.key === "Home" || event.key === "Escape") {
          event.preventDefault();
          resetSculpture();
        }
      }}
      onPointerLeave={(event) => {
        if (drag.current) return;
        event.currentTarget.style.setProperty("--pointer-x", "0deg");
        event.currentTarget.style.setProperty("--pointer-y", "0deg");
      }}
    >
      <div className="sculpture-depth" aria-hidden="true">
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
          <g className="torus-mesh">
            <g className="torus-bloom" filter="url(#bloom)">
              {lines}
            </g>
            <g>{lines}</g>
          </g>
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
      <div className="sculpture-controls">
        <span id="sculpture-help">
          Drag to play
          <span className="sr-only">
            . Use arrow keys to move, Home or Escape to reset.
          </span>
        </span>
        <button
          type="button"
          onClick={resetSculpture}
          aria-label="Reset sculpture position"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function Preview({
  project,
  detail = false,
}: {
  project: Project;
  detail?: boolean;
}) {
  if (project.image) {
    return (
      <img
        className={`project-screenshot ${detail ? "full-screenshot" : ""}`}
        src={project.image}
        alt={`${project.name} — actual project interface`}
        width={1280}
        height={800}
        loading="lazy"
      />
    );
  }
  return (
    <div className="upcoming-preview">
      <span className="upcoming-icon">
        <Code2 size={29} strokeWidth={1.2} />
      </span>
      <strong>{project.name}</strong>
      <span>On the horizon.</span>
      <div className="upcoming-line" />
      <small>AN IDEA TAKING SHAPE</small>
    </div>
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
  const [status, setStatus] =
    useState<(typeof statuses)[number]>("All projects");
  const [project, setProject] = useState<Project | null>(null);
  const [contact, setContact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const previousGridHeight = useRef<number | null>(null);
  const visibleProjects =
    status === "All projects"
      ? projects.slice(0, expanded ? projects.length : 6)
      : projects.filter((item) => item.status === status);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const previous = previousGridHeight.current;
    previousGridHeight.current = null;
    if (
      !grid ||
      previous === null ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animation = grid.animate(
      [
        { height: `${previous}px` },
        { height: `${grid.getBoundingClientRect().height}px` },
      ],
      { duration: 650, easing: "cubic-bezier(.22, 1, .36, 1)" },
    );
    grid.style.overflow = "clip";
    animation.onfinish = () => grid.style.removeProperty("overflow");
    return () => {
      animation.cancel();
      grid.style.removeProperty("overflow");
    };
  }, [expanded, status]);

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

  useEffect(() => {
    if (
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
    );

    document
      .querySelectorAll<HTMLElement>(
        ".hero-content > *, .toolkit, .section-title-row, .work-toolbar, .project-card, .work-footnote, .about-visual, .about-copy, .approach-intro, .process-step, .contact-section > :not(.contact-glow), .footer",
      )
      .forEach((element, index) => {
        if (element.dataset.reveal === "visible") return;
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${(index % 3) * 75}ms`);
        element.dataset.reveal = "pending";
        observer.observe(element);
      });
    return () => observer.disconnect();
  }, [status, expanded]);

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
              <br />
              Released, in progress, and on the horizon.
            </p>
          </div>
          <div className="work-toolbar">
            <div
              className="filter-list"
              role="group"
              aria-label="Filter projects by status"
            >
              {statuses.map((item) => (
                <button
                  key={item}
                  aria-pressed={status === item}
                  className={status === item ? "selected" : ""}
                  onClick={() => {
                    previousGridHeight.current = null;
                    setExpanded(false);
                    setStatus(item);
                  }}
                >
                  {item}
                  {item === "All projects" && (
                    <span>{projects.length.toString().padStart(2, "0")}</span>
                  )}
                </button>
              ))}
            </div>
            <span className="concept-note">
              <Circle size={8} /> 5 released · 2 in development · 3 upcoming
            </span>
          </div>
          <div
            id="project-grid"
            ref={gridRef}
            className="project-grid"
            aria-live="polite"
          >
            {visibleProjects.map((item) => (
              <button
                key={item.id}
                className={`project-card project-${item.accent}`}
                onClick={() => setProject(item)}
                aria-label={`Explore ${item.name} — ${item.status}`}
              >
                <div className="project-visual">
                  <div className="project-visual-top">
                    <span>{item.category}</span>
                    <span className="project-number">
                      {String(projects.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="preview-stage">
                    <Preview project={item} />
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span
                      className={`project-status status-${item.status.toLowerCase().replaceAll(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </div>
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
          {status === "All projects" && projects.length > 6 && (
            <div className="project-expand">
              <button
                className="button more-projects"
                aria-controls="project-grid"
                aria-expanded={expanded}
                onClick={() => {
                  previousGridHeight.current =
                    gridRef.current?.getBoundingClientRect().height ?? null;
                  setExpanded(!expanded);
                }}
              >
                {expanded ? "Less" : "More"}
                <span>
                  {expanded
                    ? "Show 6 projects"
                    : `${projects.length - 6} more projects`}
                </span>
                <ChevronDown size={16} />
              </button>
            </div>
          )}
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
            <img
              className="profile-photo"
              loading="lazy"
              src={profile.photo}
              alt={profile.name}
              width={800}
              height={800}
            />
            <div className="profile-window">
              <img
                className="profile-avatar"
                src={profile.photo}
                alt=""
                width={34}
                height={34}
              />
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
        <section
          id="services"
          className="approach services section-shell"
          aria-labelledby="services-heading"
        >
          <div className="approach-intro">
            <span className="eyebrow">MY SERVICES</span>
            <h2 id="services-heading">
              Digital tools.
              <br />
              Built for you.
            </h2>
          </div>
          <div className="process-step service-card">
            <div className="service-card-top">
              <span>01 / WEB</span>
              <Globe2 size={23} strokeWidth={1.4} />
            </div>
            <h3>Website Creation</h3>
            <p>
              Portfolios, business websites, and landing pages. Responsive,
              considered, and built around your goals.
            </p>
            <a className="text-link" href="#contact">
              Discuss a website <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="process-step service-card">
            <div className="service-card-top">
              <span>02 / APPLICATIONS</span>
              <AppWindow size={23} strokeWidth={1.4} />
            </div>
            <h3>Application Development</h3>
            <p>
              Web and Windows applications that turn an idea into a useful tool.
              Built for the way you work.
            </p>
            <a className="text-link" href="#contact">
              Discuss an application <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="process-step service-card">
            <div className="service-card-top">
              <span>03 / AUTOMATION</span>
              <Workflow size={23} strokeWidth={1.4} />
            </div>
            <h3>AI Workflow Automation</h3>
            <p>
              Connect your tools, simplify repetitive tasks, and bring AI into
              workflows where it can make a practical difference.
            </p>
            <a className="text-link" href="#contact">
              Discuss automation <ArrowUpRight size={14} />
            </a>
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
          <div className="contact-methods" aria-label="Contact Raffael">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              <span>WhatsApp</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} />
              <span>{profile.email}</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
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
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email Raffael">
            <Mail size={17} />
          </a>
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
          label={`${project.name} — ${project.status}`}
        >
          <div className={`project-detail project-${project.accent}`}>
            <span className="eyebrow">
              {project.category} / {project.status}
            </span>
            <h2>
              {project.name}
              <span>.</span>
            </h2>
            <p>{project.detail}</p>
            <div className="detail-preview">
              <Preview project={project} detail />
            </div>
            {project.captureNote && (
              <p className="demo-caption">
                <Sparkles size={13} />
                {project.captureNote}
              </p>
            )}
            {project.url && (
              <a
                className="button button-primary project-live-link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project <ArrowUpRight size={16} />
              </a>
            )}
            <h3>
              {project.status === "Upcoming"
                ? "The idea"
                : "Inside the project"}
            </h3>
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
            {project.status !== "Released" && (
              <p className="concept-disclaimer">
                {project.status === "In development"
                  ? "Still in development. Features and interface may change before release."
                  : "Upcoming project. No released app or working demo yet."}
              </p>
            )}
          </div>
        </Modal>
      )}
      {contact && <Contact onClose={() => setContact(false)} />}
    </>
  );
}
