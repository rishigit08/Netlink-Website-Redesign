import { blogTeasers } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

export default function BlogPOV() {
  return (
    <section id="pov" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          heading="Point of View"
          subtext="Perspectives on building intelligent enterprise systems"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {blogTeasers.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
            >
              {/* Image placeholder */}
              <div
                className="h-48 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50"
                aria-label="Article illustration"
              />

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="mb-3 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                  Insight
                </p>

                <h3 className="text-lg font-semibold leading-snug text-slate-900">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                  {post.description}
                </p>

                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Read more
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
