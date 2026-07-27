import { useEffect, useState } from 'react'
import { Send, Megaphone } from 'lucide-react'
import { TELEGRAM_URL } from '../data/constants'
import { subscribeAppControl } from '../lib/platformsFirestore'

export default function TelegramModal() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [url, setUrl] = useState(TELEGRAM_URL)

  useEffect(
    () =>
      subscribeAppControl((c) => {
        setEnabled(c.telegramPopupEnabled !== false)
        if (c.telegramUrl) setUrl(c.telegramUrl)
      }),
    []
  )

  useEffect(() => {
    if (!enabled) return
    const timer = setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    }, 500)
    return () => clearTimeout(timer)
  }, [enabled])

  const close = () => setVisible(false)

  if (!enabled || !mounted) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onTransitionEnd={() => {
        if (!visible) setMounted(false)
      }}
    >
      <div className="absolute inset-0 bg-night/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />

      <div
        className={`relative w-full max-w-sm glass-strong rounded-xl3 overflow-hidden transition-all duration-300 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Join our Telegram community"
      >
        <div className="px-6 pt-8 pb-2 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full overflow-hidden ring-1 ring-white/15 shadow-glow animate-bounce-y bg-white">
            <img src="/logos/ns-icon.png" alt="Next Study" className="h-full w-full object-cover" />
          </div>

          <div className="flex items-center gap-2 mt-6 text-lg font-display font-semibold text-white">
            <Megaphone size={20} className="text-orange-400" />
            Join Our Telegram Community
          </div>

          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            Be the first to know when new platforms unlock, plus batch alerts and updates straight from
            Next Study.
          </p>
        </div>

        <div className="px-6 pb-6 pt-4 flex flex-col gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-600 hover:brightness-110 transition rounded-full py-3 text-sm font-semibold text-night shadow-glow"
          >
            <Send size={16} />
            Join Telegram Community
          </a>
          <button onClick={close} className="text-sm text-white/50 hover:text-white/80 transition-colors py-1">
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}
