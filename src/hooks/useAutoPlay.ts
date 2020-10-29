import { useRef, useEffect } from 'react'

export default function useAutoPlay<T extends HTMLElement>(options: {
  cb: () => void
  duration: number
  autoPlay: boolean
}): void {
  const { cb, duration, autoPlay } = options

  const timer = useRef(0)

  useEffect(() => {
    if (autoPlay) {
      timer.current = window.setInterval(cb, duration)
    }
    return () => {
      clearInterval(timer.current)
    }
  }, [duration, cb, autoPlay])
}
