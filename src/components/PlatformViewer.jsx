import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ExternalLink, Loader2 } from 'lucide-react'

// Embeds the real platform in an iframe inside our own route (/pw/$id, etc.)
// so the browser's address bar keeps showing our domain, never the
// underlying proxy/study-site URL - it should just feel like part of the app.
export default function PlatformViewer({ platform, backTo }) {
  const [loaded, setLoaded] = useState(false)

  if (!platform) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/70">That platform couldn't be found.</p>
        <Link to={backTo} className="mt-4 text-orange-400 hover:text-orange-300 text-sm">
          &larr; Back
        </Link>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="glass flex items-center gap-3 px-4 py-3 shrink-0">
        <Link
          to={backTo}
          className="h-9 w-9 grid place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </Link>
        <div className="h-7 w-7 rounded-lg overflow-hidden bg-white shrink-0">
          <img src={platform.logo} alt="" className="h-full w-full object-cover" />
        </div>
        <span className="font-display font-semibold text-white text-sm truncate">{platform.name}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          Live
        </span>
      </div>

      <div className="relative flex-1">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center bg-night">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="text-orange-400 animate-spin" />
              <p className="text-xs text-white/40 font-mono">Loading {platform.name}&hellip;</p>
            </div>
          </div>
        )}
        <iframe
          src={platform.url}
          title={platform.name}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0"
          allow="fullscreen"
        />
      </div>

      {/* Fallback in case a site refuses to load inside an iframe */}
      {loaded && (
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center justify-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors py-2"
        >
          <ExternalLink size={11} />
          Trouble loading? Open directly
        </a>
      )}
    </div>
  )
}
