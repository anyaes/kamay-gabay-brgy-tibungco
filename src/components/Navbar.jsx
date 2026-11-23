import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar({
  links = [],
  fixed = false,
  cta = null,
}) {
  const [open, setOpen] = useState(false)

  const renderLink = (l, mobile = false) => {
    const cls = mobile
      ? 'px-2 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-[#F5C253] hover:bg-white/5 transition block'
      : 'transition hover:text-[#F5C253]'

    if (l.href) {
      return (
        <a key={l.label} href={l.href} className={cls} onClick={() => mobile && setOpen(false)}>
          {l.label}
        </a>
      )
    }
    return (
      <Link key={l.label} to={l.to} className={cls} onClick={() => mobile && setOpen(false)}>
        {l.label}
      </Link>
    )
  }

  return (
    <nav
      className={`z-50 w-full border-b border-emerald-950/20 bg-[#173022]/95 text-white shadow-md backdrop-blur-md ${
        fixed ? 'fixed left-0 top-0' : 'sticky top-0'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="shrink-0 text-lg font-extrabold tracking-tight text-[#F5C253] sm:text-xl"
          onClick={() => setOpen(false)}
        >
          Kamay-Gabay
        </Link>

        {/* Desktop links */}
        <div className="hidden max-w-[70%] items-center gap-4 overflow-x-auto whitespace-nowrap text-xs font-medium text-emerald-50 sm:flex sm:max-w-none sm:gap-6 sm:text-sm">
          {links.map((l) => renderLink(l))}
          {cta && (
            <Link
              to={cta.to || '/#get-involved'}
              className="rounded-full bg-[#F5C253] px-4 py-2 font-bold text-[#173022] transition hover:bg-[#e6b24a]"
            >
              {cta.label}
            </Link>
          )}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 text-white sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-emerald-800/50 bg-[#173022] px-5 pb-4 pt-2 sm:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => renderLink(l, true))}
            {cta && (
              <Link
                to={cta.to || '/#get-involved'}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-[#F5C253] px-4 py-2 text-center text-sm font-bold text-[#173022]"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}