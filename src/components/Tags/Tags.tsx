import React from 'react'
import './Tags.css'

export type TagSize = 'lg' | 'md' | 'sm'
export type TagState = 'default' | 'hover' | 'pressed' | 'disabled'

export interface TagProps {
  label: string
  size?: TagSize
  state?: TagState
  withIcon?: boolean
  onClose?: () => void
}

function PlusIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const iconSizeMap: Record<TagSize, number> = { lg: 14, md: 12, sm: 10 }

export function Tag({ label, size = 'md', state = 'default', withIcon = false, onClose }: TagProps) {
  const iconSize = iconSizeMap[size]
  const isDisabled = state === 'disabled'

  return (
    <div
      className={`tag tag--${size} tag--${state}`}
      role="status"
      aria-disabled={isDisabled}
    >
      {withIcon && (
        <span className="tag__icon">
          <PlusIcon size={iconSize} />
        </span>
      )}
      <span className="tag__label">{label}</span>
      {onClose && !isDisabled && (
        <button className="tag__close" onClick={onClose} aria-label={`Remove ${label}`}>
          <CloseIcon size={iconSize} />
        </button>
      )}
    </div>
  )
}
