import { useState } from 'react'
import { type UseCopyProps } from '../types/index'

export const useCopy = (): UseCopyProps => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = (text: string, duration: number = 1000): void => {
    void navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, duration)
    })
  }

  const startCall = (text: string, duration: number = 1000): void => {
    handleCopyClick(text, duration)
    window.location.href = `tel:${text}`
  }

  return { isCopied, handleCopyClick, startCall }
}
