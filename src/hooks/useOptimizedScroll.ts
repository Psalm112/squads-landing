import { useState, useEffect, useCallback } from 'react'
import { throttle } from '../utils'

export function useOptimizedScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = useCallback(
    throttle(() => {
      setScrollY(window.scrollY)
      setIsScrolling(true)

      // Reset scrolling state after a delay
      setTimeout(() => setIsScrolling(false), 150)
    }, 16),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { scrollY, isScrolling }
}
