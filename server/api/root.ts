import { accountRouter } from "./routers/account"
import { createCallerFactory, createTRPCRouter } from "./trpc"

/*
 * Root router
 *
 * All routers added in /api/routers
 * */
export const appRouter = createTRPCRouter({
  account: accountRouter,
})

/*
 * Export for reuse in client
 * */
export type AppRouter = typeof appRouter

/*
 * Create a server-side caller for the API
 * */
export const createCaller = createCallerFactory(appRouter)
