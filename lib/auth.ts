import { type User } from "next-auth";
import { db } from "~/server/db";
import { compare } from "bcrypt";

export async function signInWithCredentials(credentials?: { email?: string; password?: string }): Promise<User | null> {
  try {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Invalid credentials")
    }

    const user = await db.user.findFirst({ where: { email: credentials.email }})

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
  } catch(err) {
    console.log(err)
    return null
  }
}
