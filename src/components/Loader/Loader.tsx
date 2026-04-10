import React from 'react'
import './Loader.css'

export type LoaderVariant = 'spinner' | 'dot'
export type LoaderSize = 'sm' | 'md' | 'lg'

export interface LoaderProps {
  variant?: LoaderVariant
  size?: LoaderSize
  label?: string
}

export function Loader({ variant = 'spinner', size = 'md', label }: LoaderProps) {
  if (variant === 'dot') {
    return (
      <div className={`loader loader-dot loader-dot--${size}`} role="status" aria-label={label || 'Loading'}>
        <span className="loader-dot__dot" />
        <span className="loader-dot__dot" />
        <span className="loader-dot__dot" />
        {label && <span className="loader__label">{label}</span>}
      </div>
    )
  }

  return (
    <div className={`loader loader-spinner loader-spinner--${size}`} role="status" aria-label={label || 'Loading'}>
      <svg
        className="loader-spinner__svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="loader-spinner__track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle
          className="loader-spinner__arc"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="31.4"
          strokeDashoffset="23.6"
        />
      </svg>
      {label && <span className="loader__label">{label}</span>}
    </div>
  )
}
