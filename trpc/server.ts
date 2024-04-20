import "server-only"

import { cache } from "react"
import { headers } from "next/headers"

import { createCaller } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"

/*
 * Wraps `createTRPCContext` helper and provides the required context to handle
 * a tRPC call from a RSC
 * */
const createContext = cache(() => {
  const heads = new Headers(headers())
  heads.set("x-trpc-source", "rsc")
  return createTRPCContext({ headers: heads })
})

export const api = createCaller(createContext)
