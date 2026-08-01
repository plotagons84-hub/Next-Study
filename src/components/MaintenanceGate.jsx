import { useEffect, useState } from 'react'
import { Wrench } from 'lucide-react'
import { subscribeAppControl } from '../lib/platformsFirestore'
import { BRAND } from '../data/constants'

// Wraps the whole app. When an admin flips Maintenance Mode on (Control
// tab), every visitor sees this screen instead of the site - this is the
// actual effect of that toggle, not just a number on the admin's Stats tab.
export default function MaintenanceGate({ children }) {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // Safety net: never block the whole site forever just because Firestore
    // was slow to answer or hit a hiccup - show the real site after 2.5s
    // regardless, defaulting to "not in maintenance".
    const fallback = setTimeout(() => setChecked(true), 2500)

    const unsubscribe = subscribeAppControl((c) => {
      setMaintenanceMode(!!c.maintenanceMode)
      setChecked(true)
      clearTimeout(fallback)
    })

    return () => {
      unsubscribe()
      clearTimeout(fallback)
    }
  }, [])

  // Avoid a flash of real content before we know the current mode.
  if (!checked) return null

  if (!maintenanceMode) return children

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center animate-fade-in-up">
        <div className="relative h-20 w-20">
          <div className="absolute inset-[-10px] rounded-full border border-orange-500/20 animate-pulse-glow" />
          <div className="absolute inset-0 rounded-full bg-orange-500/10 border border-orange-500/40 grid place-items-center shadow-glow">
            <Wrench size={30} className="text-orange-400" />
          </div>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-7">
          Down for Maintenance
        </h1>
        <p className="text-sm text-white/50 mt-2 max-w-xs">
          {BRAND.name} is getting a quick tune-up. Please check back shortly.
        </p>
      </div>
    </div>
  )
}
