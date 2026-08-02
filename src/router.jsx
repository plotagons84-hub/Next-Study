import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { pwRoute } from './routes/pw'
import { nextTopperRoute } from './routes/next-topper'

const routeTree = rootRoute.addChildren([indexRoute, pwRoute, nextTopperRoute])

export const router = createRouter({ routeTree })
