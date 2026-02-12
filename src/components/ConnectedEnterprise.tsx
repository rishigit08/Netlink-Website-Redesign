"use client";

import { useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
interface LayerDef {
  id: string;
  title: string;
  description: string;
}

/* ═══════════════════════════════════════════════════════════════
   Layer definitions
   ═══════════════════════════════════════════════════════════════ */
const STACK: LayerDef[] = [
  {
    id: "automation",
    title: "Automation & Orchestration",
    description:
      "Netlink builds context-aware automation that adapts as conditions change",
  },
  {
    id: "applications",
    title: "Agentic Applications & Workflows",
    description:
      "Enabling faster product scale by embedding intelligence into deeply integrated tools and workflows from the start",
  },
  {
    id: "erp",
    title: "ERP & Core Platforms",
    description:
      "Decisions move when intelligence is part of core systems. Netlink embeds it where execution happens.",
  },
  {
    id: "data",
    title: "Data & Intelligence",
    description:
      "Data unified across enterprise systems enables intelligence that keeps operations efficient and adaptive.",
  },
  {
    id: "security",
    title: "Security & Governance",
    description:
      "Security-driven governance to keep intelligent systems scalable and safe",
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Cloud",
    description:
      "When demand shifts, system is able to absorb AI scale without breaking performance",
  },
];

/* ═══════════════════════════════════════════════════════════════
   SVG icons for expertise buttons
   ═══════════════════════════════════════════════════════════════ */
const icons: Record<string, React.ReactNode> = {
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 15s2-2 5-2 5 2 5 2 2-2 5-2 5 2 5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 9s2-2 5-2 5 2 5 2 2-2 5-2 5 2 5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
    </svg>
  ),
  erp: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  applications: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M13 8h5" />
      <path d="M13 12h5" />
      <path d="M13 16h3" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */
export default function ConnectedEnterprise() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const handleHover = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  const activeIdx = activeId
    ? STACK.findIndex((l) => l.id === activeId)
    : -1;
  const hasActive = activeIdx >= 0;

  return (
    <section
      id="connected-enterprise"
      className="relative bg-white pt-20 pb-14 lg:pt-20 lg:pb-16"
    >
      <div className="bg-dot-pattern absolute inset-0 opacity-[0.015]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-1 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Inside the Connected Enterprise
          </h2>
          <p className="mt-2 text-lg leading-relaxed text-slate-500">
            Bringing data, platforms, and processes together, architected with
            AI at the core
          </p>
        </div>

        {/* Desktop: 3-column layout (left items | illustration | right items) */}
        <div className="mt-2 hidden items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">

          {/* Left column — first 3 items */}
          <div className="flex flex-col gap-[60px]">
            {STACK.slice(0, 3).map((layer) => {
              const isActive = activeId === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-500 ease-in-out ${
                    isActive
                      ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-100/50"
                      : hasActive
                        ? "border-slate-200/60 bg-white/80 opacity-70"
                        : "border-slate-200 bg-white shadow-sm shadow-slate-100/50 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-100/50"
                  }`}
                  onClick={() => handleSelect(layer.id)}
                  onMouseEnter={() => handleHover(layer.id)}
                  onMouseLeave={() => handleHover(null)}
                  aria-pressed={isActive}
                >
                  <div
                    className={`shrink-0 rounded-lg p-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}
                  >
                    {icons[layer.id]}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {layer.title}
                    </h3>
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className={`mt-1.5 text-xs leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-slate-600" : "text-slate-400 group-hover:text-slate-600"
                        }`}>
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center — illustration */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: 811, width: 624 }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-3/4 w-3/4 rounded-full bg-blue-400/[0.10] blur-[80px]" />
            </div>
            <img
              src="/connected-enterprise-stack.png"
              alt="Connected Enterprise — stacked technology layers"
              className="ce-img-float relative z-[1] h-full w-auto max-w-full object-contain"
              draggable={false}
            />
          </div>

          {/* Right column — last 3 items */}
          <div className="flex flex-col gap-[60px]">
            {STACK.slice(3).map((layer) => {
              const isActive = activeId === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-500 ease-in-out ${
                    isActive
                      ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-100/50"
                      : hasActive
                        ? "border-slate-200/60 bg-white/80 opacity-70"
                        : "border-slate-200 bg-white shadow-sm shadow-slate-100/50 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-100/50"
                  }`}
                  onClick={() => handleSelect(layer.id)}
                  onMouseEnter={() => handleHover(layer.id)}
                  onMouseLeave={() => handleHover(null)}
                  aria-pressed={isActive}
                >
                  <div
                    className={`shrink-0 rounded-lg p-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}
                  >
                    {icons[layer.id]}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {layer.title}
                    </h3>
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className={`mt-1.5 text-xs leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-slate-600" : "text-slate-400 group-hover:text-slate-600"
                        }`}>
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Mobile: stacked layout (illustration on top, all items below) */}
        <div className="mt-12 flex flex-col items-center gap-10 lg:hidden">
          <div
            className="relative flex w-full max-w-sm items-center justify-center"
            style={{ height: 360 }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-3/4 w-3/4 rounded-full bg-blue-400/[0.10] blur-[80px]" />
            </div>
            <img
              src="/connected-enterprise-stack.png"
              alt="Connected Enterprise — stacked technology layers"
              className="ce-img-float relative z-[1] h-full w-auto max-w-full object-contain"
              draggable={false}
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            {STACK.map((layer) => {
              const isActive = activeId === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-500 ease-in-out ${
                    isActive
                      ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-100/50"
                      : hasActive
                        ? "border-slate-200/60 bg-white/80 opacity-70"
                        : "border-slate-200 bg-white shadow-sm shadow-slate-100/50 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-100/50"
                  }`}
                  onClick={() => handleSelect(layer.id)}
                  aria-pressed={isActive}
                >
                  <div
                    className={`shrink-0 rounded-lg p-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}
                  >
                    {icons[layer.id]}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {layer.title}
                    </h3>
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className={`mt-1.5 text-xs leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-slate-600" : "text-slate-400 group-hover:text-slate-600"
                        }`}>
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ce-img-hover {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .ce-img-float {
          animation: ce-img-hover 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ce-img-float { animation: none; }
        }
      `}</style>
    </section>
  );
}
