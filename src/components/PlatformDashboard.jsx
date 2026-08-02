import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import PlatformCard from './PlatformCard'

// Reused by /pw and /next-topper: a small header (back to home + title) and a
// grid of that category's sub-platforms. Every card here opens the real URL
// directly in the browser (a new tab) - the iframe-embedded "opens inside
// the app" mode was removed since some sites wouldn't reliably load in it.
export default function PlatformDashboard({ title, subtitle, items, basePath }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={18} />
          Back
        </Link>

        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{title}</h1>
          <p className="text-sm text-white/50 mt-1.5">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <PlatformCard
              key={item.id}
              index={i}
              platform={{
                name: item.name,
                description: item.description,
                logo: item.logo,
                colorRgb: '249 115 22',
                kind: 'link',
                href: item.url,
                locked: item.locked,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
