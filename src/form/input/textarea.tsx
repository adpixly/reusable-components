import React, { useState, useEffect, useCallback } from 'react'
import { type ErrorMessagesType, type TextAreaProps, type InputStyles } from '../../types/index'

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

function Textarea({
  id,
  name,
  className,
  textareaClass = '',
  errorTextareaClass = '',
  nonErrorInputClass = '',
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
  preserveStyles = true,
  defaultValue = '',
  clue = '',
  clueClass = '',
  styles,
  rows = 4,
  ...inputProps
}: TextAreaProps): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(currentErrorMessage?.[name])

  const pStyles: InputStyles = {
    generalStyles: styles?.textAreaStyles?.generalStyles ?? '',
    nonErrorStyles: styles?.textAreaStyles?.nonErrorStyles ?? '',
    errorStyles: styles?.textAreaStyles?.errorStyles ?? ''
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
    inputBorder: ''
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
  }

  const {
    input: pInputClass,
    errorInput: pErrorInputClass,
    nonErrorInput: pNonErrorInputClass,
    label: pLabelClass,
    symbolRequired: pSymbolRequiredClass,
    clue: pClueClass,
    error: pErrorClass,
    errorContainer: pErrorContainerClass
  } = baseClasses

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
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
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
    },
    [required, name, validationPattern, errorMessageWrong, errorMessageRequired, updateErrorMessage]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value

      if (formData !== undefined) {
        formData.current[name] = value
      }
    },
    [name, formatPhone, formData]
  )

  return (
    <div className={className}>
      {label !== undefined && (
        <label className={pLabelClass} htmlFor={id}>
          {label}
          {required && <span className={pSymbolRequiredClass}>{symbolRequired}</span>}
          {clue !== undefined && clue !== null && <span className={pClueClass}>{clue}</span>}
        </label>
      )}
      <textarea
        aria-required={required}
        id={id}
        name={name}
        className={`${pInputClass} ${errorMessage !== null && errorMessage !== undefined ? pErrorInputClass : pNonErrorInputClass}`}
        {...inputProps}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={defaultValue}
        rows={rows}
      />
      <div className={pErrorContainerClass}>
        <span aria-live='assertive' className={pErrorClass}>
          {errorMessage}
        </span>
      </div>
    </div>
  )
}

Textarea.displayName = 'Textarea'

export default Textarea
