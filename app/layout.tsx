import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import { Toaster } from "~/components/ui/toaster"
import Providers from "./providers"

import "~/styles/globals.css"

import { getServerAuthSession } from "~/server/auth"

const sans = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DMA",
  description: "Knowledge is your future",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerAuthSession()
  return (
    <html lang="en">
      <body className={sans.className}>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
