import { z } from "zod"

import { questionSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const questionRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      z.object({
        assignmentId: z.number(),
        data: z.object({
          text: z.string(),
          answers: z.array(
            z.object({
              text: z.string(),
              right: z.boolean(),
            })
          ),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.create({
        data: {
          assignmentId: input.assignmentId,
          text: input.data.text,
          answers: {
            createMany: { data: input.data.answers },
          },
        },
        select: questionSelects,
      })
    }),
  createMany: teacherProcedure
    .input(
      z.object({
        assignmentId: z.number(),
        data: z.array(
          z.object({
            text: z.string(),
            answers: z.array(
              z.object({
                text: z.string(),
                right: z.boolean(),
              })
            ),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const questions = []
      for (const data of input.data) {
        const question = await ctx.db.question.create({
          data: {
            assignmentId: input.assignmentId,
            text: data.text,
            answers: {
              createMany: { data: data.answers },
            },
          },
          select: questionSelects,
        })
        questions.push(question)
      }

      return questions
    }),
  list: protectedProcedure
    .input(z.object({ assignmentId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.question.findMany({
        where: { assignmentId: input.assignmentId },
        select: questionSelects,
      })
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.question.findUnique({
        where: { id: input.id },
        select: questionSelects,
      })
    }),
  update: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          text: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.update({
        where: { id: input.id },
        data: {
          text: input.data.text,
        },
        select: questionSelects,
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.delete({
        where: { id: input.id },
        select: questionSelects,
      })
    }),
})
