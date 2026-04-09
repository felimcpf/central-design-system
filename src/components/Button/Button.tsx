// src/components/Button/Button.tsx
import React from 'react'

export interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--typography-fontSize-sm)' },
  md: { padding: 'var(--spacing-2) var(--spacing-4)', fontSize: 'var(--typography-fontSize-base)' },
  lg: { padding: 'var(--spacing-3) var(--spacing-6)', fontSize: 'var(--typography-fontSize-lg)' },
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-primary-500)',
    color: '#fff',
    border: '2px solid var(--color-primary-500)',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary-600)',
    border: '2px solid var(--color-primary-500)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary-600)',
    border: '2px solid transparent',
  },
}

export function Button({ label, variant = 'primary', size = 'md', disabled = false, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: 'var(--borderRadius-md)',
        fontFamily: 'var(--typography-fontFamily-sans)',
        fontWeight: 'var(--typography-fontWeight-medium)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  )
}
