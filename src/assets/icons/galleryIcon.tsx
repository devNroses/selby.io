// src/assets/icons/GalleryIcon.tsx
interface IconProps {
  width?: number
  height?: number
  stroke?: string
}

export const GalleryIcon = ({ width = 24, height = 24, stroke = 'white' }: IconProps) => (
 <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="30" height="30" stroke={stroke} strokeWidth="2.5" />
    <line x1="8" y1="1" x2="8" y2="31" stroke={stroke} strokeWidth="2.5" />
    <line x1="24" y1="1" x2="24" y2="31" stroke={stroke} strokeWidth="2.5" />
  </svg>
)