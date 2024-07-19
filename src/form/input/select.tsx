import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import {
  type SelectProps,
  type ErrorMessagesType,
  type Option,
  type Settings,
  type ComponentStyles
} from '../../types/index'
import ChevronIconAnimation from '../../animations/chevron-animation'
import { Transition } from '@headlessui/react'

const defaultPatterns: Record<string, RegExp> = {
  countryCode: /^\+\s[0-9]{1,4}$/,
  genericPattern: /.*/
}

const defaultErrorMessagesRequired: ErrorMessagesType = {
  countryCode: 'Choose your country'
}

const defaultErrorMessagesWrong: ErrorMessagesType = {
  countryCode: 'Enter a valid country'
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
    return errorMessageWrong ?? defaultErrorMessagesWrong[name] ?? 'Choose valid option'
  }
  return null
}

function findOptionByValue(settings: Settings, value: string): Option | undefined {
  const topOptionLabel = settings.topOptions?.find(option => option.label.mainText.trim() === value.trim())
  if (topOptionLabel !== undefined && topOptionLabel !== null) {
    return topOptionLabel
  }

  const optionLabel = settings.options.find(option => option.label.mainText.trim() === value.trim())
  if (optionLabel !== undefined && optionLabel !== null) {
    return optionLabel
  }

  const topOption = settings.topOptions?.find(option => option.value.trim() === value.trim())
  if (topOption !== undefined && topOption !== null) {
    return topOption
  }

  const option = settings.options.find(option => option.value.trim() === value.trim())
  return option
}

function Select({
  id,
  name,
  className,
  buttonClass,
  errorButtonClass,
  nonErrorButtonClass,
  label,
  labelClass = '',
  required = false,
  symbolRequiredClass = '',
  symbolRequired = ' *',
  validationPattern,
  errorClass = '',
  errorMessageWrong,
  errorMessageRequired,
  updateErrorMessage,
  currentErrorMessage,
  requiredMessages,
  formData,
  settings,
  placeholder,
  imageHeight = 14.28,
  imageWidth = 20,
  imageClass = '',
  separatorClass = '',
  asSufix = false,
  asPrefix = false,
  dropdownClass = '',
  preserveStyles = true,
  updateParentError,
  errorContainerClass = '',
  defaultValue = '',
  clue = '',
  clueClass = '',
  styles,
  inputBorder,
  parentErrorMessage,
  updateParentBorders,
  ...props
}: SelectProps): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(currentErrorMessage?.[name])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [srcImg, setSrc] = useState<string | undefined>(undefined)
  const [altImg, setAlt] = useState<string | undefined>(undefined)
  const [value, setValue] = useState<string | undefined>(undefined)
  const [border, setBorder] = useState<'' | 'prefix' | 'sufix'>('')
  const dropdown = useRef<HTMLDivElement | null>(null)
  const refButton = useRef<HTMLButtonElement | null>(null)

  const prefixSufix: '' | 'prefix' | 'sufix' = asPrefix ? 'prefix' : asSufix ? 'sufix' : ''

  const pStyles: ComponentStyles = {
    generalStyles: buttonClass ?? styles?.selectStyles?.generalStyles ?? '',
    nonErrorStyles: nonErrorButtonClass ?? styles?.selectStyles?.nonErrorStyles ?? '',
    errorStyles: errorButtonClass ?? styles?.selectStyles?.errorStyles ?? ''
  }

  const {
    topOptions,
    options,
    nameStyle = 'unique_name_color_class__d1E2f3G',
    listStyle = 'wrapper_default_color_class__p0Q1r2S'
  } = settings

  const baseClasses = {
    button: pStyles.generalStyles,
    errorButton: pStyles.errorStyles,
    nonErrorButton: pStyles.nonErrorStyles,
    label: labelClass,
    symbolRequired: symbolRequiredClass,
    clue: clueClass,
    error: errorClass,
    image: imageClass,
    separator: separatorClass,
    dropdown: dropdownClass,
    errorContainer: errorContainerClass,
    prefixBorder: 'select_prefix_border_none_class__o2J6x9Z',
    sufixBorder: 'select_sufix_border_none_class__w1Z8r0M'
  }

  if (preserveStyles) {
    baseClasses.button = `input_select_class__i1N2p3Q ${baseClasses.button}`
    baseClasses.errorButton = `input_error_class__t2R8k4N ${baseClasses.errorButton}`
    baseClasses.nonErrorButton = `input_non_error_class__e0S3p1F ${baseClasses.nonErrorButton}`
    baseClasses.label = `label_class__a4D9y1K ${baseClasses.label}`
    baseClasses.symbolRequired = `symbol_class__m6H2v7X ${baseClasses.symbolRequired}`
    baseClasses.clue = `clue_class__v2A0l4Y ${baseClasses.clue}`
    baseClasses.error = `error_class__p5T8r2B ${baseClasses.error}`
    baseClasses.image = `input_select_image_class__i4M5n6O ${baseClasses.image}`
    baseClasses.separator = `separator_line_class__d0E1f2G ${baseClasses.separator}`
    baseClasses.dropdown = `dropdown_menu_wrapper_class__t4U5v6W ${baseClasses.dropdown}`
    baseClasses.errorContainer = `error_container_class__q3V7k9R ${baseClasses.errorContainer}`

    if (asPrefix) {
      if (
        border === 'prefix' ||
        (errorMessage !== null &&
          errorMessage !== undefined &&
          (parentErrorMessage === null || parentErrorMessage === undefined) &&
          !inputBorder)
      ) {
        baseClasses.prefixBorder = ''
      }

      baseClasses.button = `button_as_prefix_sufix_class__b1Q2r3S prefix_class__r2W6j5L ${baseClasses.prefixBorder} ${baseClasses.button}`
    }

    if (asSufix) {
      if (
        border === 'sufix' ||
        ((errorMessage === null || errorMessage === undefined) &&
          (parentErrorMessage === null || parentErrorMessage === undefined))
      ) {
        baseClasses.sufixBorder = ''
      }

      baseClasses.button = `button_as_prefix_sufix_class__b1Q2r3S sufix_class__x8N4k2R ${baseClasses.sufixBorder} ${baseClasses.button}`
    }
  }

  const {
    button: pButtonClass,
    errorButton: pErrorButtonClass,
    nonErrorButton: pNonErrorButtonClass,
    label: pLabelClass,
    symbolRequired: pSymbolRequiredClass,
    clue: pClueClass,
    error: pErrorClass,
    image: pImageClass,
    separator: pSeparatorClass,
    dropdown: pDropdownClass,
    errorContainer: pErrorContainerClass
  } = baseClasses

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent): void => {
      const target = event.target as Node
      if (dropdown.current === null || refButton.current === null) return
      if (!dropdownOpen || dropdown.current.contains(target) || refButton.current.contains(target)) return
      validation(formData?.current[name] ?? '')
      setDropdownOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent): void => {
      if (!dropdownOpen || key !== 'Escape') return
      validation(formData?.current[name] ?? '')
      setDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  })

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

  useEffect(() => {
    const value: string = defaultValue.toString() ?? ''
    const option = findOptionByValue(settings, value)

    setSrc(option?.image?.src)
    setAlt(option?.image?.alt)
    setValue(option?.label.mainText ?? option?.value)

    const newDefaultValue = option?.value ?? ''

    if (formData !== undefined) {
      formData.current[name] = defaultValue !== undefined && defaultValue !== null ? newDefaultValue : ''
    }
  }, [name, defaultValue, formData])

  const validation = useCallback(
    (value: string): void => {
      const error = validateField(required, name, value, validationPattern, errorMessageWrong, errorMessageRequired)
      setErrorMessage(error)
      updateErrorMessage?.(name, error)
      updateParentError?.(prefixSufix, error)
    },
    [required, name, validationPattern, errorMessageWrong, errorMessageRequired, updateErrorMessage, updateParentError]
  )

  const handleSelection = useCallback(
    (option: Option) => {
      setSrc(option.image?.src)
      setAlt(option.image?.alt)
      setValue(option.label.mainText ?? option.value)

      const value = option.value

      if (formData !== undefined) {
        formData.current[name] = value
      }

      setDropdownOpen(false)

      validation(value)
    },
    [name, validation, formData]
  )

  const buttonSelect = (
    <>
      <button
        ref={refButton}
        id={id}
        name={name}
        type='button'
        className={`${pButtonClass} ${errorMessage !== null && errorMessage !== undefined ? pErrorButtonClass : pNonErrorButtonClass}`}
        {...props}
        onFocus={() => {
          if (updateParentBorders !== undefined) {
            updateParentBorders(prefixSufix)
          }
          setBorder(prefixSufix)
        }}
        onBlur={() => {
          if (updateParentBorders !== undefined) {
            updateParentBorders('')
          }
          setBorder('')
        }}
        onClick={e => {
          e.preventDefault()
          setDropdownOpen(!dropdownOpen)
          if (dropdownOpen) {
            validation(formData?.current[name] ?? '')
          }
        }}
        aria-expanded={dropdownOpen}>
        {srcImg !== undefined && altImg !== undefined ? (
          <>
            <span className='invisible_text_class__i2K9p3R'>{placeholder}</span>
            <Image src={srcImg} alt={altImg} height={imageHeight} width={imageWidth} className={pImageClass} />
          </>
        ) : (
          (value ?? placeholder)
        )}

        <ChevronIconAnimation
          className='chevron_icon_animation_class__g5H6i7J'
          direction={dropdownOpen ? 'up' : 'down'}
        />
      </button>
      <Transition
        as='div'
        ref={dropdown}
        show={dropdownOpen}
        className={pDropdownClass}
        enter='transition_appear_class__b0C1d2E'
        enterFrom='transition_appear_from_class__f3G4h5I'
        enterTo='transition_appear_to_class__j6K7l8M'
        leave='transition_disappear_class__n9O0p1Q'
        leaveFrom='transition_disappear_from_class__r2S3t4U'
        leaveTo='transition_disappear_to_class__v5W6x7Y'>
        <div className={`settings_title_class__z8A9b0C ${nameStyle}`}>{settings.name}</div>
        <ul className={`options_wrapper_class__h4I5j6K ${listStyle}`}>
          {topOptions
            ?.sort((a, b) => a.label.mainText.localeCompare(b.label.mainText))
            .map((option, index) => {
              return (
                <li
                  key={index}
                  tabIndex={0}
                  className='single_option_class__t3U4v5W'
                  onClick={() => {
                    handleSelection(option)
                  }}>
                  <div className='option_flex_wrapper_class__x6Y7z8A'>
                    {option.image !== undefined && (
                      <div className='image_wrapper_class__b9C0d1E'>
                        <Image
                          src={option.image.src}
                          alt={option.image.alt}
                          height={1}
                          width={1}
                          className='image_selector_class__f2G3h4I'
                        />
                      </div>
                    )}
                    <div className='text_wrapper_class__j5K6l7M'>
                      <p
                        className={`main_content_class__n8O9p0Q ${option.label.mainTextColorClass ?? 'main_content_default_color_class__r1S2t3U'}`}>
                        {option.label.mainText}
                      </p>
                      {option.label.secondaryText !== undefined && (
                        <p
                          className={`secondary_content_class__v4W5x6Y ${option.label.secondaryTextColorClass ?? 'secondary_content_default_color_class__z7A8b9C'}`}>
                          {option.label.secondaryText}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          {topOptions !== undefined && <hr className={pSeparatorClass} />}

          {options
            .sort((a, b) => a.label.mainText.localeCompare(b.label.mainText))
            .map((option, index) => {
              return (
                <li
                  tabIndex={0}
                  key={index}
                  className='single_option_class__t3U4v5W'
                  onClick={() => {
                    handleSelection(option)
                  }}>
                  <div className='option_flex_wrapper_class__x6Y7z8A'>
                    {option.image !== undefined && (
                      <div className='image_wrapper_class__b9C0d1E'>
                        <Image
                          src={option.image.src}
                          alt={option.image.alt}
                          height={1}
                          width={1}
                          className='image_selector_class__f2G3h4I'
                        />
                      </div>
                    )}
                    <div className='text_wrapper_class__j5K6l7M'>
                      <p
                        className={`main_content_class__n8O9p0Q ${option.label.mainTextColorClass ?? 'main_content_default_color_class__r1S2t3U'}`}>
                        {option.label.mainText}
                      </p>
                      {option.label.secondaryText !== undefined && (
                        <p
                          className={`secondary_content_class__v4W5x6Y ${option.label.secondaryTextColorClass ?? 'secondary_content_default_color_class__z7A8b9C'}`}>
                          {option.label.secondaryText}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
        </ul>
      </Transition>
    </>
  )

  const individualSelect = (
    <div className={className}>
      {label !== undefined && (
        <label className={pLabelClass} htmlFor={id}>
          {label}
          {required && <span className={pSymbolRequiredClass}>{symbolRequired}</span>}
          {clue !== undefined && clue !== null && <span className={pClueClass}>{clue}</span>}
        </label>
      )}
      <div className='button_container_class__p1Q2r3S'>{buttonSelect}</div>

      <div className={pErrorContainerClass}>
        <span aria-live='assertive' className={pErrorClass}>
          {errorMessage}
        </span>
      </div>
    </div>
  )

  if (asPrefix || asSufix) {
    return buttonSelect
  }

  return individualSelect
}

Select.displayName = 'Select'

export default Select
