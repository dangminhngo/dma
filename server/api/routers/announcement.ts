import { AnnouncementLevel } from "@prisma/client"
import { z } from "zod"

import { announcementSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const announcemenRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      z.object({
        courseId: z.number(),
        data: z.object({
          text: z.string(),
          level: z.nativeEnum(AnnouncementLevel),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.create({
        data: {
          ...input.data,
          courseId: input.courseId,
        },
        select: announcementSelects,
      })
    }),
  list: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.announcement.findMany({
        where: { course: { id: input.courseId } },
        select: announcementSelects,
        orderBy: { createdAt: "desc" },
      })
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.announcement.findUnique({
        where: { id: input.id },
        select: announcementSelects,
      })
    }),
  update: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          text: z.string(),
          level: z.nativeEnum(AnnouncementLevel),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.update({
        where: { id: input.id },
        data: input.data,
        select: announcementSelects,
      })
    }),
  delete: teacherProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.delete({
        where: { id: input.id },
        select: announcementSelects,
      })
    }),
})
