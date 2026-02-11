"use client";

import { useState, useEffect } from "react";
import { navItems } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-[#0b1120]/95 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-[#0b1120]/95 backdrop-blur-sm"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 md:px-10 lg:px-16"
        aria-label="Main navigation"
      >
        {/* ── Left: Logo ── */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center" aria-label="Netlink home">
            <img
              src="/netlink-logo.png"
              alt="Netlink"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* ── Center: Desktop nav links ── */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navItems.map((item) => (
            <li key={item.href + item.label}>
              <a
                href={item.href}
                className="group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
                {item.hasDropdown && (
                  <svg
                    className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right: CTA button ── */}
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-[10px] bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 lg:inline-flex"
        >
          Let&apos;s Talk
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`fixed inset-0 top-[64px] z-40 bg-[#0b1120] transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-1 px-6 py-8">
          {navItems.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              {item.label}
              {item.hasDropdown && (
                <svg
                  className="h-4 w-4 text-slate-400"
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
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Let&apos;s Talk
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
