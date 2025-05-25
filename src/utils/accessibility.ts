// export const accessibilityUtils = {
//   // Screen reader announcements
//   announceToScreenReader: (message: string) => {
//     const announcement = document.createElement('div')
//     announcement.setAttribute('aria-live', 'polite')
//     announcement.setAttribute('aria-atomic', 'true')
//     announcement.className = 'sr-only'
//     announcement.textContent = message

//     document.body.appendChild(announcement)

//     setTimeout(() => {
//       document.body.removeChild(announcement)
//     }, 1000)
//   },

//   // Focus management
//   trapFocus: (element: HTMLElement) => {
//     const focusableElements = element.querySelectorAll(
//       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//     )
//     const firstElement = focusableElements[0] as HTMLElement
//     const lastElement = focusableElements[
//       focusableElements.length - 1
//     ] as HTMLElement

//     const handleTabKey = (e: KeyboardEvent) => {
//       if (e.key === 'Tab') {
//         if (e.shiftKey) {
//           if (document.activeElement === firstElement) {
//             lastElement.focus()
//             e.preventDefault()
//           }
//         } else {
//           if (document.activeElement === lastElement) {
//             firstElement.focus()
//             e.preventDefault()
//           }
//         }
//       }
//     }

//     element.addEventListener('keydown', handleTabKey)
//     return () => element.removeEventListener('keydown', handleTabKey)
//   },
// }

// // src/utils/performance.ts
// export const performanceUtils = {
//   // Lazy load images
//   lazyLoadImage: (src: string): Promise<HTMLImageElement> => {
//     return new Promise((resolve, reject) => {
//       const img = new Image()
//       img.onload = () => resolve(img)
//       img.onerror = reject
//       img.src = src
//     })
//   },

//   // Debounce function for scroll/resize events
//   debounce: <T extends (...args: any[]) => any>(
//     func: T,
//     wait: number
//   ): ((...args: Parameters<T>) => void) => {
//     let timeout: NodeJS.Timeout
//     return (...args: Parameters<T>) => {
//       clearTimeout(timeout)
//       timeout = setTimeout(() => func(...args), wait)
//     }
//   },

//   // Check if user prefers reduced motion
//   prefersReducedMotion: (): boolean => {
//     return window.matchMedia('(prefers-reduced-motion: reduce)').matches
//   },

//   // Performance observer for measuring component render time
//   measureRenderTime: (componentName: string) => {
//     if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
//       const observer = new PerformanceObserver((list) => {
//         const entries = list.getEntries()
//         entries.forEach((entry) => {
//           console.log(`${componentName} render time:`, entry.duration)
//         })
//       })

//       observer.observe({ entryTypes: ['measure'] })
//       performance.mark(`${componentName}-start`)

//       return () => {
//         performance.mark(`${componentName}-end`)
//         performance.measure(
//           componentName,
//           `${componentName}-start`,
//           `${componentName}-end`
//         )
//       }
//     }
//     return () => {}
//   },
// }
