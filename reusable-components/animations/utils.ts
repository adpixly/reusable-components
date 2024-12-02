import { useState } from 'react'
import type { UseCopyProps } from '../types/index'

export const useCopy = (): UseCopyProps => {
  const [isCopied, setIsCopied] = useState(false)

  const defaultDuration = 1000

  const handleCopyClick = (text: string, duration = defaultDuration): void => {
    void navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, duration)
    })
  }

  const startCall = (text: string, duration = defaultDuration): void => {
    handleCopyClick(text, duration)
    window.location.href = `tel:${text}`
  }

  return { isCopied, handleCopyClick, startCall }
}
