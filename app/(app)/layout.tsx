import Header from "~/components/header"
import { getServerAuthSession } from "~/server/auth"

export default async function AppLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const session = await getServerAuthSession()

  return (
    <>
      <Header session={session} />
      <main className="container py-12">{children}</main>
    </>
  )
}
