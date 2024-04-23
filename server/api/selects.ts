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

export const courseSelects = {
  id: true,
  name: true,
  teacher: { select: userSelects },
  students: { select: userSelects },
} satisfies Prisma.CourseSelect
