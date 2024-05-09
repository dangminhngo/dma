import { redirect } from "next/navigation"

import { Heading } from "~/components/ui/heading"
import { getServerAuthSession } from "~/server/auth"
import SettingsAccount from "./settings-account"

export default async function SettingsAccountPage() {
  const session = await getServerAuthSession()

  if (!session) {
    return redirect("/sign-in")
  }

  return (
    <div className="space-y-4">
      <Heading as="h1">Account</Heading>
      <SettingsAccount session={session} />
    </div>
  )
}
