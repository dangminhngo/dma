import { redirect } from "next/navigation"

import { Heading } from "~/components/ui/heading"
import { getServerAuthSession } from "~/server/auth"
import SettingsProfile from "./settings-profile"

export default async function SettingsProfilePage() {
  const session = await getServerAuthSession()

  if (!session) {
    return redirect("/sign-in")
  }

  return (
    <div className="space-y-4">
      <Heading as="h1">Public Profile</Heading>
      <SettingsProfile session={session} />
    </div>
  )
}
