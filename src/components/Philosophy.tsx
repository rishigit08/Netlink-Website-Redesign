import { CTA } from "@/components/ui";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── POV Statement ── */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
            Our Philosophy
          </p>
          <blockquote className="mt-6 text-xl leading-tight font-semibold text-slate-900 sm:text-2xl lg:text-[1.75rem]">
            &ldquo;Systems thinking is the strategy. AI is the engine. Netlink is the integrator.&rdquo;
          </blockquote>
        </div>

        {/* ── Partnership CTA ── */}
        <div
          id="contact"
          className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 px-8 py-10 text-center sm:px-12 sm:py-12 lg:px-16 lg:py-14"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
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
