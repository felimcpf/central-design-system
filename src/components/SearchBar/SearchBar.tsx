import React, { useState } from 'react'
import './SearchBar.css'

export interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function SearchIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const sizeMap = { sm: { height: 32, icon: 14, font: 13 }, md: { height: 40, icon: 16, font: 14 }, lg: { height: 48, icon: 18, font: 15 } }

export function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  disabled = false,
  size = 'md',
}: SearchBarProps) {
  const [internal, setInternal] = useState('')
  const controlled = value !== undefined
  const currentValue = controlled ? value : internal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (!controlled) setInternal(v)
    onChange?.(v)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch?.(currentValue)
  }

  const handleClear = () => {
    if (!controlled) setInternal('')
    onChange?.('')
  }

  const { icon } = sizeMap[size]

  return (
    <div className={`search-bar search-bar--${size} ${disabled ? 'search-bar--disabled' : ''}`}>
      <span className="search-bar__icon"><SearchIcon size={icon} /></span>
      <input
        className="search-bar__input"
        type="search"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={placeholder}
      />
      {currentValue && !disabled && (
        <button className="search-bar__clear" onClick={handleClear} aria-label="Clear search">
          <ClearIcon />
        </button>
      )}
    </div>
  )
}
