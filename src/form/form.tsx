import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  type FormProps,
  type FormErrors,
  type FormData,
  type InputProps,
  type UpdateErrorMessage,
  type SelectProps,
  type SubmitProps,
  type TextAreaProps
} from '../types/index'

function useMountedRef(): React.MutableRefObject<boolean> {
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return mountedRef
}

function isCustomComponent<T>(
  element: React.ReactElement<T>
): element is React.ReactElement<T> & { type: { displayName?: string } } {
  return typeof element.type === 'function'
}

export default function Form({ children, requestConfig, onSubmit, className, styles }: FormProps): JSX.Element {
  const formData = useRef<FormData>({})
  const timeoutId = useRef<NodeJS.Timeout>()
  const requiredMessages = useRef<FormErrors>({})
  const abortController = useRef(new AbortController())
  const [errorMessages, setErrorMessages] = useState<FormErrors>({})
  const [sent, setSent] = useState<boolean>(false)
  const mountedRef = useMountedRef()

  const updateErrorMessage: UpdateErrorMessage = useCallback((inputName, message) => {
    setErrorMessages(prevErrors => ({ ...prevErrors, [inputName]: message }))
  }, [])

  const hasErrors = (errors: FormErrors): boolean => Object.values(errors).some(message => message)

  const handleSubmit: () => Promise<void> = useCallback(async () => {
    setSent(true)

    if (hasErrors(errorMessages)) {
      setSent(false)
      return
    }
    if (hasErrors(requiredMessages.current)) {
      setErrorMessages(requiredMessages.current)
      setSent(false)
      return
    }

    if (requestConfig === undefined || requestConfig === null) {
      setSent(false)
      typeof onSubmit === 'function'
        ? onSubmit(formData.current, { error: false, message: '' })
        : console.error('Form submission handler is not provided.')
    } else {
      const {
        fetchConfig,
        url,
        timeout = 10000,
        timeoutResponse = 'Connection time-out. Please check your internet connection and try again.',
        errorResponse = 'We experienced an internal server error; please try again later.',
        successResponse = 'Info sent succesfully'
      } = requestConfig

      abortController.current.abort()
      abortController.current = new AbortController()

      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current)
      }

      timeoutId.current = setTimeout(() => {
        abortController.current.abort()
      }, timeout)

      try {
        const response = await fetch(url, {
          ...fetchConfig,
          signal: abortController.current.signal,
          body: JSON.stringify(formData.current)
        })

        if (!mountedRef.current) {
          setSent(false)
          return
        }

        clearTimeout(timeoutId.current)

        const data = await response.json()

        if (data.error !== null && data.error !== undefined) {
          if (data.missingFields && data.fields !== null) {
            setSent(false)
            setErrorMessages(data.fields)
            return
          }

          onSubmit(formData.current, {
            error: true,
            errorMessage: data.error,
            message: errorResponse,
            serverMessage: data.message
          })
          throw new Error(data.error)
        }

        if (!response.ok) {
          onSubmit(formData.current, {
            error: true,
            message: errorResponse
          })
          throw new Error('Response is not ok')
        }

        if (data === null || data === undefined || typeof data !== 'object') {
          onSubmit(formData.current, {
            error: true,
            message: errorResponse
          })
          throw new Error('respose.json() is not an object')
        }

        if (typeof data.message === 'string') {
          onSubmit(formData.current, {
            error: false,
            message: successResponse,
            serverMessage: data.message
          })
          formData.current = {}
          setErrorMessages({})
          setSent(false)
        } else {
          onSubmit(formData.current, {
            error: true,
            message: errorResponse
          })
          throw new Error("Invalid response format from server: 'message' field is missing or not a string.")
        }
      } catch (error: unknown) {
        clearTimeout(timeoutId.current)
        console.error(error)

        if (error instanceof Error && error.name === 'AbortError') {
          onSubmit(formData.current, {
            error: true,
            message: timeoutResponse
          })
        }

        setSent(false)
      }
    }
  }, [errorMessages, requestConfig, onSubmit])

  const cloneInputChildren = useCallback(
    (children: React.ReactNode): React.ReactNode => {
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      return React.Children.map(children, child => {
        if (
          !React.isValidElement<InputProps>(child) ||
          !React.isValidElement<SelectProps>(child) ||
          !React.isValidElement<TextAreaProps>(child) ||
          !React.isValidElement<SubmitProps>(child)
        ) {
          return child
        }

        if (isCustomComponent(child)) {
          if (
            child.type.displayName === 'Input' ||
            child.type.displayName === 'Select' ||
            child.type.displayName === 'Textarea'
          ) {
            return React.cloneElement(child, {
              formData,
              requiredMessages,
              updateErrorMessage,
              currentErrorMessage: errorMessages,
              styles
            })
          }

          if (child.type.displayName === 'ButtonSubmit') {
            return React.cloneElement(child as React.ReactElement<SubmitProps>, {
              sent,
              handleSubmit
            })
          }
        }

        if (child.props?.children !== undefined) {
          return React.cloneElement(child, {
            children: cloneInputChildren(child.props.children as React.ReactNode)
          })
        }
        return child
      })
    },
    [errorMessages, sent]
  )

  return <form className={className}>{cloneInputChildren(children)}</form>
}
