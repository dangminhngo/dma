import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { hash } from "bcrypt"
import { type Adapter } from "next-auth/adapters"
import { z } from "zod"

import { env } from "~/env"
import { userSelects } from "../selects"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const accountRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(4),
        role: z.nativeEnum(UserRole),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const adapter = PrismaAdapter(ctx.db) as Adapter

      if (!adapter.createUser) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }

      await adapter.createUser({
        email: input.email,
        emailVerified: null,
        role: input.role,
      })

      const encryptedPassword = await hash(
        input.password,
        env.BCRYPT_SALT_ROUNDS
      )

      return ctx.db.user.update({
        where: { email: input.email },
        data: {
          name: input.name,
          password: encryptedPassword,
        },
        select: userSelects,
      })
    }),
  update: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      })
    }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.user.delete({ where: { id: ctx.session.user.id } })
  }),
})
