import { z } from "zod"

import { scoreSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const scoreRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ assignmentId: z.number(), points: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.score.create({
        data: {
          ...input,
          studentId: ctx.session.user.id,
        },
        select: scoreSelects,
      })
    }),
  listByAssignment: protectedProcedure
    .input(z.object({ assignmentId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.score.findMany({
        where: { assignmentId: input.assignmentId },
        orderBy: { points: "desc" },
        select: scoreSelects,
      })
    }),
  listByStudent: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.score.findMany({
      where: { studentId: ctx.session.user.id },
      select: scoreSelects,
    })
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.score.findUnique({
        where: { id: input.id },
        select: scoreSelects,
      })
    }),
  byAssignment: protectedProcedure
    .input(z.object({ assignmentId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.score.findUnique({
        where: {
          assignmentId_studentId: {
            assignmentId: input.assignmentId,
            studentId: ctx.session.user.id,
          },
        },
        select: scoreSelects,
      })
    }),
  delete: teacherProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.score.delete({
        where: { id: input.id },
        select: scoreSelects,
      })
    }),
})
