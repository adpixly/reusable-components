import { type ButtonHTMLAttributes, type MutableRefObject } from 'react'

export type FormData = Record<string, string>
export type FormErrors = Record<string, string | null>
export type UpdateErrorMessage = (name: string, message: string | null) => void
export type UpdateInputBorders = (prefixSufix: '' | 'prefix' | 'sufix') => void
export type ErrorMessagesType = Record<string, string>

export interface PrefixSufixErrors {
  prefix: string | null
  sufix: string | null
}

export interface ComponentStyles {
  /** Styles that wont be modified even if there is a message */
  generalStyles?: string
  /** Styles that will be modified if there is a message */
  nonErrorStyles?: string
  /** Styles that will be applied if there is a message */
  errorStyles?: string
}

export interface ButtonStyles {
  /** Styles that wont be modified even if it's on sent */
  generalStyles?: string
  /** Styles that will be applied if there is not on sent */
  nonSentStyles?: string
  /** Styles that will be applied if it's on sent */
  sentStyles?: string
  /** Set a background color, it will be set as the color of the loader */
  loaderColor?: string
}

export interface Styles {
  inputStyles?: ComponentStyles
  selectStyles?: ComponentStyles
  textAreaStyles?: ComponentStyles
  buttonStyles?: ButtonStyles
}

export interface FormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode
  onSubmit: (data: FormData, submissionStatus: SubmissionStatus) => void
  requestConfig?: RequestConfig
  styles?: Styles
}

export interface SubmissionStatus {
  error: boolean
  errorMessage?: string
  message: string
  serverMessage?: string
}

export interface RequestConfig {
  fetchConfig: RequestInit
  url: string
  timeout?: number
  timeoutResponse?: string
  errorResponse?: string
  successResponse?: string
  /** @deprecated This variable is no longer usable; you can give a response directly from the server. */
  internalServerErrorResponse?: string
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  id: string
  name: string
  inputClass?: string
  errorInputClass?: string
  label?: string
  labelClass?: string
  required?: boolean
  symbolRequired?: string
  symbolRequiredClass?: string
  errorMessageWrong?: string
  errorMessageRequired?: string
  errorClass?: string
  validationPattern?: RegExp
  formatPhone?: boolean
  updateErrorMessage?: (name: string, message: string | null) => void
  currentErrorMessage?: FormErrors
  requiredMessages?: MutableRefObject<FormErrors>
  formData?: MutableRefObject<FormData>
  prefix?: React.ReactNode | string
  prefixClass?: string
  sufix?: React.ReactNode | string
  sufixClass?: string
  prefixAndSufixContainerClass?: string
  preserveStyles?: boolean
  errorContainerClass?: string
  clue?: string
  clueClass?: string
  styles?: Styles
  nonErrorInputClass?: string
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  name: string
  textareaClass?: string
  errorTextareaClass?: string
  label?: string
  labelClass?: string
  required?: boolean
  symbolRequired?: string
  symbolRequiredClass?: string
  errorMessageWrong?: string
  errorMessageRequired?: string
  errorClass?: string
  validationPattern?: RegExp
  formatPhone?: boolean
  updateErrorMessage?: (name: string, message: string | null) => void
  currentErrorMessage?: FormErrors
  requiredMessages?: MutableRefObject<FormErrors>
  formData?: MutableRefObject<FormData>
  preserveStyles?: boolean
  errorContainerClass?: string
  clue?: string
  clueClass?: string
  styles?: Styles
  nonErrorTextareaClass?: string
}

interface OptionImage {
  src: string
  alt: string
}

interface OptionLabel {
  mainText: string
  mainTextColorClass?: string
  secondaryText?: string
  secondaryTextColorClass?: string
}

export interface SelectOption {
  image?: OptionImage
  label: OptionLabel
  value: string
}

/** @deprecated Use SelectSetting instead. */
export interface Settings {
  listStyle?: string
  name: string
  nameStyle?: string
  topOptions?: SelectOption[]
  options: SelectOption[]
}

export interface SelectSettings {
  listStyle?: string
  name: string
  nameStyle?: string
  topOptions?: SelectOption[]
  options: SelectOption[]
}

export interface SelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  name: string
  buttonClass?: string
  errorButtonClass?: string
  label?: string
  labelClass?: string
  placeholder: string
  required?: boolean
  symbolRequired?: string
  symbolRequiredClass?: string
  errorMessageWrong?: string
  errorMessageRequired?: string
  validationPattern?: RegExp
  errorClass?: string
  separatorClass?: string
  imageHeight?: number
  imageWidth?: number
  imageClass?: string
  dropdownClass?: string
  settings: SelectSettings
  updateErrorMessage?: (name: string, message: string | null) => void
  updateParentError?: (name: string, message: string | null) => void
  currentErrorMessage?: FormErrors
  requiredMessages?: MutableRefObject<FormErrors>
  formData?: MutableRefObject<FormData>
  asSufix?: boolean
  asPrefix?: boolean
  preserveStyles?: boolean
  errorContainerClass?: string
  clue?: string
  clueClass?: string
  styles?: Styles
  nonErrorButtonClass?: string
  updateParentBorders?: (prefixSufix: '' | 'prefix' | 'sufix') => void
  inputBorder?: boolean
  parentErrorMessage?: string | null
}

export interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  sent?: boolean
  handleSubmit?: () => Promise<void>
  generalClass?: string
  sentClass?: string
  nonSentClass?: string
  placeholder?: string
  LoaderIcon?: React.FC
  preserveStyles?: boolean
  styles?: Styles
  loaderColor?: string
  loaderWidth?: string
  loaderHeight?: string
}
