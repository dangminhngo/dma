import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole, UserStatus } from "@prisma/client"
import { hash } from "bcrypt"

import { env } from "~/env"
import { db } from "~/server/db"

/* eslint-disable @typescript-eslint/no-floating-promises */

interface UserData {
  email: string
  name: string
  role: UserRole
  status: UserStatus
  emailVerified: Date
  password: string
}

async function createAuthUser(data: UserData) {
  const adapter = PrismaAdapter(db)

  if (!adapter?.createUser) throw new Error("Adapter not found")

  await adapter.createUser({
    id: "",
    ...data,
  })

  const encryptedPassword = await hash(data.password, env.BCRYPT_SALT_ROUNDS)

  await db.user.update({
    where: { email: data.email },
    data: {
      role: data.role,
      password: encryptedPassword,
      status: data.status,
    },
  })
}

const users = [
  {
    email: "ndminhdev@gmail.com",
    name: "Minh Ngo",
    emailVerified: new Date(),
    role: UserRole.TEACHER,
    password: "dminh",
    status: UserStatus.ACTIVATED,
  },
  {
    email: "ndminhdev1@gmail.com",
    name: "Minh One",
    emailVerified: new Date(),
    role: UserRole.STUDENT,
    password: "dminh",
    status: UserStatus.ACTIVATED,
  },
  {
    email: "ndminhdev2@gmail.com",
    name: "Minh Two",
    emailVerified: new Date(),
    role: UserRole.STUDENT,
    password: "dminh",
    status: UserStatus.ACTIVATED,
  },
]

;(async function () {
  if (env.NODE_ENV === "production") throw new Error("Database seeds cannot run on production.")
  for (const data of users) {
    await createAuthUser(data)
  }
})()
