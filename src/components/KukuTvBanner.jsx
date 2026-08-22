import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { KUKU_TV_URL } from '../data/constants'
import { subscribeAppControl } from '../lib/platformsFirestore'

export default function KukuTvBanner() {
  const [enabled, setEnabled] = useState(true)
  const [url, setUrl] = useState(KUKU_TV_URL)

  useEffect(
    () =>
      subscribeAppControl((c) => {
        setEnabled(c.kukuTvEnabled !== false)
        if (c.kukuTvUrl) setUrl(c.kukuTvUrl)
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
      style={{ animationDelay: '60ms' }}
    >
      <span className="relative shrink-0 h-10 w-10 rounded-full overflow-hidden ring-1 ring-red-500/40 bg-white">
        <span className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse-glow" />
        <img src="/logos/kuku-tv.png" alt="Kuku TV" className="relative h-full w-full object-cover" />
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold">
          Kuku TV
        </span>
        <span className="block text-sm text-white/80 truncate">Watch live classes now</span>
      </span>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-red-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}
