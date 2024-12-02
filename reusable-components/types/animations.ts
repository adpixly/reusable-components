import type { IconProps } from './icons'

export interface CopyAnimation extends IconProps {
  children: string
  /** Give a class to the Icons to separate them from the text */
  space: string
  useTooltip?: boolean
  animationDuration?: number
  tooltipText?: string
  tooltipTextCopied?: string
  tooltipClass?: string
}

export interface RotationAnimation extends IconProps {
  direction?: 'up' | 'left' | 'right' | 'down'
}

export interface UseCopyProps {
  isCopied: boolean
  handleCopyClick: (text: string, duration?: number) => void
  startCall: (text: string, duration?: number) => void
}
