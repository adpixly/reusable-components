import { type RotationAnimation } from '../types/index'

export default function ChevronIconAnimation({
  className,
  direction,
  width = '16px',
  height = '16px'
}: RotationAnimation): JSX.Element {
  return (
    <span
      className={`icon_base_class__x5Y6z7A ${className} ${direction === 'up' ? 'icon_rotate_up_class__b8C9d0E' : ''} ${direction === 'left' ? 'icon_rotate_left_class__f1G2h3I' : ''} ${direction === 'right' ? 'icon_rotate_right_class__j4K5l6M' : ''} ${direction === 'down' ? 'icon_rotate_down_class__r3L0f1G' : ''}`}>
      <svg
        width='16'
        height='16'
        style={{ width, height, color: 'currentColor' }}
        data-testid='ad-icon'
        strokeLinejoin='round'
        viewBox='0 0 16 16'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z'
          fill='currentColor'></path>
      </svg>
    </span>
  )
}
