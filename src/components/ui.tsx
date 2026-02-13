import React from "react";

// ============================================================
// SectionHeading
// ============================================================

interface SectionHeadingProps {
  heading: string;
  subtext?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  heading,
  subtext,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subtext && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}

// ============================================================
// Card
// ============================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ${hover ? "hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================
// Pill
// ============================================================

interface PillProps {
  label: string;
  variant?: "default" | "accent";
}

export function Pill({ label, variant = "default" }: PillProps) {
  const base =
    "inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium";
  const variants = {
    default: "bg-slate-100 text-slate-600",
    accent: "bg-blue-600/70 text-white",
  };
  return <span className={`${base} ${variants[variant]}`}>{label}</span>;
}

// ============================================================
// Stat
// ============================================================

interface StatProps {
  value: string;
  label: string;
  size?: "sm" | "lg";
  dark?: boolean;
}

export function Stat({ value, label, size = "sm", dark = false }: StatProps) {
  return (
    <div className="text-center">
      <div
        className={`font-bold ${dark ? "text-white" : "text-slate-900"} ${size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </div>
      <div
        className={`mt-1 font-medium tracking-wide uppercase ${dark ? "text-slate-400" : "text-slate-400"} ${size === "lg" ? "text-sm" : "text-xs"}`}
      >
        {label}
      </div>
    </div>
  );
}

// ============================================================
// CTA (Button / Link)
// ============================================================

interface CTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CTA({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: CTAProps) {
  const base =
    "inline-flex items-center justify-center rounded-[10px] font-semibold transition-all duration-200";

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25",
    secondary:
      "border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900",
    ghost: "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
  };

  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

// ============================================================
// CaseStudyCard
// ============================================================

/* Themed illustration icons per industry */
const caseStudyIllustrations: Record<string, { bg: string; image?: string; icon: React.ReactNode }> = {
  Healthcare: {
    bg: "",
    image: "/case-healthcare.png",
    icon: null,
  },
  Insurance: {
    bg: "",
    image: "/case-insurance.png",
    icon: (
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md shadow-indigo-200/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-indigo-600" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/25">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md shadow-indigo-100/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-indigo-400" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
        </div>
      </div>
    ),
  },
  "Supply Chain": {
    bg: "",
    image: "/case-supplychain.png",
    icon: (
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md shadow-cyan-200/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-cyan-600" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 shadow-md shadow-cyan-600/25">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md shadow-cyan-100/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-400" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    ),
  },
};

function getCaseIllustration(tags: string[]) {
  for (const tag of tags) {
    const match = caseStudyIllustrations[tag];
    if (match) return match;
  }
  return { bg: "from-slate-50 via-slate-100/60 to-blue-50", image: undefined, icon: null };
}

interface CaseStudyCardProps {
  client: string;
  title: string;
  summary?: string;
  tags: string[];
}

export function CaseStudyCard({
  client,
  title,
  tags,
}: CaseStudyCardProps) {
  const illust = getCaseIllustration(tags);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Illustration header */}
      {illust.image ? (
        <div className="relative h-44 overflow-hidden">
          <img src={illust.image} alt="" className="h-full w-full object-cover" />
          {/* Client pill overlay */}
          <span className="absolute bottom-4 left-4 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 uppercase shadow-sm backdrop-blur-sm">
            {client}
          </span>
        </div>
      ) : (
        <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${illust.bg}`}>
          {illust.icon}
          {/* Client pill overlay */}
          <span className="absolute bottom-4 left-4 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 uppercase shadow-sm backdrop-blur-sm">
            {client}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col bg-slate-50 p-4">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} label={tag} variant="accent" />
          ))}
        </div>

        <h3 className="text-sm font-semibold leading-snug text-slate-900 sm:text-base">
          {title}
        </h3>
      </div>
    </article>
  );
}

// ============================================================
// LogoRow (placeholder logos)
// ============================================================

interface LogoRowProps {
  count?: number;
}

export function LogoRow({ count = 5 }: LogoRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-8 w-20 items-center justify-center rounded bg-slate-100"
          aria-label="Client Logo"
        >
          <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
            Client
          </span>
        </div>
      ))}
    </div>
  );
}
