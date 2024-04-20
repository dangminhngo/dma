"use client"

import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { TRPCReactProvider } from "~/trpc/react"

interface ProvidersProps extends React.PropsWithChildren {
  session?: Session | null
}

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  )
}
