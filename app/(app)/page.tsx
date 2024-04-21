import { redirect } from "next/navigation"
import { UserRole } from "@prisma/client"

import { getServerAuthSession } from "~/server/auth"

export default async function Home() {
  const session = await getServerAuthSession()

  if (session?.user.role === UserRole.TEACHER) return redirect("/t/courses")
  if (session?.user.role === UserRole.STUDENT) return redirect("/s/courses")

  return redirect("/sign-in")
}
