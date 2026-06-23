// src/assets/icons/ExpandIcon.tsx
interface IconProps {
  width?: number
  height?: number
  stroke?: string
}

export const ExpandIcon = ({ width = 24, height = 24, stroke = 'white' }: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.3613 30.4623V3.15137H1.05041M28.3613 3.15137L1.05041 30.4623" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)