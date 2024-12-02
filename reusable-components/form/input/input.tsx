import React, { useState, useRef, useEffect, useCallback, type MutableRefObject } from 'react'
import type {
  FormData,
  ErrorMessagesType,
  InputProps,
  SelectProps,
  UpdateErrorMessage,
  PrefixSufixErrors,
  ComponentStyles,
  UpdateInputBorders
} from '../../types/index'
import Link from 'next/link'

const defaultPatterns: Record<string, RegExp> = {
  name: /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+(?:[-'][a-zA-Z\u00C0-\u024F\u0400-\u04FF]+)*$/,
  surname: /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+(?:[-'\s][a-zA-Z\u00C0-\u024F\u0400-\u04FF]+)*$/,
  fullName: /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+(?:[-'\s][a-zA-Z\u00C0-\u024F\u0400-\u04FF]+)*$/,
  email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,15}$/,
  tel: /^(?:\d{3}-\d{4}|\d{4}-\d{4}|\d \d{3}-\d{5}|\(\d{3}\) \d{3}-\d{4}|\d \(\d{3}\) \d{3}-\d{4}|\d{2} \(\d{3}\) \d{3}-\d{4}|\d{3} \(\d{3}\) \d{3}-\d{4}|\d \d{3} \(\d{3}\) \d{3}-\d{4}|\d{2} \d{3} \(\d{3}\) \d{3}-\d{4}|\d{7,15})$/,
  countryCode: /^\+\s[0-9]{1,4}$/,
  url: /^((http|https):\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-z]{1,10}$/,
  password:
    /^(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~].*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{12,64}$/,
  genericPattern: /.*/
}

const defaultErrorMessagesRequired: ErrorMessagesType = {
  name: 'What is your first name?',
  surname: 'What is your last name?',
  fullName: 'What is your full name?',
  email: 'Please enter your email',
  tel: 'In case we need to contact you',
  countryCode: 'What is your country',
  url: "What is your website's url",
  message: 'Enter your message here',
  password: 'Create your password',
  confirmPassword: 'Repeat your password'
}

const defaultErrorMessagesWrong: ErrorMessagesType = {
  name: 'Enter a valid first name',
  surname: 'Enter a valid last name',
  fullName: 'Enter a valid full name',
  email: 'Enter a valid email',
  tel: 'Enter a valid phone number',
  countryCode: 'Enter a valid country code',
  url: 'Enter a valid url',
  password: 'Create a valid password',
  confirmPassword: "The passwords doesn't match"
}

function validateField(
  required: boolean,
  name: string,
  value: string,
  formData?: MutableRefObject<FormData>,
  customPattern?: RegExp,
  errorMessageWrong?: string,
  errorMessageRequired?: string
): string | null {
  if (required && (value === '' || value === null || value === undefined)) {
    return errorMessageRequired ?? defaultErrorMessagesRequired[name] ?? 'This field is required'
  }

  if (name === 'confirmPassword') {
    const passwordValue = formData?.current.password
    if (passwordValue !== value) {
      return errorMessageWrong ?? defaultErrorMessagesWrong[name]
    }
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

const isReactComponent = (value: any): value is React.ElementType =>
  typeof value === 'function' ||
  (typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'function')

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
  type,
  recover,
  recoverClass,
  recoverLink = '',
  labelRecoverContainerClass = '',
  ...inputProps
}: InputProps): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(currentErrorMessage?.[name])
  const [childrenError, setChildrenError] = useState<PrefixSufixErrors>({ prefix: null, sufix: null })
  const [borders, setBorders] = useState<'' | 'prefix' | 'sufix'>('')
  const [inputBorder, setInputBorder] = useState<boolean>(false)

  const isThereError = useRef(false)
  const errorBlur = useRef<string | null>(null)

  function getDeveloperStack(): string | null {
    const { stack } = new Error()
    if (!stack) return null

    const stackFrames = stack
      .split('\n')
      .filter(line => !line.includes('node_modules') && !line.includes('Input') && !line.includes('getDeveloperStack'))

    return stackFrames[0]?.trim() ?? null
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const formValues = formData?.current ?? {}

      if (name === 'confirmPassword' && !('password' in formValues)) {
        const developerStack = getDeveloperStack()

        throw new Error(`
          Input Error: The 'confirmPassword' input requires a corresponding 'password' input.

          Make sure to include an input with:
          - name: 'password'
          - type: 'password'

          Make sure that the input with name='password' renders before the input with name='confirmPassword'.

          Source: ${developerStack || 'Could not determine the source of the issue.'}
        `)
      }
    }
  }, [name, formData])

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
    prefixAndSufixContainer: prefixAndSufixContainerClass,
    recover: recoverClass,
    labelContainer: labelRecoverContainerClass
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
    baseClasses.recover = `recover_password_class__n4D6e7Q ${baseClasses.recover}`
    baseClasses.labelContainer = `label_container_class__w4G2t5B ${baseClasses.labelContainer}`
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
    prefixAndSufixContainer: pPrefixAndSufixContainerClass,
    recover: pRecoverClass,
    labelContainer: pLabelContainerClass
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
      formData,
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
        formData,
        validationPattern,
        errorMessageWrong,
        errorMessageRequired
      )

      errorBlur.current = error

      if (error !== null) {
        isThereError.current = true
      }

      setErrorMessage(error)
      updateErrorMessage?.(name, error)
      setInputBorder(false)
    },
    [required, name, validationPattern, errorMessageWrong, errorMessageRequired, updateErrorMessage]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'tel' && formatPhone) {
        event.target.value = formatPhoneValue(event.target.value)
      }

      if (isThereError.current) {
        const error = validateField(
          required,
          name,
          event.target.value,
          formData,
          validationPattern,
          errorMessageWrong,
          errorMessageRequired
        )

        if (error !== errorBlur.current) {
          setErrorMessage(error)
          updateErrorMessage?.(name, error)
        }
      }

      const { value } = event.target

      if (formData !== undefined) {
        formData.current[name] = value
      }
    },
    [name, formatPhone, formData]
  )

  const cloneInputChildren = useCallback(
    (children: React.ReactNode): React.ReactNode =>
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      React.Children.map(children, child => {
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

        if (child.props.children !== undefined) {
          return React.cloneElement(child, {
            children: cloneInputChildren(child.props.children as React.ReactNode)
          })
        }
        return child
      }),
    [currentErrorMessage, inputBorder, errorMessage]
  )

  const alreadyHasStyles = useCallback(
    (children: React.ReactNode, componentNames: string[]): boolean =>
      React.Children.toArray(children).some(child => {
        if (React.isValidElement(child) && isCustomComponent(child)) {
          const displayName = (child.type as any).displayName as string | undefined
          return displayName !== undefined && componentNames.includes(displayName)
        }
        return false
      }),
    []
  )

  const input = (
    <input
      onFocus={() => {
        setInputBorder(true)
      }}
      aria-required={required}
      id={id}
      name={name}
      type={type}
      className={`${pInputClass} ${errorMessage !== null && errorMessage !== undefined ? pErrorInputClass : pNonErrorInputClass}`}
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
      {label &&
        (recover ? (
          <div className={pLabelContainerClass}>
            <label className={pLabelClass} htmlFor={id}>
              {label}
              {required && <span className={pSymbolRequiredClass}>{symbolRequired}</span>}
              {clue && <span className={pClueClass}>{clue}</span>}
            </label>
            <Link href={recoverLink} className={pRecoverClass}>
              {recover}
            </Link>
          </div>
        ) : (
          <label className={pLabelClass} htmlFor={id}>
            {label}
            {required && <span className={pSymbolRequiredClass}>{symbolRequired}</span>}
            {clue && <span className={pClueClass}>{clue}</span>}
          </label>
        ))}
      {prefix || sufix ? (
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
