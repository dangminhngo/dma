import { accountRouter } from "./routers/account"
import { courseRouter } from "./routers/course"
import { createCallerFactory, createTRPCRouter } from "./trpc"

/*
 * Root router
 *
 * All routers added in /api/routers
 * */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  course: courseRouter,
})

/*
 * Export for reuse in client
 * */
export type AppRouter = typeof appRouter

/*
 * Create a server-side caller for the API
 * */
export const createCaller = createCallerFactory(appRouter)
