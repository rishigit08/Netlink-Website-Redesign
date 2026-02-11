"use client";

import { useState } from "react";
import { industries } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

export default function IndustryDepth() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "healthcare",
  );

  const activeIndustry = industries.find((ind) => ind.id === activeTab);

  return (
    <section id="industries" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          heading="From Concept to Cognitive Value"
          subtext="Solutions designed to work independently, built to work together"
        />

        {/* ══════════════════════════════════════════════
            Desktop: Horizontal tab bar
            ══════════════════════════════════════════════ */}
        <div className="mb-12 hidden flex-wrap items-center justify-center gap-2 lg:flex">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => !ind.comingSoon && setActiveTab(ind.id)}
              disabled={ind.comingSoon}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === ind.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : ind.comingSoon
                    ? "cursor-default bg-slate-800/50 text-slate-600"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
              }`}
            >
              {ind.name}
              {ind.comingSoon && (
                <span className="ml-1.5 text-xs opacity-60">Soon</span>
              )}
            </button>
          ))}
        </div>

        {/* Desktop: Active panel */}
        {activeIndustry && !activeIndustry.comingSoon && (
          <div className="hidden lg:block">
            <p className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-slate-400">
              {activeIndustry.tagline}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeIndustry.solutions.map((solution) => (
                <div
                  key={solution}
                  className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 px-4 py-3.5 transition-colors hover:border-slate-700 hover:bg-slate-800/50"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-snug text-slate-300">
                    {solution}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            Mobile: Accordion
            ══════════════════════════════════════════════ */}
        <div className="space-y-3 lg:hidden">
          {industries.map((ind) => {
            const isOpen = openAccordion === ind.id;
            return (
              <div
                key={ind.id}
                className="overflow-hidden rounded-xl border border-slate-800"
              >
                <button
                  onClick={() =>
                    !ind.comingSoon &&
                    setOpenAccordion(isOpen ? null : ind.id)
                  }
                  disabled={ind.comingSoon}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-800/50"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-semibold ${ind.comingSoon ? "text-slate-600" : "text-white"}`}
                  >
                    {ind.name}
                    {ind.comingSoon && (
                      <span className="ml-2 text-xs font-normal text-slate-600">
                        (Coming Soon)
                      </span>
                    )}
                  </span>
                  {!ind.comingSoon && (
                    <svg
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>

                {/* Expandable panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {!ind.comingSoon && (
                    <div className="border-t border-slate-800 px-5 pt-4 pb-5">
                      <p className="mb-4 text-sm leading-relaxed text-slate-400">
                        {ind.tagline}
                      </p>
                      <ul className="space-y-2.5" role="list">
                        {ind.solutions.map((solution) => (
                          <li
                            key={solution}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                              aria-hidden="true"
                            />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
