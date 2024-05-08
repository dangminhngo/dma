import Link from "next/link"

import Logo from "~/components/logo"
import SignIn from "./sign-in"
import { getServerAuthSession } from "~/server/auth"
import { redirect } from "next/navigation"

export default async function SignInPage({ searchParams }: { searchParams: { callbackUrl: string }}) {
  const session = await getServerAuthSession()
  if (session) return redirect("/")

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex w-[368px] flex-col items-center space-y-6 rounded-lg border p-6">
        <Logo className="h-20 w-20" />
        <div className="font-medium text-foreground/80">
          Continue with email and password
        </div>
        <div className="self-stretch">
          <SignIn callbackUrl={searchParams.callbackUrl} />
        </div>
        <div>
          Haven&apos;t an account?{" "}
          <Link href="/sign-up" className="font-medium hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
