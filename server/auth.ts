import { PrismaAdapter } from "@auth/prisma-adapter"
import { type UserRole } from "@prisma/client"
import {
  getServerSession,
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
} from "next-auth"
import { type Adapter } from "next-auth/adapters"
import Credentials from "next-auth/providers/credentials"

import { signInWithCredentials } from "~/lib/auth"
import { db } from "./db"

/*
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: { id: string; role: UserRole } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: UserRole
  }
}

/*
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // expires in 1 day
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        role: token.role,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      return token
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return signInWithCredentials(credentials)
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  debug: true,
}

export const getServerAuthSession = () => getServerSession(authOptions)
