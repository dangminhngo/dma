import { UserRole } from "@prisma/client"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import Header from "~/components/header"
import { getServerAuthSession } from "~/server/auth"

export default async function AppLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const session = await getServerAuthSession()

  const heads = headers()
  const pathname = heads.get("x-current-path")

  // disallow students to access the teacher's private routes 
  if (pathname?.startsWith("/t") && session?.user.role === UserRole.STUDENT) {
    return notFound()
  }

  return (
    <>
      <Header session={session} />
      <main className="container py-12">{children}</main>
    </>
  )
}
