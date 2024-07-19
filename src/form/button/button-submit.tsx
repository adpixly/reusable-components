import { type SubmitProps } from '../../types/index'
import { LoaderCircleAnimation } from '../../animations'

function ButtonSubmit({
  sent,
  preserveStyles = true,
  handleSubmit,
  classOnSent,
  className,
  placeholder = 'Submit',
  LoaderIcon
}: SubmitProps): JSX.Element {
  let pClassName: string | undefined = className,
    pClassOnSent: string | undefined = classOnSent

  if (preserveStyles) {
    pClassName = `button_class__b5T7y1X ${className}`
    pClassOnSent = `class_on_sent_class__c7H4m2L ${classOnSent}`
  }

  const Icon: React.FC<{ className?: string }> = LoaderIcon ?? LoaderCircleAnimation
  return (
    <button
      type='button'
      className={`${pClassName} ${sent ? pClassOnSent : ''}`}
      onClick={e => {
        e.preventDefault()
        void handleSubmit?.()
      }}>
      {sent ? (
        <>
          <span className='invisible_text_class__i2K9p3R'>{placeholder}</span>
          <Icon className='loader_class__l8P5n6T' />
        </>
      ) : (
        placeholder
      )}
    </button>
  )
}

ButtonSubmit.displayName = 'ButtonSubmit'

export default ButtonSubmit
