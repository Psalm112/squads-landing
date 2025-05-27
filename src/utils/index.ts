import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// // Performance optimization utilities
// export const debounce = (func: Function, wait: number) => {
//   let timeout: NodeJS.Timeout
//   return function executedFunction(...args: any[]) {
//     const later = () => {
//       clearTimeout(timeout)
//       func(...args)
//     }
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//   }
// }

// export const throttle = (func: (...args: any[]) => void, limit: number) => {
//   let inThrottle = false
//   return (...args: any[]) => {
//     if (!inThrottle) {
//       func(...args)
//       inThrottle = true
//       setTimeout(() => {
//         inThrottle = false
//       }, limit)
//     }
//   }
// }
