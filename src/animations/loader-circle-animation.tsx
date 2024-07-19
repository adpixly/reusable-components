import { type IconProps } from '../types/index'

export default function LoaderCircleAnimation({
  className,
  color = 'spinner_color_class__l1S3x0W',
  width = '16px',
  height = '16px'
}: IconProps): JSX.Element {
  return (
    <div className={className} style={{ width, height }}>
      <div className='spinner_spinner_class__l6M7n8O' style={{ width, height }}>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
        <div className={`${color} spinner_bar_class__p9Q0r1S`}></div>
      </div>
    </div>
  )
}
