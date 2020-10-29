import { ReactElement } from 'react'
interface SlideProps<T> {
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
declare function useSlider<T extends HTMLElement>(
  options?: OptionProps,
): SlideProps<T>
export { SlideProps, useSlider as default }
