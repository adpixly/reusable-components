import React, { useState, useEffect, useCallback } from 'react'
import {
  type ErrorMessagesType,
  type InputProps,
  type SelectProps,
  type UpdateErrorMessage,
  type PrefixSufixErrors,
  type ComponentStyles,
  type UpdateInputBorders
} from '../../types/index'

const defaultPatterns: Record<string, RegExp> = {
  name: /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF]{2,15}$/,
  surname: /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF]{2,15}$/,
  email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,15}$/,
  phone:
    /^(?:\d{3}-\d{4}|\d{4}-\d{4}|\d \d{3}-\d{5}|\(\d{3}\) \d{3}-\d{4}|\d \(\d{3}\) \d{3}-\d{4}|\d{2} \(\d{3}\) \d{3}-\d{4}|\d{3} \(\d{3}\) \d{3}-\d{4}|\d \d{3} \(\d{3}\) \d{3}-\d{4}|\d{2} \d{3} \(\d{3}\) \d{3}-\d{4}|\d{7,15})$/,
  countryCode: /^\+\s[0-9]{1,4}$/,
  website: /^((http|https):\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-z]{1,10}$/,
  genericPattern: /.*/
}

const defaultErrorMessagesRequired: ErrorMessagesType = {
  name: 'What is your first name?',
  surname: 'What is your last name?',
  email: 'Please enter your email',
  phone: 'In case we need to contact you',
  countryCode: 'What is your country',
  website: "What is your website's url",
  message: 'Enter your message here'
}

const defaultErrorMessagesWrong: ErrorMessagesType = {
  name: 'Enter a valid first name',
  surname: 'Enter a valid last name',
  email: 'Enter a valid email',
  phone: 'Enter a valid phone number',
  countryCode: 'Enter a valid country code',
  website: 'Enter a valid url'
}

function validateField(
  required: boolean,
  name: string,
  value: string,
  customPattern?: RegExp,
  errorMessageWrong?: string,
  errorMessageRequired?: string
): string | null {
  if (required && (value === '' || value === null || value === undefined)) {
    return errorMessageRequired ?? defaultErrorMessagesRequired[name] ?? 'This field is required'
  }
  const pattern = customPattern ?? defaultPatterns[name] ?? defaultPatterns.genericPattern
  if (value !== '' && pattern !== undefined && !pattern.test(value ?? '')) {
    return errorMessageWrong ?? defaultErrorMessagesWrong[name] ?? 'Enter something valid'
  }
  return null
}

function isCustomComponent<T>(
  element: React.ReactElement<T>
): element is React.ReactElement<T> & { type: { displayName?: string } } {
  return typeof element.type === 'function'
}

function formatPhoneValue(value: string): string {
  const numericValue = value.replace(/\D/g, '').slice(0, 15)

  const formats = [
    { max: 7, pattern: /(\d{3})(\d{4})/, replacement: '$1-$2' },
    { max: 8, pattern: /(\d{4})(\d{4})/, replacement: '$1-$2' },
    { max: 9, pattern: /(\d{1})(\d{3})(\d{4})/, replacement: '$1 $2-$3' },
    { max: 10, pattern: /(\d{3})(\d{3})(\d{4})/, replacement: '($1) $2-$3' },
    { max: 11, pattern: /(\d{1})(\d{3})(\d{3})(\d{4})/, replacement: '$1 ($2) $3-$4' },
    { max: 12, pattern: /(\d{2})(\d{3})(\d{3})(\d{4})/, replacement: '$1 ($2) $3-$4' },
    { max: 13, pattern: /(\d{3})(\d{3})(\d{3})(\d{4})/, replacement: '$1 ($2) $3-$4' },
    { max: 14, pattern: /(\d{1})(\d{3})(\d{3})(\d{3})(\d{4})/, replacement: '$1 $2 ($3) $4-$5' },
    { max: 15, pattern: /(\d{2})(\d{3})(\d{3})(\d{3})(\d{4})/, replacement: '$1 $2 ($3) $4-$5' }
  ]
  const format = formats.find(f => numericValue.length <= f.max)
  return format !== undefined ? numericValue.replace(format.pattern, format.replacement) : numericValue
}

const isReactComponent = (value: any): value is React.ElementType => {
  return (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'function')
  )
}

function Input({
  id,
  name,
  className,
  inputClass,
  errorInputClass,
  nonErrorInputClass,
  label,
  labelClass = '',
  required = false,
  symbolRequiredClass = '',
  symbolRequired = ' *',
  validationPattern,
  errorClass = '',
  errorContainerClass = '',
  errorMessageWrong,
  errorMessageRequired,
  formatPhone = true,
  updateErrorMessage,
  currentErrorMessage,
  requiredMessages,
  formData,
  prefix,
  prefixClass = '',
  sufix,
  sufixClass = '',
  prefixAndSufixContainerClass = '',
  preserveStyles = true,
  defaultValue = '',
  clue = '',
  clueClass = '',
  styles,
  ...inputProps
}: InputProps): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(currentErrorMessage?.[name])
  const [childrenError, setChildrenError] = useState<PrefixSufixErrors>({ prefix: null, sufix: null })
  const [borders, setBorders] = useState<'' | 'prefix' | 'sufix'>('')
  const [inputBorder, setInputBorder] = useState<boolean>(false)

  const pStyles: ComponentStyles = {
    generalStyles: inputClass ?? styles?.inputStyles?.generalStyles ?? '',
    nonErrorStyles: nonErrorInputClass ?? styles?.inputStyles?.nonErrorStyles ?? '',
    errorStyles: errorInputClass ?? styles?.inputStyles?.errorStyles ?? ''
  }

  const baseClasses = {
    input: pStyles.generalStyles,
    errorInput: pStyles.errorStyles,
    nonErrorInput: pStyles.nonErrorStyles,
    label: labelClass,
    symbolRequired: symbolRequiredClass,
    clue: clueClass,
    error: errorClass,
    errorContainer: errorContainerClass,
    prefix: '',
    sufix: '',
    inputBorder: '',
    prefixAndSufixContainer: prefixAndSufixContainerClass
  }

  if (preserveStyles) {
    baseClasses.input = `input_class__e7M3p8L ${baseClasses.input}`
    baseClasses.errorInput = `input_error_class__t2R8k4N ${baseClasses.errorInput}`
    baseClasses.nonErrorInput = `input_non_error_class__e0S3p1F ${baseClasses.nonErrorInput}`
    baseClasses.label = `label_class__a4D9y1K ${baseClasses.label}`
    baseClasses.symbolRequired = `symbol_class__m6H2v7X ${baseClasses.symbolRequired}`
    baseClasses.clue = `clue_class__v2A0l4Y ${baseClasses.clue}`
    baseClasses.error = `error_class__p5T8r2B ${baseClasses.error}`
    baseClasses.errorContainer = `error_container_class__q3V7k9R ${baseClasses.errorContainer}`
    baseClasses.prefixAndSufixContainer = `prefix_and_sufix_container_class__h3I4j5K ${baseClasses.prefixAndSufixContainer}`
  }

  if (prefix != null || sufix != null) {
    baseClasses.prefix = prefixClass
    baseClasses.sufix = sufixClass

    if (
      (!inputBorder && (errorMessage === null || errorMessage === undefined) && childrenError.prefix !== null) ||
      borders === 'prefix'
    ) {
      baseClasses.inputBorder = 'input_prefix_border_class__j0A1b7W'
    }

    if (
      (!inputBorder && (errorMessage === null || errorMessage === undefined) && childrenError.sufix !== null) ||
      borders === 'sufix'
    ) {
      baseClasses.inputBorder = 'input_sufix_border_class__i3Q8e2L'
    }

    if (preserveStyles) {
      baseClasses.prefix = `prefix_sufix_class__v5K3p9Q prefix_class__r2W6j5L ${baseClasses.prefix}`
      baseClasses.sufix = `prefix_sufix_class__v5K3p9Q sufix_class__x8N4k2R ${baseClasses.sufix}`

      const inputPrefix = prefix != null ? 'input_prefix_class__g1M5r4T' : ''
      const inputSufix = sufix != null ? 'input_sufix_class__s9P2l6V' : ''

      baseClasses.input = `${baseClasses.inputBorder} ${inputPrefix} ${inputSufix} ${baseClasses.input}`
    }
  }

  const {
    input: pInputClass,
    errorInput: pErrorInputClass,
    nonErrorInput: pNonErrorInputClass,
    label: pLabelClass,
    symbolRequired: pSymbolRequiredClass,
    clue: pClueClass,
    error: pErrorClass,
    errorContainer: pErrorContainerClass,
    prefix: pPrefixClass,
    sufix: pSufixClass,
    prefixAndSufixContainer: pPrefixAndSufixContainerClass
  } = baseClasses

  const updateParentError: UpdateErrorMessage = useCallback((name, message) => {
    setChildrenError(prevErrors => ({ ...prevErrors, [name]: message }))
  }, [])

  const updateParentBorders: UpdateInputBorders = useCallback(sufixPrefix => {
    setBorders(sufixPrefix)
  }, [])

  useEffect(() => {
    if (formData !== undefined) {
      formData.current[name] = defaultValue !== undefined && defaultValue !== null ? defaultValue.toString() : ''
    }
  }, [name, defaultValue, formData])

  useEffect(() => {
    const defaultValue: string = formData?.current[name] ?? ''

    const error = validateField(
      required,
      name,
      defaultValue,
      validationPattern,
      errorMessageWrong,
      errorMessageRequired
    )

    if (requiredMessages !== undefined) {
      requiredMessages.current[name] = error
    }
  })

  useEffect(() => {
    setErrorMessage(currentErrorMessage?.[name])
  }, [currentErrorMessage?.[name]])

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const error = validateField(
        required,
        name,
        event.target.value,
        validationPattern,
        errorMessageWrong,
        errorMessageRequired
      )
      setErrorMessage(error)
      updateErrorMessage?.(name, error)
      setInputBorder(false)
    },
    [required, name, validationPattern, errorMessageWrong, errorMessageRequired, updateErrorMessage]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name === 'phone' && formatPhone) {
        event.target.value = formatPhoneValue(event.target.value)
      }

      const value = event.target.value

      if (formData !== undefined) {
        formData.current[name] = value
      }
    },
    [name, formatPhone, formData]
  )

  const cloneInputChildren = useCallback(
    (children: React.ReactNode): React.ReactNode => {
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      return React.Children.map(children, child => {
        if (!React.isValidElement<SelectProps>(child)) {
          return child
        }

        if (isCustomComponent(child)) {
          if (child.type.displayName === 'Select') {
            return React.cloneElement(child, {
              formData,
              requiredMessages,
              updateErrorMessage,
              updateParentError,
              currentErrorMessage,
              updateParentBorders,
              styles,
              inputBorder,
              parentErrorMessage: errorMessage
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
    [currentErrorMessage, inputBorder, errorMessage]
  )

  const alreadyHasStyles = useCallback((children: React.ReactNode, componentNames: string[]): boolean => {
    return React.Children.toArray(children).some(child => {
      if (React.isValidElement(child) && isCustomComponent(child)) {
        const displayName = (child.type as any).displayName as string | undefined
        return displayName !== undefined && componentNames.includes(displayName)
      }
      return false
    })
  }, [])

  const input = (
    <input
      onFocus={() => {
        setInputBorder(true)
      }}
      aria-required={required}
      id={id}
      name={name}
      className={`${pInputClass} ${errorMessage !== null && errorMessage !== undefined ? pErrorInputClass : pNonErrorInputClass}`}
      type='text'
      {...inputProps}
      onBlur={handleBlur}
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  )

  const render = (component: React.ReactNode | string, className?: string): React.ReactNode => {
    if (component === undefined || component === null) {
      return null
    }

    const styles = alreadyHasStyles(component, ['Select'])

    if (isReactComponent(component)) {
      if (styles) {
        return component
      }

      return <span className={className}>{component}</span>
    }

    if (typeof component === 'string') {
      return <span className={className}>{component}</span>
    }

    return null
  }

  return (
    <div className={className}>
      {label !== undefined && (
        <label className={pLabelClass} htmlFor={id}>
          {label}
          {required && <span className={pSymbolRequiredClass}>{symbolRequired}</span>}
          {clue !== undefined && clue !== null && <span className={pClueClass}>{clue}</span>}
        </label>
      )}
      {prefix !== undefined || sufix !== undefined ? (
        <div className={pPrefixAndSufixContainerClass}>
          {cloneInputChildren(render(prefix, pPrefixClass))}
          {input}
          {cloneInputChildren(render(sufix, pSufixClass))}
        </div>
      ) : (
        input
      )}
      <div className={pErrorContainerClass}>
        <span aria-live='assertive' className={pErrorClass}>
          {errorMessage ?? childrenError.prefix ?? childrenError.sufix}
        </span>
      </div>
    </div>
  )
}

Input.displayName = 'Input'

export default Input
