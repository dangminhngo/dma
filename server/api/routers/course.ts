import { UserRole } from "@prisma/client"
import { z } from "zod"

import { courseSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const courseRouter = createTRPCRouter({
  create: teacherProcedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.create({
        data: {
          name: input.name,
          teacher: { connect: { id: ctx.session.user.id } },
        },
        select: courseSelects,
      })
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    // as role TEACHER
    if (ctx.session.user.role === UserRole.TEACHER) {
      return ctx.db.course.findMany({
        where: {
          teacher: {
            id: { equals: ctx.session.user.id },
          },
        },
        select: courseSelects,
      })
    }

    // as role STUDENT
    return ctx.db.course.findMany({
      where: {
        students: {
          some: {
            id: {
              contains: ctx.session.user.id,
            },
          },
        },
      },
      select: courseSelects,
    })
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.course.findUnique({
        where: { id: input.id },
        select: courseSelects,
      })
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.update({
        where: { id: input.id },
        data: input.data,
        select: courseSelects,
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.delete({
        where: { id: input.id },
        select: courseSelects,
      })
    }),
})
