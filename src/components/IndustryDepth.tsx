"use client";

import { useState } from "react";
import { industries } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

/* ═══════════════════════════════════════════════════════════════
   Industry illustrations — CSS/SVG based per sector
   ═══════════════════════════════════════════════════════════════ */
const illustrations: Record<string, React.ReactNode> = {
  healthcare: (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full bg-blue-100/80" />
      <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-blue-300/50" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-blue-600" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" opacity="0.15" />
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      </div>
      <div className="absolute -top-2 right-12 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 8v4l2 2" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-blue-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-500" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <div className="absolute top-8 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-400" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <div className="absolute right-4 bottom-12 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 4v16m-4-4h8" />
        </svg>
      </div>
    </div>
  ),
  insurance: (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full bg-indigo-100/80" />
      <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-indigo-300/50" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg shadow-indigo-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-indigo-600" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <div className="absolute -top-2 right-10 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      </div>
      <div className="absolute bottom-2 left-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-indigo-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-indigo-500" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2m-8-10H4m16 0h2" />
        </svg>
      </div>
      <div className="absolute top-10 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-indigo-400" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div className="absolute right-2 bottom-10 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 8v4l2 2" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
    </div>
  ),
  automotive: (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full bg-sky-100/80" />
      <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-sky-300/50" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg shadow-sky-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-sky-600" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4.5h11.2a2 2 0 011.9 1.5L21 11M3 11v6a1 1 0 001 1h1a2 2 0 004 0h6a2 2 0 004 0h1a1 1 0 001-1v-6M3 11h18" />
        </svg>
      </div>
      <div className="absolute -top-1 right-12 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 shadow-lg shadow-sky-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-sky-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-sky-500" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 13l6-3m-6-10l6-3m0 0v13m0-13l5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17" />
        </svg>
      </div>
      <div className="absolute top-8 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-sky-400" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <div className="absolute right-4 bottom-12 flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </div>
    </div>
  ),
  manufacturing: (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full bg-violet-100/80" />
      <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-violet-300/50" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg shadow-violet-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-violet-600" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <div className="absolute -top-1 right-10 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <div className="absolute bottom-2 left-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-violet-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-violet-500" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="absolute top-10 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-violet-400" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <div className="absolute right-2 bottom-10 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </div>
  ),
  "supply-chain": (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full bg-cyan-100/80" />
      <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-cyan-300/50" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg shadow-cyan-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-cyan-600" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </div>
      <div className="absolute -top-2 right-12 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600 shadow-lg shadow-cyan-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-8 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-cyan-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-cyan-500" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 13l6-3m-6-10l6-3m0 0v13m0-13l5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17" />
        </svg>
      </div>
      <div className="absolute top-8 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-cyan-400" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className="absolute right-4 bottom-12 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </div>
    </div>
  ),
  banking: (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full bg-blue-100/80" />
      <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-blue-300/50" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-blue-600" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </div>
      <div className="absolute -top-1 right-10 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" />
        </svg>
      </div>
      <div className="absolute bottom-2 left-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-blue-200/40">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-500" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3z" />
        </svg>
      </div>
      <div className="absolute top-10 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-400" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <div className="absolute right-2 bottom-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-md">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
    </div>
  ),
};

export default function IndustryDepth() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [openAccordion, setOpenAccordion] = useState<string | null>("healthcare");

  const activeIndustry = industries.find((ind) => ind.id === activeTab);

  return (
    <section id="industries" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:mb-4 lg:px-8 [&>div]:mb-6 [&>div]:md:mb-8">
        <SectionHeading
          heading="From Concept to Cognitive Value"
          subtext="Solutions designed to work independently, built to work together"
        />
      </div>

      {/* ── Desktop: Tab bar + content ── */}
      <div className="hidden border-y border-slate-200 bg-gradient-to-br from-blue-100/70 via-blue-50/40 to-indigo-100/50 px-[100px] py-[60px] lg:block">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {industries.map((ind) => (
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
                {ind.comingSoon && (
                  <span className="ml-1.5 text-xs opacity-60">Soon</span>
                )}
              </button>
            ))}
          </div>

          {activeIndustry && !activeIndustry.comingSoon && (
            <>
              <p className="mx-auto mb-12 max-w-3xl text-center text-lg font-medium leading-relaxed text-slate-500">
                {activeIndustry.tagline}
              </p>

              <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Left — Illustration */}
              <div className="flex items-center justify-center">
                <div className="relative h-[360px] w-[360px]">
                  {illustrations[activeIndustry.id] ?? illustrations.healthcare}
                </div>
              </div>

              {/* Right — Solutions list */}
              {(() => {
                const needsTwoCols = activeIndustry.solutions.length > 8;
                const col1 = needsTwoCols ? activeIndustry.solutions.slice(0, 8) : activeIndustry.solutions;
                const col2 = needsTwoCols ? activeIndustry.solutions.slice(8) : [];
                return (
                  <div className={needsTwoCols ? "grid grid-cols-2 gap-x-8" : ""} role="list">
                    <ul className="divide-y divide-slate-200">
                      {col1.map((solution) => (
                        <li key={solution} className="flex items-start gap-3 py-3 text-sm leading-relaxed text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                    {col2.length > 0 && (
                      <ul className="divide-y divide-slate-200">
                        {col2.map((solution) => (
                          <li key={solution} className="flex items-start gap-3 py-3 text-sm leading-relaxed text-slate-600">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })()}
            </div>
            </>
          )}
      </div>

      {/* ── Mobile: Accordion ── */}
      <div className="mx-auto max-w-7xl space-y-3 px-6 lg:hidden lg:px-8">
        {industries.map((ind) => {
            const isOpen = openAccordion === ind.id;
            return (
              <div
                key={ind.id}
                className="overflow-hidden rounded-xl border border-slate-200"
              >
                <button
                  onClick={() =>
                    !ind.comingSoon &&
                    setOpenAccordion(isOpen ? null : ind.id)
                  }
                  disabled={ind.comingSoon}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-semibold ${ind.comingSoon ? "text-slate-300" : "text-slate-900"}`}
                  >
                    {ind.name}
                    {ind.comingSoon && (
                      <span className="ml-2 text-xs font-normal text-slate-300">
                        (Coming Soon)
                      </span>
                    )}
                  </span>
                  {!ind.comingSoon && (
                    <svg
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {!ind.comingSoon && (
                    <div className="border-t border-slate-200 px-5 pt-4 pb-5">
                      <p className="mb-4 text-sm leading-relaxed text-slate-500">
                        {ind.tagline}
                      </p>
                      <ul className="space-y-2.5" role="list">
                        {ind.solutions.map((solution) => (
                          <li
                            key={solution}
                            className="flex items-start gap-2 text-sm text-slate-600"
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
    </section>
  );
}
