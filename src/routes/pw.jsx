import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { subscribePlatforms, sortForDisplay } from '../lib/platformsFirestore'
import PlatformDashboard from '../components/PlatformDashboard'

export const pwRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pw',
  component: PwDashboard,
})

function PwDashboard() {
  const [items, setItems] = useState([])
  // Don't show anything until the live lock/hide state has actually
  // arrived - see the matching comment in routes/index.jsx.
  const [loaded, setLoaded] = useState(false)
  useEffect(
    () =>
      subscribePlatforms((data) => {
        setItems(sortForDisplay(data.pwPlatforms))
        setLoaded(true)
      }),
    []
  )

  return (
    <PlatformDashboard
      title="PW ULTIMATE"
      subtitle="Pick a login mode to continue"
      items={items}
      basePath="/pw"
      loaded={loaded}
    />
  )
}
