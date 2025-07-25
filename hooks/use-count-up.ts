"use client"

import { useState, useEffect, useRef } from "react"

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  suffix?: string
  onComplete?: () => void
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = "",
  onComplete,
}: UseCountUpProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const timeStartRef = useRef(0)
  const requestRef = useRef<number>()

  useEffect(() => {
    // Reset when end value changes
    countRef.current = start
    setCount(start)

    const animate = (timestamp: number) => {
      if (!timeStartRef.current) {
        timeStartRef.current = timestamp
      }

      const progress = Math.min((timestamp - timeStartRef.current) / duration, 1)
      const currentCount = progress * (end - start) + start

      // Update state with formatted value
      countRef.current = currentCount

      // Format the number with the specified number of decimal places
      setCount(currentCount)

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate)
      } else {
        if (onComplete) onComplete()
      }
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [start, end, duration, onComplete])

  // Format the count based on decimals and add suffix
  const formattedCount = count.toFixed(decimals) +" "+ suffix

  return formattedCount
}
