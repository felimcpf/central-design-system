import React, { useState } from 'react'
import './InputField.css'

export type InputState = 'default' | 'hover' | 'focused' | 'filled' | 'error' | 'disabled'
export type InputVariant = 'text' | 'textarea' | 'prefix'

export interface InputFieldProps {
  label?: string
  labelRight?: string
  placeholder?: string
  caption?: string
  captionRight?: string
  errorMessage?: string
  prefix?: string
  state?: InputState
  variant?: InputVariant
  value?: string
  onChange?: (value: string) => void
  required?: boolean
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 5.5V8M7 10V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function InputField({
  label,
  labelRight,
  placeholder = 'Text',
  caption,
  captionRight,
  errorMessage,
  prefix,
  state = 'default',
  variant = 'text',
  value,
  onChange,
  required,
}: InputFieldProps) {
  const [internal, setInternal] = useState('')
  const controlled = value !== undefined
  const currentValue = controlled ? value : internal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value
    if (!controlled) setInternal(v)
    onChange?.(v)
  }

  const isError = state === 'error'
  const isDisabled = state === 'disabled'
  const hasPrefix = variant === 'prefix' && prefix

  const showLabel = label || labelRight
  const showCaption = caption || captionRight || errorMessage

  return (
    <div className={`input-field input-field--${state}`}>
      {showLabel && (
        <div className="input-field__label-row">
          <label className="input-field__label">
            {label}
            {required && <span className="input-field__required">*</span>}
          </label>
          {labelRight && <span className="input-field__label-right">{labelRight}</span>}
        </div>
      )}

      <div className={`input-field__wrapper ${hasPrefix ? 'input-field__wrapper--prefix' : ''}`}>
        {hasPrefix && (
          <div className="input-field__prefix">
            <span className="input-field__prefix-text">{prefix}</span>
          </div>
        )}

        {variant === 'textarea' ? (
          <textarea
            className="input-field__input input-field__textarea"
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={isDisabled}
            rows={4}
          />
        ) : (
          <input
            className="input-field__input"
            type="text"
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={isDisabled}
          />
        )}
      </div>

      {showCaption && (
        <div className="input-field__caption-row">
          <span className={`input-field__caption ${isError ? 'input-field__caption--error' : ''}`}>
            {isError && <WarningIcon />}
            {isError ? errorMessage : caption}
          </span>
          {captionRight && !isError && (
            <span className="input-field__caption-right">{captionRight}</span>
          )}
        </div>
      )}
    </div>
  )
}
