import { type ButtonStyles, type SubmitProps } from '../../types/index'
import { LoaderCircleAnimation } from '../../animations'

function ButtonSubmit({
  sent,
  preserveStyles = true,
  handleSubmit,
  className,
  sentClass,
  nonSentClass,
  placeholder = 'Submit',
  LoaderIcon,
  styles,
  loaderColor,
  loaderWidth,
  loaderHeight,
  ...buttonProps
}: SubmitProps): JSX.Element {
  const pStyles: ButtonStyles = {
    generalStyles: className ?? styles?.selectStyles?.generalStyles ?? '',
    nonSentStyles: nonSentClass ?? styles?.selectStyles?.nonErrorStyles ?? '',
    sentStyles: sentClass ?? styles?.selectStyles?.errorStyles ?? '',
    loaderColor: loaderColor ?? styles?.selectStyles?.errorStyles ?? 'loader_color_class__i3W9x4P'
  }

  const baseClasses = {
    button: pStyles.generalStyles,
    sent: pStyles.sentStyles,
    nonSent: pStyles.nonSentStyles,
    loaderColor: pStyles.loaderColor
  }

  if (preserveStyles) {
    baseClasses.button = `button_class__b5T7y1X ${baseClasses.button}`
    baseClasses.sent = `sent_class__c7H4m2L ${baseClasses.sent}`
    baseClasses.nonSent = `non_sent_class__l0S3g5Q ${baseClasses.nonSent}`
  }

  const { button: pButtonClass, sent: pSentClass, nonSent: pNonSentClass, loaderColor: pLoaderColor } = baseClasses

  const Icon: React.FC<{ className?: string; color?: string; width?: string; height?: string }> =
    LoaderIcon ?? LoaderCircleAnimation
  return (
    <button
      {...buttonProps}
      type='button'
      className={`${pButtonClass} ${sent ? pSentClass : pNonSentClass}`}
      onClick={e => {
        e.preventDefault()
        void handleSubmit?.()
      }}>
      {sent ? (
        <>
          <span className='invisible_text_class__i2K9p3R'>{placeholder}</span>
          <Icon className='loader_class__l8P5n6T' width={loaderWidth} height={loaderHeight} color={pLoaderColor} />
        </>
      ) : (
        placeholder
      )}
    </button>
  )
}

ButtonSubmit.displayName = 'ButtonSubmit'

export default ButtonSubmit
