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
    "inline-flex items-center rounded-[10px] px-3 py-1 text-xs font-medium";
  const variants = {
    default: "bg-slate-100 text-slate-600",
    accent: "bg-blue-50 text-blue-600",
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
const caseStudyIllustrations: Record<string, { bg: string; icon: React.ReactNode }> = {
  Healthcare: {
    bg: "from-blue-50 via-blue-100/60 to-indigo-50",
    icon: (
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md shadow-blue-200/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-blue-600" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
            <rect x="3" y="3" width="18" height="18" rx="4" />
          </svg>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/25">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md shadow-blue-100/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-400" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    ),
  },
  Insurance: {
    bg: "from-indigo-50 via-violet-100/60 to-purple-50",
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
    bg: "from-cyan-50 via-sky-100/60 to-blue-50",
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
  return { bg: "from-slate-50 via-slate-100/60 to-blue-50", icon: null };
}

interface CaseStudyCardProps {
  client: string;
  title: string;
  summary: string;
  tags: string[];
}

export function CaseStudyCard({
  client,
  title,
  summary,
  tags,
}: CaseStudyCardProps) {
  const illust = getCaseIllustration(tags);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Illustration header */}
      <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${illust.bg}`}>
        {illust.icon}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {/* Client logo placeholder */}
        <div
          className="mb-4 flex h-8 w-20 items-center justify-center rounded-md bg-gradient-to-br from-slate-100 to-slate-200"
          aria-label={`${client} logo`}
        >
          <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            {client}
          </span>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
          {title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
          {summary}
        </p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} label={tag} variant="accent" />
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          Read case study
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
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
