"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { industryMappingData } from "@/lib/industryMappingData";
import { SectionHeading } from "@/components/ui";

interface CardPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function IndustryMapping() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [cardPositions, setCardPositions] = useState<{
    valueFunctions: Record<string, CardPosition>;
    solutions: Record<string, CardPosition>;
    aiCore?: CardPosition;
  }>({
    valueFunctions: {},
    solutions: {},
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const valueFunctionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const solutionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const aiCoreRef = useRef<HTMLDivElement | null>(null);

  const activeIndustry = industryMappingData.find((ind) => ind.id === activeTab);

  // Calculate card positions for connectors
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: typeof cardPositions = {
      valueFunctions: {},
      solutions: {},
    };

    // Value functions
    Object.entries(valueFunctionRefs.current).forEach(([id, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        newPositions.valueFunctions[id] = {
          x: rect.left - containerRect.left + rect.width,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    // Solutions
    Object.entries(solutionRefs.current).forEach(([id, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        newPositions.solutions[id] = {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    // AI Core
    if (aiCoreRef.current) {
      const rect = aiCoreRef.current.getBoundingClientRect();
      newPositions.aiCore = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    }

    setCardPositions(newPositions);
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(updatePositions, 100);

    const resizeObserver = new ResizeObserver(updatePositions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePositions);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePositions);
    };
  }, [updatePositions, activeTab]);

  // Generate cubic bezier path through AI core
  const generatePath = (
    fromPos: CardPosition,
    toPos: CardPosition,
    throughCore?: CardPosition
  ): string => {
    if (!throughCore) {
      const cp1x = fromPos.x + (toPos.x - fromPos.x) * 0.5;
      const cp1y = fromPos.y;
      const cp2x = fromPos.x + (toPos.x - fromPos.x) * 0.5;
      const cp2y = toPos.y;
      return `M ${fromPos.x} ${fromPos.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${toPos.x} ${toPos.y}`;
    }

    const midX = throughCore.x;
    const midY = throughCore.y;

    // First segment: value function -> AI core
    const cp1x = fromPos.x + (midX - fromPos.x) * 0.6;
    const cp1y = fromPos.y;
    const cp2x = fromPos.x + (midX - fromPos.x) * 0.4;
    const cp2y = midY;

    // Second segment: AI core -> solution
    const cp3x = midX + (toPos.x - midX) * 0.6;
    const cp3y = midY;
    const cp4x = midX + (toPos.x - midX) * 0.4;
    const cp4y = toPos.y;

    return `M ${fromPos.x} ${fromPos.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${midX} ${midY} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${toPos.x} ${toPos.y}`;
  };

  // Get all connections for the active industry
  const getAllConnections = () => {
    if (!activeIndustry || activeIndustry.comingSoon) return [];

    const connections: Array<{ from: string; to: string; index: number }> = [];
    
    // Connections from each value function to AI core
    activeIndustry.valueFunctions.forEach((vf, idx) => {
      connections.push({ from: vf.id, to: 'core', index: idx });
    });
    
    // Connections from AI core to solutions
    activeIndustry.solutions.forEach((sol, idx) => {
      connections.push({
        from: 'core',
        to: sol.id,
        index: activeIndustry.valueFunctions.length + idx,
      });
    });

    return connections;
  };

  const allConnections = getAllConnections();

  if (!activeIndustry) return null;

  return (
    <section id="industries" className="bg-gradient-to-br from-blue-50/60 via-slate-50/40 to-indigo-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:mb-8 lg:px-8 [&>div]:mb-10 [&>div]:md:mb-12">
        <SectionHeading
          heading="From Concept to Cognitive Value"
          subtext="Solutions designed to work independently, built to work together"
        />
      </div>

      {/* Tab Navigation */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3 px-6">
        {industryMappingData.map((ind) => (
          <button
            key={ind.id}
            onClick={() => !ind.comingSoon && setActiveTab(ind.id)}
            disabled={ind.comingSoon}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              activeTab === ind.id
                ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : ind.comingSoon
                  ? "cursor-default border-slate-200 bg-transparent text-slate-300"
                  : "border-slate-300 bg-transparent text-slate-600 hover:border-slate-400 hover:text-slate-800"
            }`}
          >
            {ind.name}
            {ind.comingSoon && <span className="ml-1.5 text-xs opacity-60">Soon</span>}
          </button>
        ))}
      </div>

      {/* Desktop Flow Visualization */}
      {!activeIndustry.comingSoon && (
        <>
          <p className="mx-auto mb-10 max-w-3xl px-6 text-center text-lg font-medium leading-relaxed text-slate-500">
            {activeIndustry.tagline}
            <span className="mx-3" />
            <a
              href={`#${activeIndustry.id}-details`}
              className="inline-flex items-center gap-1 text-xs tracking-tight text-blue-600 transition-colors hover:text-blue-700"
            >
              <span>Details</span>
              <svg
                className="h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </p>

          <div
            ref={containerRef}
            className="relative mx-auto hidden max-w-[1400px] px-6 lg:block"
          >
            {/* SVG Overlay for Connectors - All visible */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ zIndex: 1 }}
            >
              <defs>
                <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Render all connections */}
              {allConnections.map(({ from, to, index }) => {
                const corePos = cardPositions.aiCore;
                
                if (to === 'core') {
                  // Value function to AI core
                  const fromPos = cardPositions.valueFunctions[from];
                  if (!fromPos || !corePos) return null;
                  
                  const path = `M ${fromPos.x} ${fromPos.y} L ${corePos.x} ${corePos.y}`;
                  
                  return (
                    <path
                      key={`${from}-${to}-${index}`}
                      d={path}
                      fill="none"
                      stroke="url(#connector-gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="connector-path"
                      style={{
                        strokeDasharray: "6 3",
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  );
                } else if (from === 'core') {
                  // AI core to solution
                  const toPos = cardPositions.solutions[to];
                  if (!corePos || !toPos) return null;
                  
                  const path = `M ${corePos.x} ${corePos.y} L ${toPos.x} ${toPos.y}`;
                  
                  return (
                    <path
                      key={`${from}-${to}-${index}`}
                      d={path}
                      fill="none"
                      stroke="url(#connector-gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="connector-path"
                      style={{
                        strokeDasharray: "6 3",
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  );
                }
                return null;
              })}
            </svg>

            {/* Three-column Grid */}
            <div className="relative grid grid-cols-[1fr_auto_1fr] gap-12" style={{ zIndex: 2 }}>
              {/* Left Column: Value Functions Card */}
              {/* Left Column: Value Functions List with Connector Line */}
              <div 
                ref={(el) => {
                  if (el && activeIndustry && activeIndustry.valueFunctions.length > 0) {
                    valueFunctionRefs.current['container'] = el;
                  }
                }}
                className="flex items-center justify-end"
                style={{
                  opacity: 0,
                  animation: `fade-in-up 0.5s ease-out 0.1s forwards`,
                }}
              >
                <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
                  {/* Vertical connector line on right edge */}
                  <div className="absolute right-0 top-1/2 h-3/4 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-40" />
                  
                  <ul className="space-y-4">
                    {activeIndustry.valueFunctions.map((vf, idx) => (
                      <li
                        key={vf.id}
                        ref={(el) => {
                          valueFunctionRefs.current[vf.id] = el;
                        }}
                        className="relative text-sm font-normal text-slate-700"
                      >
                        {vf.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center: AI Core with pulsing effect */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Outer glow rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-blue-400/5 animate-pulse-slow" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-24 w-24 rounded-full bg-blue-400/10 animate-pulse-slow"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                  {/* Core node */}
                  <div
                    ref={aiCoreRef}
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-300/50 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-200/40"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-blue-400/10 blur-xl" />
                    <img
                      src="/netlink-logo.png"
                      alt="Netlink"
                      className="relative h-10 w-10 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Solutions */}
              <div className="flex flex-col justify-center gap-4">
                {activeIndustry.solutions.map((solution, idx) => (
                  <div
                    key={solution.id}
                    ref={(el) => {
                      solutionRefs.current[solution.id] = el;
                    }}
                    className="group relative"
                    style={{
                      opacity: 0,
                      animation: `fade-in-up 0.5s ease-out ${idx * 0.1 + 0.2}s forwards`,
                    }}
                  >
                    {/* Card */}
                    <div className="rounded-full border border-blue-300 bg-white px-6 py-3 text-sm font-normal text-slate-700 transition-all duration-300 hover:border-blue-400 hover:text-slate-900">
                      {solution.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Simplified List */}
          <div className="mx-auto max-w-2xl space-y-8 px-6 lg:hidden">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-600">
                Value Functions
              </h3>
              <div className="space-y-3">
                {activeIndustry.valueFunctions.map((vf, idx) => (
                  <div
                    key={vf.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
                  >
                    <span className="text-xs font-medium text-slate-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{vf.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Processing
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-600">
                Solutions
              </h3>
              <div className="space-y-3">
                {activeIndustry.solutions.map((solution) => (
                  <div
                    key={solution.id}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{solution.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Coming Soon State */}
      {activeIndustry.comingSoon && (
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-lg text-slate-500">Coming soon</p>
        </div>
      )}
    </section>
  );
}
