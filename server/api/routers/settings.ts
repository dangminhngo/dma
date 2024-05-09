import { AppTheme } from "@prisma/client"
import { z } from "zod"

import { settingsSelects } from "../selects"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const settingsRouter = createTRPCRouter({
  fetch: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.settings.upsert({
      where: { userId: ctx.session.user.id },
      update: {},
      create: {
        userId: ctx.session.user.id,
      },
      select: settingsSelects,
    })
  }),
  update: protectedProcedure
    .input(
      z.object({
        data: z
          .object({
            theme: z.nativeEnum(AppTheme),
          })
          .partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.settings.update({
        where: { userId: ctx.session.user.id },
        data: input.data,
        select: settingsSelects,
      })
    }),
})
