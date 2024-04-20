import { type RouteHandler } from "next/dist/server/base-server"
import NextAuth from "next-auth/next"

import { authOptions } from "~/server/auth"

const handler = NextAuth(authOptions) as RouteHandler

export { handler as GET, handler as POST }
