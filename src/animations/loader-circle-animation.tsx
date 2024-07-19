import { type IconProps } from '../types/index'

export default function LoaderCircleAnimation({ className, width = '16px', height = '16px' }: IconProps): JSX.Element {
  return (
    <div className={className} style={{ width, height }}>
      <div className='spinner_spinner_class__l6M7n8O' style={{ width, height }}>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
        <div className='spinner_bar_class__p9Q0r1S'></div>
      </div>
    </div>
  )
}
