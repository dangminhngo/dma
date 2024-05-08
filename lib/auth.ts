import { UserStatus } from "@prisma/client"
import { compare } from "bcryptjs"
import { type User } from "next-auth"
import { z } from "zod"

import { env } from "~/env"
import { userSelects } from "~/server/api/selects"
import { db } from "~/server/db"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function signInWithCredentials(credentials?: z.infer<typeof credentialsSchema>): Promise<User | null> {
  try {
    const { success } = credentialsSchema.safeParse(credentials)

    if (!success || !credentials) {
      throw new Error("Invalid email and password")
    }

    const user = await db.user.findFirst({
      where: { email: credentials.email },
      select: {...userSelects, password: true },
    })

    if (
      env.NODE_ENV !== "development" &&
      (user?.status === UserStatus.PENDING ||
        user?.status === UserStatus.DEACTIVATED)
    ) {
      throw new Error("Cannot sign in with a pending or deactived account")
    }

    if (!user?.password) {
      throw new Error("Invalid email and password")
    }

    const isPasswordMatched = await compare(credentials.password, user.password)

    if (!isPasswordMatched) {
      throw new Error("Invalid password")
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    }
  } catch (err) {
    console.log(err)
    return null
  }
}
