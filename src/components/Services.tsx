import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

const serviceIcons: React.ReactNode[] = [
  <svg key="s0" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" strokeLinecap="round" />
    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" />
  </svg>,
  <svg key="s1" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 18l2-2-2-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 18l-2-2 2-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5 6l-3 12" strokeLinecap="round" />
  </svg>,
  <svg key="s2" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="s3" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12h16M4 12l4-4m-4 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" />
  </svg>,
  <svg key="s4" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
    <path d="M6.5 19a4.5 4.5 0 01-.42-8.98A7 7 0 0119.5 11a4.5 4.5 0 01.5 8.98" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 13v6m-3-3l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="s5" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          heading="Enterprise capabilities, designed to work together"
          subtext="Capabilities for connected systems"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((svc, i) => (
            <article
              key={svc.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 sm:p-8"
            >
              <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-100">
                {serviceIcons[i]}
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {svc.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {svc.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
