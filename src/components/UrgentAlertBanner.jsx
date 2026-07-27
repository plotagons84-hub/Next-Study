import { useEffect, useState } from 'react'
import { Siren, ArrowUpRight } from 'lucide-react'
import { URGENT_ALERT_URL } from '../data/constants'
import { subscribeAppControl } from '../lib/platformsFirestore'

export default function UrgentAlertBanner() {
  const [enabled, setEnabled] = useState(true)
  const [url, setUrl] = useState(URGENT_ALERT_URL)

  useEffect(
    () =>
      subscribeAppControl((c) => {
        setEnabled(c.urgentAlertEnabled !== false)
        if (c.urgentAlertUrl) setUrl(c.urgentAlertUrl)
      }),
    []
  )

  if (!enabled) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 rounded-2xl px-4 sm:px-5 py-3.5
        bg-red-500/10 border border-red-500/40 backdrop-blur-xl
        shadow-[0_0_0_1px_rgba(239,68,68,0.25),0_0_30px_-10px_rgba(239,68,68,0.6)]
        hover:bg-red-500/15 transition-colors animate-fade-in-up"
      style={{ animationDelay: '100ms' }}
    >
      <span className="relative shrink-0 h-9 w-9 rounded-full bg-red-500/20 grid place-items-center">
        <span className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse-glow" />
        <Siren size={18} className="relative text-red-400" />
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold">
          Urgent Alert
        </span>
        <span className="block text-sm text-white/80 truncate">Join our official channel now</span>
      </span>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-red-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}
