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

export const announcementSelects = {
  id: true,
  text: true,
  level: true,
  courseId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AnnouncementSelect

export const courseSelects = {
  id: true,
  name: true,
  teacher: { select: userSelects },
  students: { select: userSelects },
  announcements: { select: announcementSelects },
} satisfies Prisma.CourseSelect
