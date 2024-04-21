import Link from "next/link"

import Logo from "~/components/logo"
import SignUp from "./sign-up"

export default function SignUpPage() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex w-[368px] flex-col items-center space-y-6 rounded-lg border p-6">
        <Logo className="h-20 w-20" />
        <div className="font-medium text-foreground/80">
          Create account with the following information
        </div>
        <div className="self-stretch">
          <SignUp />
        </div>
        <div>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
