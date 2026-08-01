import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { BRAND, platforms as basePlatforms } from '../data/constants'
import { subscribePlatforms, recordAppOpen, startPresenceHeartbeat } from '../lib/platformsFirestore'
import Hero from '../components/Hero'
import UrgentAlertBanner from '../components/UrgentAlertBanner'
import KukuTvBanner from '../components/KukuTvBanner'
import SiteAnnouncement from '../components/SiteAnnouncement'
import PlatformCard from '../components/PlatformCard'
import TelegramModal from '../components/TelegramModal'
import { useReveal } from '../hooks/useReveal'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

function HomePage() {
  const [footerRef, footerVisible] = useReveal()
  const [platforms, setPlatforms] = useState(basePlatforms)

  useEffect(() => {
    recordAppOpen()
    const stopHeartbeat = startPresenceHeartbeat()
    const unsubscribe = subscribePlatforms((data) => setPlatforms(data.platforms))
    return () => {
      unsubscribe()
      stopHeartbeat()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 sm:px-6 py-14 sm:py-16">
        <Hero />

        <div className="mt-10 space-y-3">
          <SiteAnnouncement />
          <KukuTvBanner />
          <UrgentAlertBanner />
        </div>

        {/* Platform cards */}
        <div className="flex flex-col gap-4 mt-3">
          {platforms.map((platform, i) => (
            <PlatformCard key={platform.id} platform={platform} index={i} />
          ))}
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className={`mt-16 text-center transition-all duration-700 ease-out ${
            footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs tracking-[0.3em] text-white/35 uppercase">&mdash; {BRAND.tagline} &mdash;</p>
          <p className="mt-4 text-sm text-white/60">{BRAND.credit}</p>
          <p className="mt-2 text-xs text-white/35">{BRAND.copyright}</p>
        </footer>
      </main>

      <TelegramModal />
    </div>
  )
}
