import { UserRole } from "@prisma/client"
import { z } from "zod"

import { userSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, teacherProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  list: teacherProcedure
    .input(
      z.object({
        role: z.nativeEnum(UserRole),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          role: input.role,
        },
        select: userSelects,
      })
    }),
  listCourseStudents: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          studentOfCourses: { some: { id: input.courseId } },
        },
        select: userSelects,
        orderBy: { name: "asc" },
      })
    }),
})
