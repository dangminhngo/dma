import { useEffect } from "react"
import { AppTheme } from "@prisma/client"

export function useTheme(theme?: AppTheme) {
  useEffect(() => {
    console.log(theme)
    if (theme === AppTheme.DAY) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [theme])
}
