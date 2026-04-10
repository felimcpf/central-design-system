// src/components/Button/Button.tsx — matches Figma frame 4:10326
import React from 'react'
import './Button.css'

export type ButtonVariant =
  | 'solid-primary'
  | 'outline-primary'
  | 'clear-primary'
  | 'solid-warning'
  | 'outline-warning'
  | 'clear-warning'
  | 'outline-neutral'
  | 'clear-neutral'
  | 'solid-secondary-1'
  | 'solid-secondary-2'
  | 'solid-neutral'

export type ButtonSize = 'lg' | 'md' | 'sm'

export interface ButtonProps {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  withIcon?: boolean
  disabled?: boolean
  onClick?: () => void
}

const iconSizeMap: Record<ButtonSize, number> = { lg: 20, md: 16, sm: 12 }

function ArrowIcon({ size }: { size: number }) {
  return (
    <svg
      className="btn__icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Button({
  label,
  variant = 'solid-primary',
  size = 'lg',
  withIcon = false,
  disabled = false,
  onClick,
}: ButtonProps) {
  const iconSize = iconSizeMap[size]

  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {withIcon && <ArrowIcon size={iconSize} />}
      <span>{label}</span>
      {withIcon && <ArrowIcon size={iconSize} />}
    </button>
  )
}
