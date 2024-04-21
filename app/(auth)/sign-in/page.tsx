import Link from "next/link"

import Logo from "~/components/logo"
import SignIn from "./sign-in"

export default function SignInPage() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex w-[368px] flex-col items-center space-y-6 rounded-lg border p-6">
        <Logo className="h-20 w-20" />
        <div className="font-medium text-foreground/80">
          Continue with email and password
        </div>
        <div className="self-stretch">
          <SignIn />
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
