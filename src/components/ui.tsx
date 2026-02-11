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
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subtext && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl ${align === "center" ? "mx-auto" : ""}`}
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
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 ${hover ? "hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-black/20" : ""} ${className}`}
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
    default: "bg-slate-800 text-slate-300",
    accent: "bg-blue-500/15 text-blue-400",
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
}

export function Stat({ value, label, size = "sm" }: StatProps) {
  return (
    <div className="text-center">
      <div
        className={`font-bold text-white ${size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </div>
      <div
        className={`mt-1 font-medium tracking-wide text-slate-500 uppercase ${size === "lg" ? "text-sm" : "text-xs"}`}
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
      "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30",
    secondary:
      "border border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-white",
    ghost: "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10",
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
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-black/20 sm:p-8">
      {/* Client logo placeholder */}
      <div
        className="mb-6 flex h-10 w-24 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-700"
        aria-label={`${client} logo`}
      >
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          {client}
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
        {title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
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
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
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
          className="flex h-8 w-20 items-center justify-center rounded bg-slate-800"
          aria-label="Client Logo"
        >
          <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
            Client
          </span>
        </div>
      ))}
    </div>
  );
}
