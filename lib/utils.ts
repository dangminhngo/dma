import { clsx, type ClassValue } from "clsx"
import { formatDate, secondsToMinutes } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertTime(secs: number) {
  const min = secondsToMinutes(secs)

  return {
    min: String(min).padStart(2, "0"),
    sec: String(secs - min * 60).padStart(2, "0")
  }
}

export function formatDateTime(dt: Date | string | number, format?: string) {
  return formatDate(dt, format ?? "yyyy/MM/dd - HH:mm:SS")
}
