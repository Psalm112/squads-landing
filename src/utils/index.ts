import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: Args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export const throttle = <Args extends unknown[]>(
  func: (...args: Args) => void,
  limit: number
) => {
  let inThrottle = false
  return function (this: unknown, ...args: Args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
