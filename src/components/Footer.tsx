import { footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#060810]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* ── Top: columns ── */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-block" aria-label="Netlink home">
              <img
                src="/netlink-logo.png"
                alt="Netlink"
                className="h-9 w-auto brightness-110"
              />
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Engineering AI-first enterprises. Breaking silos. Connecting
              systems. Driving tangible outcomes.
            </p>

            {/* Social placeholders */}
            <div className="mt-6 flex gap-3">
              {["LinkedIn", "Twitter", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-300"
                >
                  <span className="text-[10px] font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-300"
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
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Netlink Digital Solutions. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-600">
              <a href="#" className="transition-colors hover:text-slate-400">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-slate-400">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-slate-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
