import Tooltip from '../components/text-tooltip'
import { useCopy } from './utils'
import { CheckIcon, CopyIcon } from '../icons'
import { type CopyAnimation } from '../types/index'

export default function CopyIconAnimation({
  children,
  className,
  width = '14px',
  height = '14px',
  space,
  useTooltip = true,
  animationDuration,
  tooltipText,
  tooltipTextCopied,
  tooltipClass
}: CopyAnimation): JSX.Element {
  const { isCopied, handleCopyClick } = useCopy()

  const content = (
    <span
      aria-label='Copy Text'
      onClick={() => {
        handleCopyClick(children, animationDuration)
      }}
      className={`${className} content_container_class__u6V7w8X`}>
      <span className='text_content_class__y9Z0a1B'>{children}</span>
      <span className={space}>
        <CheckIcon
          width={width}
          height={height}
          className={`icon_transition_class__a1B2c3D ${isCopied ? 'icon_grow_class__i7J8k9L' : 'visibility_hidden_class__c2D3e4F icon_shrink_class__e4F5g6H'}`}
        />
        <CopyIcon
          width={width}
          height={height}
          className={`icon_transition_class__a1B2c3D icon_shrink_class__e4F5g6H ${isCopied ? 'visibility_hidden_class__c2D3e4F icon_shrink_class__e4F5g6H' : 'icon_grow_class__i7J8k9L'}`}
        />
      </span>
    </span>
  )

  return useTooltip ? (
    <Tooltip text={`${isCopied ? tooltipTextCopied : tooltipText}`} textClassName={tooltipClass}>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
