import { UserRole } from "@prisma/client"
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { getServerAuthSession } from "../auth"
import { db } from "../db"

/*
 * TRPC Context
 * @see https://trpc.io/docs/server/context
 * */
export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await getServerAuthSession()
  return {
    db,
    session,
    ...opts,
  }
}

/*
 * Initialization
 * */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/*
 * Server-side caller
 * */
export const createCallerFactory = t.createCallerFactory

/*
 * TRPC Router
 * @see https://trpc.io/docs/router
 * */
export const createTRPCRouter = t.router

/*
 * Public Procedure
 * */
export const publicProcedure = t.procedure

/*
 * Protected Procedure
 * */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/*
 * Role-based Procedure
 * */
function createRoleProcedure(role: UserRole) {
  return t.procedure.use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    if (ctx.session.user.role !== role) {
      throw new TRPCError({ code: "FORBIDDEN" })
    }

    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    })
  })
}

export const teacherProcedure = createRoleProcedure(UserRole.TEACHER)
export const studentProcedure = createRoleProcedure(UserRole.STUDENT)
