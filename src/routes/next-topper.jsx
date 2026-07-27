import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { nextTopperPlatforms as baseNt } from '../data/constants'
import { subscribePlatforms } from '../lib/platformsFirestore'
import PlatformDashboard from '../components/PlatformDashboard'

export const nextTopperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/next-topper',
  component: NextTopperDashboard,
})

function NextTopperDashboard() {
  const [items, setItems] = useState(baseNt)
  useEffect(() => subscribePlatforms((data) => setItems(data.nextTopperPlatforms)), [])

  return (
    <PlatformDashboard
      title="NEXT TOPPER ULTIMATE"
      subtitle="Pick a version to continue"
      items={items}
      basePath="/next-topper"
    />
  )
}
