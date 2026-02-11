import { heroStats } from "@/lib/data";
import { Stat, CTA } from "@/components/ui";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── POV Statement ── */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
            Our Philosophy
          </p>
          <blockquote className="mt-6 text-2xl leading-snug font-semibold text-white sm:text-3xl lg:text-4xl">
            &ldquo;Systems thinking is the strategy.
            <br className="hidden sm:inline" /> AI is the engine.
            <br className="hidden sm:inline" /> Netlink is the integrator.&rdquo;
          </blockquote>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-12 border-y border-slate-800 py-10 sm:gap-16 md:gap-20">
          {heroStats.map((stat) => (
            <Stat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              size="lg"
            />
          ))}
        </div>

        {/* ── Partnership CTA ── */}
        <div
          id="contact"
          className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 px-8 py-14 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to make your systems
            <br className="hidden sm:inline" /> think together?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTA
              href="#contact"
              variant="primary"
              size="lg"
            >
              Let&apos;s talk
            </CTA>
            <CTA
              href="#services"
              variant="secondary"
              size="lg"
            >
              Explore services
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}
