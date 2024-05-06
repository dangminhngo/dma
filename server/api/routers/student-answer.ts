import { z } from "zod"

import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"
import { type Prisma } from "@prisma/client"

export const studentAnswerRouter = createTRPCRouter({
  createMany: protectedProcedure
    .input(
      z.object({
        assignmentId: z.number(),
        answers: z.record(z.string(), z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
    const data: Prisma.StudentAnswerCreateManyInput[] = []
      for (const questionId of Object.keys(input.answers)) {
        data.push({
        studentId: ctx.session.user.id,
        assignmentId: input.assignmentId,
        questionId: +questionId,
        answerId: +input.answers[questionId]
      })
    }

    return ctx.db.studentAnswer.createMany({
      data,
    })
  }),
  listByAssignment: protectedProcedure.input(z.object({
    assignmentId: z.number(),
  })).query(async ({ ctx, input }) => {
    return ctx.db.studentAnswer.findMany({
      where: {
        studentId: ctx.session.user.id,
        assignmentId: input.assignmentId,
      }
    })
  }),
  listByStudentAndAssignment: teacherProcedure.input(z.object({
    studentId: z.string(),
    assignmentId: z.number(),
  })).query(async ({ ctx, input }) => {
    return ctx.db.studentAnswer.findMany({
      where: {
        studentId: input.studentId,
        assignmentId: input.assignmentId,
      }
    })
  }),
  deleteByStudentAndAssignment: teacherProcedure.input(z.object({ studentId: z.string(), assignmentId: z.number() })).mutation(async ({ ctx, input }) => {
    return ctx.db.studentAnswer.deleteMany({
      where: {
        studentId: input.studentId,
        assignmentId: input.assignmentId,
      }
    })
  })
})
