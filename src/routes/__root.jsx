import { useEffect, useRef } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

function AuroraBackdrop() {
  const blobRefs = useRef([])

  useEffect(() => {
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const speeds = [0.06, -0.08, 0.05]
      blobRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.transform = `translate3d(0, ${y * speeds[i]}px, 0)`
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-night">
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-orange-600/30 blur-[120px] animate-drift"
      />
      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="absolute top-1/4 -right-32 h-[32rem] w-[32rem] rounded-full bg-amber-400/20 blur-[120px] animate-drift-slow"
      />
      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="absolute -bottom-44 left-1/4 h-[36rem] w-[36rem] rounded-full bg-orange-700/25 blur-[130px] animate-drift"
      />
      <div className="absolute inset-0 bg-night/55" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
        }}
      />
    </div>
  )
}

function RootLayout() {
  return (
    <>
      <AuroraBackdrop />
      <Outlet />
    </>
  )
}

export const rootRoute = createRootRoute({
  component: RootLayout,
})
