import { type Prisma } from "@prisma/client"

export const userSelects = {
  id: true,
  email: true,
  emailVerified: true,
  name: true,
  image: true,
  role: true,
  status: true,
} satisfies Prisma.UserSelect
