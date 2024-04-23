import { type Session } from "next-auth"

import AccountDanger from "./account-danger"
import AccountSecurity from "./account-security"

interface SettingsAccountProps {
  session: Session
}

export default function SettingsAccount({ session }: SettingsAccountProps) {
  return (
    <>
      <AccountSecurity session={session} />
      <AccountDanger session={session} />
    </>
  )
}
