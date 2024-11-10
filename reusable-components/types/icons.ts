export interface IconProps {
  className?: string
  width?: string
  height?: string
  color?: string
}

export interface Icon {
  name: string
  icon: React.FC<IconProps>
}
