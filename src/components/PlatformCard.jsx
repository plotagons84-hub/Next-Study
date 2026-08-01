import { Link } from '@tanstack/react-router'
import { ArrowUpRight, ChevronRight, Lock } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

// Renders one of three ways depending on what's passed in:
// - `to`     -> internal TanStack Link (dashboards, and sub-platform viewers).
//               The browser's address bar only ever shows our own routes.
// - `href`   -> external link, opens in a new tab (real destination visible).
// - `locked` -> plain, non-interactive card with a "Coming Soon" badge.
export default function PlatformCard({ platform, index = 0 }) {
  const [ref, visible] = useReveal()
  const { name, description, logo, colorRgb, to, href, kind } = platform
  const locked = !!platform.locked || (kind === 'link' && !href)

  const sharedClassName = `group glass rounded-xl3 p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-all duration-700 ease-out
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    ${
      locked
        ? 'opacity-[0.65]'
        : 'hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgb(var(--accent)/0.5),0_0_44px_-8px_rgb(var(--accent)/0.65)]'
    }`

  const sharedStyle = {
    '--accent': colorRgb,
    transitionDelay: visible ? `${index * 90}ms` : '0ms',
  }

  const inner = (
    <>
      <div
        className={`h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] shrink-0 rounded-2xl overflow-hidden ring-1 bg-white transition-transform duration-300 ${
          locked ? 'ring-white/10 grayscale' : 'ring-[rgb(var(--accent)/0.4)] group-hover:scale-105'
        }`}
      >
        <img src={logo} alt={`${name} logo`} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">{name}</h3>
        <p className="text-sm text-white/55 mt-1 leading-snug">{description}</p>
      </div>

      {locked ? (
        <span className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-white/50 bg-white/5 border border-white/10 rounded-full px-2.5 py-1.5">
          <Lock size={12} />
          Coming Soon
        </span>
      ) : to ? (
        <ChevronRight
          size={20}
          className="shrink-0 text-white/30 transition-all duration-300 group-hover:text-[rgb(var(--accent))] group-hover:translate-x-0.5"
        />
      ) : (
        <ArrowUpRight
          size={20}
          className="shrink-0 text-white/30 transition-all duration-300 group-hover:text-[rgb(var(--accent))] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )

  if (locked) {
    return (
      <div ref={ref} style={sharedStyle} className={sharedClassName}>
        {inner}
      </div>
    )
  }

  if (to) {
    return (
      <Link ref={ref} to={to} style={sharedStyle} className={sharedClassName}>
        {inner}
      </Link>
    )
  }

  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" style={sharedStyle} className={sharedClassName}>
      {inner}
    </a>
  )
}
