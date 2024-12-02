import { useState } from 'react'
import { Transition } from '@headlessui/react'

interface TooltipProps {
  text: string
  children: React.ReactNode
  className?: string
  textClassName?: string
  bg?: 'dark' | 'light' | null
  size?: 'sm' | 'md' | 'lg' | 'none'
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function TextTooltip({
  text,
  children,
  className = '',
  textClassName = '',
  bg = null,
  size = 'none',
  position = 'top'
}: TooltipProps): React.JSX.Element {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  type PositionOuter =
    | 'position_right_class__n7O8p9Q'
    | 'position_left_class__r0S1t2U'
    | 'position_bottom_class__v3W4x5Y'
    | 'position_top_class__z6A7b8C'

  const positionOuterClasses = (position: TooltipProps['position']): PositionOuter => {
    switch (position) {
      case 'right':
        return 'position_right_class__n7O8p9Q'
      case 'left':
        return 'position_left_class__r0S1t2U'
      case 'bottom':
        return 'position_bottom_class__v3W4x5Y'
      default:
        return 'position_top_class__z6A7b8C'
    }
  }

  type Size =
    | 'size_lg_class__d9E0f1G'
    | 'size_md_class__h2I3j4K'
    | 'size_sm_class__l5M6n7O'
    | 'size_none_class__p8Q9r0S'

  const sizeClasses = (size: TooltipProps['size']): Size => {
    switch (size) {
      case 'lg':
        return 'size_lg_class__d9E0f1G'
      case 'md':
        return 'size_md_class__h2I3j4K'
      case 'sm':
        return 'size_sm_class__l5M6n7O'
      default:
        return 'size_none_class__p8Q9r0S'
    }
  }

  type Color = 'background_light_class__t1U2v3W' | 'background_default_class__b7C8d9E'

  const colorClasses = (bg: TooltipProps['bg']): Color => {
    switch (bg) {
      case 'light':
        return 'background_light_class__t1U2v3W'
      case 'dark':
        return 'background_light_class__t1U2v3W'
      default:
        return 'background_default_class__b7C8d9E'
    }
  }

  type Position =
    | 'margin_right_class__j3K4l5M'
    | 'margin_left_class__f0G1h2I'
    | 'margin_top_class__n6O7p8Q'
    | 'margin_bottom_class__r9S0t1U'

  const positionInnerClasses = (position: TooltipProps['position']): Position => {
    switch (position) {
      case 'right':
        return 'margin_right_class__j3K4l5M'
      case 'left':
        return 'margin_left_class__f0G1h2I'
      case 'bottom':
        return 'margin_top_class__n6O7p8Q'
      default:
        return 'margin_bottom_class__r9S0t1U'
    }
  }

  return (
    <div className={`flex_container_class__t0U1v2W ${className}`}>
      <div className='relative_container_class__x3Y4z5A'>
        <button
          onMouseEnter={() => {
            setTooltipOpen(true)
          }}
          onMouseLeave={() => {
            setTooltipOpen(false)
          }}
          onFocus={() => {
            setTooltipOpen(true)
          }}
          onBlur={() => {
            setTooltipOpen(false)
          }}
          className='inline_button_class__b6C7d8E'
          aria-haspopup='true'
          aria-expanded={tooltipOpen}
          onClick={e => {
            e.preventDefault()
          }}>
          {children}
        </button>
        <div className={`tooltip_container_class__f9G0h1I ${positionOuterClasses(position)}`}>
          <Transition
            as='div'
            show={tooltipOpen}
            className={`tooltip_transition_class__b8E3d5I ${sizeClasses(size)} ${colorClasses(bg)} ${positionInnerClasses(position)}`}
            enter='tooltip_transition_enter_class__v2W3x4Y'
            enterFrom='tooltip_transition_enter_from_class__z5A6b7C'
            enterTo='tooltip_transition_enter_to_class__d8E9f0G'
            leave='tooltip_transition_leave_class__h1I2j3K'
            leaveFrom='tooltip_transition_leave_from_class__l4M5n6O'
            leaveTo='tooltip_transition_leave_to_class__p7Q8r9S'
            unmount={false}>
            <p className={`${textClassName} tooltip_text_class__j2K3l4M`}>{text}</p>
          </Transition>
        </div>
      </div>
    </div>
  )
}
