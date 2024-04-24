import { accountRouter } from "./routers/account"
import { announcemenRouter } from "./routers/announcement"
import { courseRouter } from "./routers/course"
import { userRouter } from "./routers/user"
import { createCallerFactory, createTRPCRouter } from "./trpc"

/*
 * Root router
 *
 * All routers added in /api/routers
 * */
export const appRouter = createTRPCRouter({
  announcement: announcemenRouter,
  course: courseRouter,
  account: accountRouter,
  user: userRouter,
})

/*
 * Export for reuse in client
 * */
export type AppRouter = typeof appRouter

/*
 * Create a server-side caller for the API
 * */
export const createCaller = createCallerFactory(appRouter)
