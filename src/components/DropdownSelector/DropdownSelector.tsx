import React, { useState, useRef, useEffect } from 'react'
import './DropdownSelector.css'

export type DropdownSelectorState = 'default' | 'active' | 'disabled'
export type DropdownSelectorInputType = 'text' | 'tags' | 'avatar'

export interface DropdownSelectorOption {
  label: string
  value: string
  avatarSrc?: string
}

export interface DropdownSelectorProps {
  label?: string
  placeholder?: string
  options: DropdownSelectorOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  state?: DropdownSelectorState
  inputType?: DropdownSelectorInputType
  caption?: string
  multiple?: boolean
}

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Avatar({ src, label, size = 24 }: { src?: string; label: string; size?: number }) {
  const initials = label.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return src ? (
    <img
      src={src}
      alt={label}
      className="ds-avatar"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
    />
  ) : (
    <span
      className="ds-avatar ds-avatar--initials"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-label={label}
    >
      {initials}
    </span>
  )
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="ds-tag">
      {label}
      <button
        className="ds-tag__remove"
        onClick={(e) => { e.stopPropagation(); onRemove() }}
        aria-label={`Remove ${label}`}
        type="button"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  )
}

export function DropdownSelector({
  label,
  placeholder = 'Select…',
  options,
  value,
  onChange,
  state = 'default',
  inputType = 'text',
  caption,
  multiple = false,
}: DropdownSelectorProps) {
  const isDisabled = state === 'disabled'
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string[]>(
    value !== undefined ? (Array.isArray(value) ? value : [value]) : []
  )
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selected = value !== undefined
    ? (Array.isArray(value) ? value : [value])
    : internalValue

  const select = (optValue: string) => {
    let next: string[]
    if (multiple) {
      next = selected.includes(optValue)
        ? selected.filter(v => v !== optValue)
        : [...selected, optValue]
    } else {
      next = [optValue]
      setOpen(false)
    }
    setInternalValue(next)
    onChange?.(multiple ? next : next[0])
  }

  const removeTag = (optValue: string) => {
    const next = selected.filter(v => v !== optValue)
    setInternalValue(next)
    onChange?.(multiple ? next : next[0] ?? '')
  }

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const selectedOptions = options.filter(o => selected.includes(o.value))
  const hasValue = selected.length > 0

  const renderTriggerContent = () => {
    if (!hasValue) {
      return <span className="ds__placeholder">{placeholder}</span>
    }
    if (inputType === 'tags') {
      return (
        <div className="ds__tags-wrapper">
          {selectedOptions.map(o => (
            <Tag key={o.value} label={o.label} onRemove={() => removeTag(o.value)} />
          ))}
        </div>
      )
    }
    if (inputType === 'avatar') {
      const opt = selectedOptions[0]
      return opt ? (
        <span className="ds__avatar-value">
          <Avatar src={opt.avatarSrc} label={opt.label} size={24} />
          <span>{opt.label}</span>
        </span>
      ) : <span className="ds__placeholder">{placeholder}</span>
    }
    // text
    return <span className="ds__value">{selectedOptions.map(o => o.label).join(', ')}</span>
  }

  return (
    <div
      className={`ds ${state === 'active' || open ? 'ds--active' : ''} ${isDisabled ? 'ds--disabled' : ''}`}
      ref={wrapperRef}
    >
      {label && (
        <label className="ds__label">{label}</label>
      )}
      <button
        type="button"
        className={`ds__trigger ds__trigger--${inputType} ${open ? 'ds__trigger--open' : ''}`}
        disabled={isDisabled}
        onClick={() => !isDisabled && setOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={isDisabled}
      >
        {renderTriggerContent()}
        <ChevronDown size={16} />
      </button>

      {open && !isDisabled && (
        <div className="ds__panel" role="listbox" aria-multiselectable={multiple}>
          {options.map(opt => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`ds__option ds__option--${inputType} ${isSelected ? 'ds__option--selected' : ''}`}
                onClick={() => select(opt.value)}
              >
                {inputType === 'avatar' && (
                  <Avatar src={opt.avatarSrc} label={opt.label} size={24} />
                )}
                <span>{opt.label}</span>
                {isSelected && (
                  <svg className="ds__check" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}

      {caption && <p className="ds__caption">{caption}</p>}
    </div>
  )
}
