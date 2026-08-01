import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { pwPlatforms as basePw } from '../data/constants'
import { subscribePlatforms } from '../lib/platformsFirestore'
import PlatformDashboard from '../components/PlatformDashboard'

export const pwRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pw',
  component: PwDashboard,
})

function PwDashboard() {
  const [items, setItems] = useState(basePw)
  useEffect(() => subscribePlatforms((data) => setItems(data.pwPlatforms)), [])

  return (
    <PlatformDashboard title="PW ULTIMATE" subtitle="Pick a login mode to continue" items={items} basePath="/pw" />
  )
}
