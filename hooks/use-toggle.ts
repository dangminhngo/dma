import { useState } from "react"

export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  function toggle() {
    setValue((val) => !val)
  }

  return [value, toggle]
}
