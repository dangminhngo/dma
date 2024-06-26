import { z } from "zod"

import { assignmentSelects, scoreSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const assignmentRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      z.object({
        courseId: z.number(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          expiresIn: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.assignment.create({
        data: { ...input.data, courseId: input.courseId },
        select: assignmentSelects,
      })
    }),
  list: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.assignment.findMany({
        where: { courseId: input.courseId },
        select: assignmentSelects,
      })
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.assignment.findUnique({
        where: { id: input.id },
        select: { ...assignmentSelects, course: true },
      })
    }),
  update: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          expiresIn: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.assignment.update({
        where: { id: input.id },
        data: input.data,
      })
    }),
  delete: teacherProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.assignment.delete({
        where: { id: input.id },
        select: assignmentSelects,
      })
    }),
  allowRetake: teacherProcedure
    .input(z.object({ studentId: z.string(), assignmentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.studentAnswer.deleteMany({
        where: {
          assignmentId: input.assignmentId,
          studentId: input.studentId,
        },
      })
      return ctx.db.score.delete({
        where: {
          assignmentId_studentId: {
            assignmentId: input.assignmentId,
            studentId: input.studentId,
          },
        },
        select: scoreSelects,
      })
    }),
})
