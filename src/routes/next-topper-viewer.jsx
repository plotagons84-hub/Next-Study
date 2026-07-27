import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { nextTopperPlatforms as baseNt } from '../data/constants'
import { subscribePlatforms } from '../lib/platformsFirestore'
import PlatformViewer from '../components/PlatformViewer'

export const nextTopperViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/next-topper/$id',
  component: NextTopperViewer,
})

function NextTopperViewer() {
  const { id } = nextTopperViewerRoute.useParams()
  const [items, setItems] = useState(baseNt)
  useEffect(() => subscribePlatforms((data) => setItems(data.nextTopperPlatforms)), [])

  const platform = items.find((p) => p.id === id)
  return <PlatformViewer platform={platform} backTo="/next-topper" />
}
