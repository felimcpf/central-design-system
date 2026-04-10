import React, { useState } from 'react'
import './ButtonsAndLinks.css'

// ─── Link Button ────────────────────────────────────────────────────────────
export type LinkButtonSize = 'lg' | 'md' | 'sm'
export type LinkButtonStyle = 'primary' | 'neutral'
export type LinkButtonState = 'default' | 'hover' | 'pressed' | 'disabled'

export interface LinkButtonProps {
  label: string
  size?: LinkButtonSize
  styleVariant?: LinkButtonStyle
  withIcon?: boolean
  state?: LinkButtonState
  href?: string
  onClick?: () => void
}

function ArrowIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const linkIconSize: Record<LinkButtonSize, number> = { lg: 16, md: 14, sm: 12 }

export function LinkButton({ label, size = 'md', styleVariant = 'primary', withIcon = false, state = 'default', href, onClick }: LinkButtonProps) {
  return (
    <a
      className={`link-btn link-btn--${size} link-btn--${styleVariant} link-btn--${state}`}
      href={href || '#'}
      aria-disabled={state === 'disabled'}
      onClick={(e) => { e.preventDefault(); if (state !== 'disabled') onClick?.() }}
    >
      {label}
      {withIcon && <ArrowIcon size={linkIconSize[size]} />}
    </a>
  )
}

// ─── Icon Button ─────────────────────────────────────────────────────────────
export type IconButtonSize = 'lg' | 'md'
export type IconButtonStyle =
  | 'solid-primary' | 'outline-primary' | 'clear-primary'
  | 'solid-neutral' | 'outline-neutral' | 'clear-neutral'
export type IconButtonState = 'default' | 'hover' | 'pressed' | 'disabled'

export interface IconButtonProps {
  icon: React.ReactNode
  label: string
  size?: IconButtonSize
  styleVariant?: IconButtonStyle
  state?: IconButtonState
  onClick?: () => void
}

export function IconButton({ icon, label, size = 'md', styleVariant = 'solid-primary', state = 'default', onClick }: IconButtonProps) {
  return (
    <button
      className={`icon-btn icon-btn--${size} icon-btn--${styleVariant} icon-btn--${state}`}
      disabled={state === 'disabled'}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  )
}

// ─── Dropdown Button ──────────────────────────────────────────────────────────
export type DropdownButtonSize = 'lg' | 'md' | 'sm'
export type DropdownButtonStyle = 'solid-primary' | 'outline-primary' | 'solid-neutral'

export interface DropdownButtonItem {
  label: string
  onClick?: () => void
  disabled?: boolean
}

export interface DropdownButtonProps {
  label: string
  items: DropdownButtonItem[]
  size?: DropdownButtonSize
  styleVariant?: DropdownButtonStyle
  disabled?: boolean
}

function ChevronDown({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const dropdownChevronSize: Record<DropdownButtonSize, number> = { lg: 16, md: 14, sm: 12 }

export function DropdownButton({ label, items, size = 'lg', styleVariant = 'solid-primary', disabled = false }: DropdownButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="dropdown-btn__wrapper">
      <button
        className={`dropdown-btn dropdown-btn--${size} dropdown-btn--${styleVariant} ${disabled ? 'dropdown-btn--disabled' : ''} ${open ? 'dropdown-btn--open' : ''}`}
        disabled={disabled}
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{label}</span>
        <ChevronDown size={dropdownChevronSize[size]} />
      </button>
      {open && !disabled && (
        <div className="dropdown-btn__panel">
          {items.map((item, i) => (
            <button
              key={i}
              className={`dropdown-btn__item ${item.disabled ? 'dropdown-btn__item--disabled' : ''}`}
              disabled={item.disabled}
              onClick={() => { item.onClick?.(); setOpen(false) }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Toggle Button ────────────────────────────────────────────────────────────
export interface ToggleButtonOption {
  label: string
  value: string
}

export interface ToggleButtonProps {
  options: ToggleButtonOption[]
  value?: string
  onChange?: (value: string) => void
}

export function ToggleButton({ options, value, onChange }: ToggleButtonProps) {
  const [internal, setInternal] = useState(options[0]?.value ?? '')
  const active = value !== undefined ? value : internal

  const select = (v: string) => {
    setInternal(v)
    onChange?.(v)
  }

  return (
    <div className="toggle-btn" role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`toggle-btn__option ${opt.value === active ? 'toggle-btn__option--selected' : ''}`}
          onClick={() => select(opt.value)}
          aria-pressed={opt.value === active}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── Checkbox ────────────────────────────────────────────────────────────────
export type CheckboxState = 'default' | 'hover' | 'selected' | 'disabled' | 'selected-disabled'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Checkbox({ label, checked, disabled = false, onChange }: CheckboxProps) {
  const [internal, setInternal] = useState(false)
  const isChecked = checked !== undefined ? checked : internal

  const handleChange = () => {
    if (disabled) return
    setInternal(prev => !prev)
    onChange?.(!isChecked)
  }

  return (
    <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
      <span
        className={`checkbox__box ${isChecked ? 'checkbox__box--checked' : ''} ${disabled ? 'checkbox__box--disabled' : ''}`}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        onClick={handleChange}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleChange() }}
      >
        {isChecked && <CheckIcon />}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
}

// ─── Radio Button ─────────────────────────────────────────────────────────────
export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name?: string
}

export function RadioGroup({ options, value, onChange, name = 'radio' }: RadioGroupProps) {
  const [internal, setInternal] = useState('')
  const selected = value !== undefined ? value : internal

  const select = (v: string) => {
    setInternal(v)
    onChange?.(v)
  }

  return (
    <div className="radio-group" role="radiogroup">
      {options.map((opt) => {
        const isSelected = opt.value === selected
        return (
          <label key={opt.value} className={`radio ${opt.disabled ? 'radio--disabled' : ''}`}>
            <span
              className={`radio__circle ${isSelected ? 'radio__circle--selected' : ''} ${opt.disabled ? 'radio__circle--disabled' : ''}`}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={opt.disabled}
              tabIndex={opt.disabled ? -1 : 0}
              onClick={() => !opt.disabled && select(opt.value)}
              onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !opt.disabled) select(opt.value) }}
            >
              {isSelected && <span className="radio__dot" />}
            </span>
            <span className="radio__label">{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}
