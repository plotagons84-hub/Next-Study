import { useEffect, useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { pwPlatforms as basePw } from '../data/constants'
import { subscribePlatforms } from '../lib/platformsFirestore'
import PlatformViewer from '../components/PlatformViewer'

export const pwViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pw/$id',
  component: PwViewer,
})

function PwViewer() {
  const { id } = pwViewerRoute.useParams()
  const [items, setItems] = useState(basePw)
  useEffect(() => subscribePlatforms((data) => setItems(data.pwPlatforms)), [])

  const platform = items.find((p) => p.id === id)
  return <PlatformViewer platform={platform} backTo="/pw" />
}
