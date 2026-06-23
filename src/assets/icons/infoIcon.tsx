// src/assets/icons/InfoIcon.tsx
interface IconProps {
  width?: number
  height?: number
  stroke?: string
}

export const InfoIcon = ({ width = 24, height = 24, stroke = 'white' }: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18.6471" cy="18.6471" r="17.6471" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="18.5884" y="12.7061" width="0.01" height="0.01" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M18.5884 17.7061V25.7061" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)