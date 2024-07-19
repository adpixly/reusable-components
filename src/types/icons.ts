export interface IconProps {
  className?: string
  width?: string
  height?: string
}

export interface Icon {
  name: string
  icon: React.FC<IconProps>
}
