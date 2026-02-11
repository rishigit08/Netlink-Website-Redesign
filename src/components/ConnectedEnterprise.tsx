"use client";

import { useState } from "react";
import { capabilityPlanes } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

/* Simple SVG icons for each capability */
const icons: Record<string, React.ReactNode> = {
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 15s2-2 5-2 5 2 5 2 2-2 5-2 5 2 5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 9s2-2 5-2 5 2 5 2 2-2 5-2 5 2 5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    </svg>
  ),
  erp: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="6" rx="8" ry="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  applications: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3v18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 12h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 16h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ConnectedEnterprise() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="connected-enterprise"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: "linear-gradient(180deg, #0a0e17 0%, #07090f 100%)",
      }}
    >
      {/* Faint dot pattern */}
      <div className="bg-dot-pattern absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          heading="Inside the Connected Enterprise"
          subtext="Bringing data, platforms, and processes together, architected with AI at the core"
        />

        {/* ── AI Core badge ── */}
        <div className="mb-10 flex items-center justify-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 ${
              activeId
                ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "border-slate-700 bg-slate-900 text-blue-400"
            }`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${activeId ? "bg-white" : "bg-blue-400"} animate-pulse-slow`}
            />
            AI Core
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {capabilityPlanes.map((plane) => {
            const isActive = activeId === plane.id;
            const hasActive = activeId !== null;

            return (
              <div
                key={plane.id}
                className={`group relative cursor-default rounded-2xl border bg-slate-900/60 p-6 transition-all duration-300 sm:p-7 ${
                  isActive
                    ? "z-10 scale-[1.02] border-blue-500/60 shadow-lg shadow-blue-500/10"
                    : hasActive
                      ? "border-slate-800 opacity-50"
                      : "border-slate-800 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5"
                }`}
                onMouseEnter={() => setActiveId(plane.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(plane.id)}
                onBlur={() => setActiveId(null)}
                tabIndex={0}
                role="article"
                aria-label={plane.title}
              >
                {/* Connection dot */}
                <div
                  className={`absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#07090f] transition-all duration-300 ${
                    isActive
                      ? "scale-100 bg-blue-500 opacity-100"
                      : "scale-0 bg-slate-700 opacity-0"
                  }`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`mb-4 inline-flex rounded-xl p-2.5 transition-colors duration-300 ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "bg-slate-800 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-400"
                  }`}
                >
                  {icons[plane.id]}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {plane.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {plane.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
