import { accountRouter } from "./routers/account"
import { announcemenRouter } from "./routers/announcement"
import { answerRouter } from "./routers/answer"
import { assignmentRouter } from "./routers/assignment"
import { courseRouter } from "./routers/course"
import { questionRouter } from "./routers/question"
import { scoreRouter } from "./routers/score"
import { setRouter } from "./routers/set"
import { studentAnswerRouter } from "./routers/student-answer"
import { userRouter } from "./routers/user"
import { wordRouter } from "./routers/word"
import { createCallerFactory, createTRPCRouter } from "./trpc"

/*
 * Root router
 *
 * All routers added in /api/routers
 * */
export const appRouter = createTRPCRouter({
  set: setRouter,
  word: wordRouter,
  assignment: assignmentRouter,
  question: questionRouter,
  answer: answerRouter,
  score: scoreRouter,
  studentAnswer: studentAnswerRouter,
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
