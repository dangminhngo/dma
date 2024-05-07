import Link from "next/link"
import { type Session } from "next-auth"

import AuthUser from "./auth-user"
import Logo from "./logo"
import Nav from "./nav"

interface HeaderProps {
  session?: Session | null
}

export default function Header({ session }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between space-x-8">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Logo className="h-12 w-12" />
          </Link>
          {session?.user && <Nav user={session.user} />}
        </div>
        {session?.user && <AuthUser user={session.user} />}
      </div>
    </header>
  )
}
