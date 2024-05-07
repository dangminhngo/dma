import { UserStatus } from "@prisma/client"
import { compare } from "bcryptjs"
import { type User } from "next-auth"

import { env } from "~/env"
import { userSelects } from "~/server/api/selects"
import { db } from "~/server/db"

export async function signInWithCredentials(credentials?: {
  email?: string
  password?: string
}): Promise<User | null> {
  try {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Invalid credentials")
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
