import { z } from "zod"

import { wordSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const wordRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      z.object({
        setId: z.number(),
        data: z.object({
          term: z.string(),
          definition: z.string(),
          image: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.word.create({
        data: { ...input.data, setId: input.setId },
        select: wordSelects,
      })
    }),
  createMany: teacherProcedure
    .input(
      z.object({
        setId: z.number(),
        data: z.array(
          z.object({
            term: z.string(),
            definition: z.string(),
            image: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.word.createMany({
        data: input.data.map((w) => ({ ...w, setId: input.setId })),
      })
    }),
  list: protectedProcedure
    .input(
      z.object({
        setId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.word.findMany({
        where: { setId: input.setId },
        select: wordSelects,
      })
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.word.findMany({
        where: { id: input.id },
        select: wordSelects,
      })
    }),
  update: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          term: z.string(),
          definition: z.string(),
          image: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.word.update({
        where: { id: input.id },
        data: input.data,
      })
    }),
  delete: teacherProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.word.delete({ where: { id: input.id } })
    }),
})
