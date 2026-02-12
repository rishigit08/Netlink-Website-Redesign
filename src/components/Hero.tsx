"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { heroStats } from "@/lib/data";
import { CTA } from "@/components/ui";
import SystemsEcosystemCanvas from "@/components/SystemsCanvas";

/* ── Animated count-up stat ── */
function AnimatedStat({
  value,
  label,
  size = "lg",
}: {
  value: string;
  label: string;
  size?: "sm" | "lg";
}) {
  // Parse numeric part and suffix (e.g. "200+" → 200, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const duration = 2000; // ms
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [hasAnimated, target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-bold text-slate-900 ${size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}
      >
        {count}
        {suffix}
      </div>
      <div
        className={`mt-1 font-medium tracking-wide text-slate-400 uppercase ${size === "lg" ? "text-sm" : "text-xs"}`}
      >
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#0b1a30]" />
      <div className="bg-dot-pattern absolute inset-0 opacity-[0.04]" />
      <div className="absolute top-1/2 right-0 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-blue-600/[0.06] blur-[140px]" />

      {/* ── Viewport-height hero area ── */}
      <div className="relative flex min-h-screen flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16">
          {/* Left column — Copy + CTAs (5 of 12 cols) */}
          <div className="text-center lg:col-span-5 lg:text-left">
            <h1 className="text-[1.65rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2rem] lg:text-[2.5rem] xl:text-[3rem]">
              Engineering AI-first<br />Enterprises
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400 sm:text-xl">
              Breaking silos. Connecting systems. Driving tangible outcomes.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <CTA href="#contact" variant="primary" size="lg">
                Contact us
              </CTA>
            </div>
          </div>

          {/* Right column — Sphere visualization (7 of 12 cols) */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-[80%] max-w-[560px] lg:ml-auto lg:max-w-[80%]" style={{ minHeight: 336 }}>
              {/* Ambient glow behind the sphere */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-3/5 w-3/5 rounded-full bg-blue-500/[0.08] blur-[90px]" />
              </div>
              <SystemsEcosystemCanvas />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ── Stats bar — placed below the hero fold ── */
export function HeroStats() {
  return (
    <section className="bg-white py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 divide-y divide-slate-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10 lg:px-16">
        {heroStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center py-6 sm:py-0">
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              size="lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
