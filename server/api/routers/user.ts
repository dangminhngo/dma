import { UserRole } from "@prisma/client"
import { z } from "zod"

import { userSelects } from "../selects"
import { createTRPCRouter, teacherProcedure } from "../trpc"

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
})
