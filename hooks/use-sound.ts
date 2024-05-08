import { useMemo } from "react"

export function useSound({ url }: { url: string | null }) {
  const audio = useMemo(
    () =>
      typeof Audio !== undefined ? new Audio(url ?? undefined) : undefined,
    [url]
  )

  function play() {
    audio?.play().catch((err) => console.error(err))
  }

  return { play }
}
