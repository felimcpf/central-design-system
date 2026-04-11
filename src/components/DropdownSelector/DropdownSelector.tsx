import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import './DropdownSelector.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type DSState = 'default' | 'active' | 'error' | 'disabled'
export type DSInputType = 'short-text' | 'tags'

export interface DSOption {
  label: string
  sublabel?: string  // shown in multi-select short-text dropdown
  value: string
}

export interface DropdownSelectorProps {
  /** 'short-text' = text field/dropdown | 'tags' = chip field/chip-dropdown */
  inputType?: DSInputType
  /**
   * toggle=false → free-entry (text input / chip entry, no dropdown panel)
   * toggle=true  → dropdown-only trigger
   */
  toggle?: boolean
  /** false = single select | true = multi-select (checkboxes + Select all/Reset) */
  multiple?: boolean
  label?: string
  /** Optional slot at top-right of label row */
  labelRight?: string
  placeholder?: string
  options?: DSOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  state?: DSState
  caption?: string
  error?: string
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function ChevronDown({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
      style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 9V13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="6.75" r="0.875" fill="currentColor" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 2.5L13.5 13H2.5L8 2.5Z" stroke="#EF3434" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <path d="M8 7V9.5" stroke="#EF3434" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.65" fill="#EF3434" />
    </svg>
  )
}

function XSmall() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Native checkbox rendered in CSS
function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <span className={`ds2-checkbox ${checked ? 'ds2-checkbox--checked' : ''}`} aria-hidden="true">
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Blue chip (selected tag in trigger or item in Tags dropdown) */
function TagChip({ label, onRemove, disabled }: { label: string; onRemove?: () => void; disabled?: boolean }) {
  return (
    <span className="ds2-tag-chip">
      {label}
      {onRemove && !disabled && (
        <button
          type="button"
          className="ds2-tag-chip__remove"
          onClick={e => { e.stopPropagation(); onRemove() }}
          aria-label={`Remove ${label}`}
          tabIndex={-1}
        >
          <XSmall />
        </button>
      )}
    </span>
  )
}

/** Yellow-border pill (option label in Tags+toggle single-select dropdown) */
function PlaceholderPill({ label }: { label: string }) {
  return <span className="ds2-placeholder-pill">{label}</span>
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DropdownSelector({
  inputType = 'short-text',
  toggle = true,
  multiple = false,
  label,
  labelRight,
  placeholder = 'Placeholder',
  options = [],
  value,
  onChange,
  state = 'default',
  caption,
  error,
}: DropdownSelectorProps) {
  const isDisabled = state === 'disabled'
  const isError = state === 'error'

  // ── open state (toggle variants only) ───────────────────────────────────
  const [open, setOpen] = useState(false)

  // ── selection state ──────────────────────────────────────────────────────
  const [internalSelected, setInternalSelected] = useState<string[]>(
    value !== undefined ? (Array.isArray(value) ? value : [value]) : []
  )
  const selected = value !== undefined
    ? (Array.isArray(value) ? value : [value])
    : internalSelected

  // ── free-text input (short-text, no toggle) ──────────────────────────────
  const [textValue, setTextValue] = useState(
    !toggle && !Array.isArray(value) ? ((value as string) ?? '') : ''
  )

  // ── free-chip entry (tags, no toggle) ────────────────────────────────────
  const [chips, setChips] = useState<string[]>(
    !toggle && Array.isArray(value) ? (value as string[]) : []
  )
  const [chipInput, setChipInput] = useState('')

  // ── focus for active border ──────────────────────────────────────────────
  const [focused, setFocused] = useState(state === 'active')

  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // close on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // ── helpers ──────────────────────────────────────────────────────────────

  const updateSelected = (next: string[]) => {
    setInternalSelected(next)
    onChange?.(multiple ? next : next[0] ?? '')
  }

  const toggleOption = (v: string) => {
    if (multiple) {
      const next = selected.includes(v) ? selected.filter(s => s !== v) : [...selected, v]
      updateSelected(next)
    } else {
      updateSelected([v])
      setOpen(false)
    }
  }

  const removeSelected = (v: string) => updateSelected(selected.filter(s => s !== v))
  const selectAll = () => updateSelected(options.map(o => o.value))
  const resetAll = () => updateSelected([])

  const addChip = (raw: string) => {
    const tag = raw.trim()
    if (!tag || chips.includes(tag)) return
    const next = [...chips, tag]
    setChips(next)
    setChipInput('')
    onChange?.(next)
  }

  const removeChip = (tag: string) => {
    const next = chips.filter(c => c !== tag)
    setChips(next)
    onChange?.(next)
  }

  const handleChipKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addChip(chipInput)
    } else if (e.key === 'Backspace' && chipInput === '' && chips.length > 0) {
      removeChip(chips[chips.length - 1])
    }
  }

  // ── container class ──────────────────────────────────────────────────────
  const isActive = focused || open || state === 'active'
  const cls = [
    'ds2',
    isActive && 'ds2--active',
    isError && 'ds2--error',
    isDisabled && 'ds2--disabled',
  ].filter(Boolean).join(' ')

  // ── label row: info icon placement differs by input type ─────────────────
  // Short text: [Label ⓘ]  [Top right]
  // Tags:       [Label]     [Top right ⓘ]
  const isTagsType = inputType === 'tags'

  // ── selected options objects ─────────────────────────────────────────────
  const selectedOpts = options.filter(o => selected.includes(o.value))
  const hasValue = selected.length > 0

  // ── trigger content ──────────────────────────────────────────────────────
  const renderTriggerContent = () => {
    // Short text + no toggle → plain text <input>
    if (inputType === 'short-text' && !toggle) {
      return (
        <input
          ref={inputRef}
          className="ds2__text-input"
          type="text"
          placeholder={placeholder}
          value={textValue}
          disabled={isDisabled}
          onChange={e => { setTextValue(e.target.value); onChange?.(e.target.value) }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )
    }

    // Short text + toggle → single/multi select dropdown trigger
    if (inputType === 'short-text' && toggle) {
      return (
        <>
          {hasValue
            ? <span className="ds2__value">{selectedOpts.map(o => o.label).join(', ')}</span>
            : <span className="ds2__placeholder">{placeholder}</span>
          }
          <span className="ds2__chevron"><ChevronDown open={open} /></span>
        </>
      )
    }

    // Tags + no toggle → chip free-entry
    if (inputType === 'tags' && !toggle) {
      return (
        <div className="ds2__chips-row" onClick={() => inputRef.current?.focus()}>
          {chips.map(chip => (
            <TagChip key={chip} label={chip} onRemove={() => removeChip(chip)} disabled={isDisabled} />
          ))}
          {!isDisabled && (
            <input
              ref={inputRef}
              className="ds2__chip-input"
              type="text"
              placeholder={chips.length === 0 ? placeholder : ''}
              value={chipInput}
              onChange={e => setChipInput(e.target.value)}
              onKeyDown={handleChipKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => { setFocused(false); if (chipInput) addChip(chipInput) }}
              disabled={isDisabled}
            />
          )}
          {isDisabled && chips.length === 0 && (
            <span className="ds2__placeholder">{placeholder}</span>
          )}
        </div>
      )
    }

    // Tags + toggle → chip multi/single-select trigger
    if (inputType === 'tags' && toggle) {
      return (
        <>
          <div className="ds2__chips-row ds2__chips-row--flex">
            {selectedOpts.length > 0
              ? selectedOpts.map(o => (
                  <TagChip key={o.value} label={o.label} onRemove={() => removeSelected(o.value)} disabled={isDisabled} />
                ))
              : <span className="ds2__placeholder">{placeholder}</span>
            }
          </div>
          <span className="ds2__chevron"><ChevronDown open={open} /></span>
        </>
      )
    }

    return null
  }

  // ── dropdown panel items ─────────────────────────────────────────────────
  const renderPanelItems = () => {
    if (!multiple) {
      // Single select
      if (inputType === 'short-text') {
        // Simple text rows, no checkbox
        return options.map(opt => {
          const isSel = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={isSel}
              className={`ds2__option ds2__option--text ${isSel ? 'ds2__option--selected' : ''}`}
              onClick={() => toggleOption(opt.value)}
            >
              <span className="ds2__option-label">{opt.label}</span>
              {opt.sublabel && <span className="ds2__option-sublabel">{opt.sublabel}</span>}
            </button>
          )
        })
      }
      if (inputType === 'tags') {
        // Yellow placeholder pills
        return options.map(opt => (
          <button
            key={opt.value}
            type="button"
            role="option"
            aria-selected={selected.includes(opt.value)}
            className="ds2__option ds2__option--tag-pill"
            onClick={() => toggleOption(opt.value)}
          >
            <PlaceholderPill label={opt.label} />
          </button>
        ))
      }
    } else {
      // Multi select — all options have checkboxes
      if (inputType === 'short-text') {
        return options.map(opt => {
          const isSel = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={isSel}
              className={`ds2__option ds2__option--check ${isSel ? 'ds2__option--selected' : ''}`}
              onClick={() => toggleOption(opt.value)}
            >
              <CheckboxIcon checked={isSel} />
              <span className="ds2__option-text-group">
                <span className="ds2__option-label">{opt.label}</span>
                {opt.sublabel && <span className="ds2__option-sublabel">{opt.sublabel}</span>}
              </span>
            </button>
          )
        })
      }
      if (inputType === 'tags') {
        // Checkbox + Tag chip
        return options.map(opt => {
          const isSel = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={isSel}
              className={`ds2__option ds2__option--check ${isSel ? 'ds2__option--selected' : ''}`}
              onClick={() => toggleOption(opt.value)}
            >
              <CheckboxIcon checked={isSel} />
              <TagChip label={opt.label} />
            </button>
          )
        })
      }
    }
    return null
  }

  const hasTriggerButton = toggle

  return (
    <div className={cls} ref={wrapperRef}>

      {/* Label row */}
      {(label || labelRight) && (
        <div className="ds2__label-row">
          <div className="ds2__label-left">
            {label && <span className="ds2__label-text">{label}</span>}
            {!isTagsType && <InfoIcon />}
          </div>
          {(labelRight || isTagsType) && (
            <div className="ds2__label-right">
              {labelRight && <span className="ds2__label-right-text">{labelRight}</span>}
              {isTagsType && <InfoIcon />}
            </div>
          )}
        </div>
      )}

      {/* Input trigger */}
      {hasTriggerButton ? (
        <button
          type="button"
          className={`ds2__trigger ds2__trigger--${inputType} ${open ? 'ds2__trigger--open' : ''}`}
          disabled={isDisabled}
          onClick={() => !isDisabled && setOpen(v => !v)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {renderTriggerContent()}
        </button>
      ) : (
        <div className={`ds2__trigger ds2__trigger--${inputType} ds2__trigger--free`}>
          {renderTriggerContent()}
        </div>
      )}

      {/* Dropdown panel */}
      {toggle && open && !isDisabled && (
        <div className="ds2__panel" role="listbox" aria-multiselectable={multiple}>
          {/* Multi-select header row */}
          {multiple && (
            <div className="ds2__panel-actions">
              <button type="button" className="ds2__panel-action" onClick={selectAll}>Select all</button>
              <button type="button" className="ds2__panel-action ds2__panel-action--reset" onClick={resetAll}>Reset</button>
            </div>
          )}
          {renderPanelItems()}
        </div>
      )}

      {/* Caption / Error */}
      {isError && error && (
        <p className="ds2__caption ds2__caption--error">
          <WarningIcon />
          {error}
        </p>
      )}
      {!isError && caption && (
        <p className="ds2__caption">{caption}</p>
      )}
    </div>
  )
}
