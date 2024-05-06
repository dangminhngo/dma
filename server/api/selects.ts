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

export const wordSelects = {
  id: true,
  term: true,
  definition: true,
  image: true,
  setId: true,
} satisfies Prisma.WordSelect

export const setSelects = {
  id: true,
  title: true,
  description: true,
  _count: { select: { words: true } },
  courseId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SetSelect

export const assignmentSelects = {
  id: true,
  title: true,
  description: true,
  _count: {
    select: { questions: true },
  },
  courseId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AssignmentSelect

export const answerSelects = {
  id: true,
  text: true,
  right: true,
  questionId: true,
} satisfies Prisma.AnswerSelect

export const questionSelects = {
  id: true,
  text: true,
  image: true,
  audio: true,
  explanation: true,
  answers: { select: answerSelects },
  assignmentId: true,
} satisfies Prisma.QuestionSelect

export const scoreSelects = {
  id: true,
  points: true,
  assignmentId: true,
  studentId: true,
} satisfies Prisma.ScoreSelect

export const studentAnswerSelects = {
  id: true,
  studentId: true,
  assignmentId: true,
  questionId: true,
  answerId: true,
} satisfies Prisma.StudentAnswerSelect
