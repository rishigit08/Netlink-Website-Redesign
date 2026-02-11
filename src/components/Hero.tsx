import { CTA } from "@/components/ui";
import SystemsEcosystemCanvas from "@/components/SystemsCanvas";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-[#07090f] to-slate-950/30" />
      <div className="bg-dot-pattern absolute inset-0 opacity-[0.04]" />
      <div className="absolute top-1/2 right-0 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-blue-600/[0.04] blur-[140px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* ════════════════════════════════════════════
            Left column — Copy + CTAs + Stats
            ════════════════════════════════════════════ */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Engineering AI-first Enterprises
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            Breaking silos. Connecting systems. Driving tangible outcomes.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <CTA href="#contact" variant="primary" size="lg">
              Contact us
            </CTA>
          </div>

        </div>

        {/* ════════════════════════════════════════════
            Right column — Sphere visualization
            ════════════════════════════════════════════ */}
        <div className="w-full flex-1 lg:max-w-[580px]">
          <div className="relative aspect-[4/3]">
            {/* Ambient glow behind the sphere */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-3/5 w-3/5 rounded-full bg-blue-500/[0.06] blur-[90px]" />
            </div>
            <SystemsEcosystemCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
