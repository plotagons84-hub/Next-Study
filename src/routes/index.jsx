import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { BRAND } from '../data/constants'
import { subscribePlatforms, recordAppOpen, recordDeviceOpen, startPresenceHeartbeat, sortForDisplay } from '../lib/platformsFirestore'
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
  const [platforms, setPlatforms] = useState([])
  // Cards only ever render once the FIRST live snapshot from Firestore has
  // arrived - never from the hardcoded (all-unlocked-by-default) fallback.
  // Otherwise a card an admin just locked/hid can briefly flash as open on
  // a fresh page load, for as long as the Firestore connection takes to
  // establish (which can be several seconds on a slow connection).
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    recordAppOpen()
    recordDeviceOpen()
    const stopHeartbeat = startPresenceHeartbeat()
    const unsubscribe = subscribePlatforms((data) => {
      setPlatforms(sortForDisplay(data.platforms))
      setLoaded(true)
    })
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

        {/* Platform cards - hidden behind a skeleton until the real
            lock/hide state has loaded, see the `loaded` comment above. */}
        <div className="flex flex-col gap-4 mt-3">
          {!loaded
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : platforms.map((platform, i) => <PlatformCard key={platform.id} platform={platform} index={i} />)}
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

function CardSkeleton() {
  return (
    <div className="glass rounded-xl3 p-5 sm:p-6 flex items-center gap-4 sm:gap-5 animate-pulse">
      <div className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] shrink-0 rounded-2xl bg-white/5" />
      <div className="min-w-0 flex-1">
        <div className="h-4 w-1/2 rounded-full bg-white/10" />
      </div>
    </div>
  )
}
