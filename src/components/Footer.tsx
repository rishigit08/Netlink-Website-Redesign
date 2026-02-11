import { footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* ── Top: columns ── */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-block" aria-label="Netlink home">
              <img
                src="/netlink-logo.png"
                alt="Netlink"
                className="h-9 w-auto"
              />
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Engineering AI-first enterprises. Breaking silos. Connecting
              systems. Driving tangible outcomes.
            </p>

          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Netlink Digital Solutions. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <a href="#" className="transition-colors hover:text-slate-600">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-slate-600">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-slate-600">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
