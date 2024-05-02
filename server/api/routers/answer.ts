import { z } from "zod"

import { answerSelects } from "../selects"
import { createTRPCRouter, teacherProcedure } from "../trpc"

export const answerRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      z.object({
        questionId: z.number(),
        data: z.object({ text: z.string(), right: z.boolean() }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.answer.create({
        data: {
          ...input.data,
          questionId: input.questionId,
        },
        select: answerSelects,
      })
    }),
  update: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({ text: z.string(), right: z.boolean() }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.answer.update({
        where: { id: input.id },
        data: input.data,
        select: answerSelects,
      })
    }),
  delete: teacherProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.answer.delete({
        where: { id: input.id },
        select: answerSelects,
      })
    }),
})
