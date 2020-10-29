import {
  useState,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react'

import './slider.scss'
import move from './utils/move'
import useAutoPlay from './hooks/useAutoPlay'
import useEvent from './hooks/useEvent'
import usePagination from './hooks/usePagination'
import useNavigation from './hooks/useNavigation'
import useInit from './hooks/useInit'
import useWindowSize from './hooks/useWindowSize'

export interface SlideProps<T> {
  ref: (instance: T) => void
  prev: () => void
  next: () => void
  moveTo: (index: number) => void
  curIndex: number
}

interface OptionProps {
  autoPlay?: boolean
  initial?: number
  duration?: number
  slidesPerView?: number
  speed?: number
  loop?: boolean
  pagination?: boolean | ((index: number) => ReactElement)
  navigation?: boolean
  arrowLeft?: ReactElement
  arrowRight?: ReactElement
}

export default function useSlider<T extends HTMLElement>(
  options: OptionProps = {},
): SlideProps<T> {
  const {
    speed = 300,
    initial = 0,
    autoPlay = false,
    duration = 3000,
    loop = false,
    slidesPerView = 1,
    pagination = false,
    navigation = false,
    arrowLeft,
    arrowRight,
  } = options

  const [container, setContainer] = useState<T | null>(null)

  const callbackRef = useCallback((instance: T) => {
    setContainer(instance)
  }, [])

  const [curIndex, setCurIndex] = useState(initial)

  const prev = useCallback(() => {
    setCurIndex((prev) => {
      if (!container) return prev

      if (!loop && prev === 0) return prev

      const slideWidth = container.clientWidth / slidesPerView

      const childrenNum = container.querySelectorAll('.slider-slide').length

      const newIndex = prev === 0 ? childrenNum - 1 : prev - 1

      let updatedIndex = prev

      while (updatedIndex <= 0) updatedIndex += childrenNum

      move({
        slideWidth,
        slidesPerView,
        container,
        loop,
        speed,
        leftStart: -prev * slideWidth,
        deltaX: slideWidth,
        curIndex: updatedIndex,
        rightStart: (childrenNum - prev) * slideWidth,
        animate: true,
      })

      return newIndex
    })
  }, [container, loop, slidesPerView, speed])

  const next = useCallback(() => {
    setCurIndex((prev) => {
      if (!container) return prev

      const childrenNum = container.querySelectorAll('.slider-slide').length

      if (!loop && prev >= childrenNum - slidesPerView) return prev

      const slideWidth = container.clientWidth / slidesPerView

      move({
        slideWidth,
        slidesPerView,
        container,
        loop,
        speed,
        leftStart: -prev * slideWidth,
        deltaX: -slideWidth,
        curIndex: prev,
        rightStart: (childrenNum - prev) * slideWidth,
        animate: true,
      })

      return (prev + 1) % childrenNum
    })
  }, [container, loop, slidesPerView, speed])

  const moveTo = useCallback(
    (index: number) => {
      setCurIndex((prev) => {
        if (!container) return prev

        const childrenNum = container.querySelectorAll('.slider-slide').length

        const slideWidth = container.clientWidth / slidesPerView

        move({
          slideWidth,
          slidesPerView,
          container,
          loop,
          speed,
          leftStart: -prev * slideWidth,
          deltaX: (prev - index) * slideWidth,
          curIndex: prev,
          rightStart: (childrenNum - prev) * slideWidth,
          animate: true,
        })

        return index
      })
    },
    [container, loop, slidesPerView, speed],
  )

  const windowSize = useWindowSize()
  useLayoutEffect(() => {
    moveTo(curIndex)
  }, [windowSize.width])

  useInit({
    container,
    setCurIndex,
    slidesPerView,
  })

  useEvent({
    container,
    curIndex,
    speed,
    setCurIndex,
    loop,
    slidesPerView,
  })

  useAutoPlay({
    cb: next,
    duration,
    autoPlay,
  })

  useNavigation({
    container,
    navigation,
    prev,
    next,
    arrowLeft,
    arrowRight,
  })

  usePagination({
    container,
    pagination,
    curIndex,
    moveTo,
  })

  return {
    ref: callbackRef,
    prev,
    next,
    moveTo,
    curIndex,
  }
}
