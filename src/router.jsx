import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { pwRoute } from './routes/pw'
import { pwViewerRoute } from './routes/pw-viewer'
import { nextTopperRoute } from './routes/next-topper'
import { nextTopperViewerRoute } from './routes/next-topper-viewer'

const routeTree = rootRoute.addChildren([
  indexRoute,
  pwRoute,
  pwViewerRoute,
  nextTopperRoute,
  nextTopperViewerRoute,
])

export const router = createRouter({ routeTree })
