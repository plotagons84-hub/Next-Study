import { useEffect, useState } from 'react'
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { subscribeAnnouncement } from '../lib/platformsFirestore'

const STYLES = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400', Icon: AlertTriangle },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', Icon: Info },
  green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400', Icon: CheckCircle2 },
}

// Admin-editable banner (Announce tab) - only renders when an admin has
// switched it on and given it text, and updates live via Firestore.
export default function SiteAnnouncement() {
  const [announcement, setAnnouncement] = useState(null)

  useEffect(() => subscribeAnnouncement(setAnnouncement), [])

  if (!announcement?.active || !announcement?.text) return null

  const style = STYLES[announcement.color] || STYLES.orange
  const { Icon } = style

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl px-4 sm:px-5 py-3.5 ${style.bg} border ${style.border} backdrop-blur-xl animate-fade-in-up`}
    >
      <Icon size={18} className={`shrink-0 mt-0.5 ${style.text}`} />
      <p className="text-sm text-white/80 leading-snug">{announcement.text}</p>
    </div>
  )
}
