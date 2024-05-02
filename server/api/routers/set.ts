import { z } from "zod"

import { setSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const setRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      z.object({
        courseId: z.number(),
        data: z.object({
          title: z.string(),
          description: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.set.create({
        data: {
          ...input.data,
          courseId: input.courseId,
        },
        select: setSelects,
      })
    }),
  update: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        data: z
          .object({
            title: z.string(),
            description: z.string(),
          })
          .partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.set.update({
        where: { id: input.id },
        data: input.data,
        select: setSelects,
      })
    }),
  list: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.set.findMany({
        where: { courseId: input.courseId },
        select: setSelects,
      })
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.set.findUnique({
        where: { id: input.id },
        select: setSelects,
      })
    }),
  delete: teacherProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.set.delete({ where: { id: input.id }, select: setSelects })
    }),
})
