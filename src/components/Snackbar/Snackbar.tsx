import React, { useEffect, useState } from 'react'
import './Snackbar.css'

export type SnackbarVariant = 'info' | 'success' | 'warning' | 'error'

export interface SnackbarProps {
  message: string
  variant?: SnackbarVariant
  action?: { label: string; onClick: () => void }
  onClose?: () => void
  duration?: number
  visible?: boolean
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V11M8 5.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6V9M8 11V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const iconMap = { info: InfoIcon, success: CheckIcon, warning: WarningIcon, error: ErrorIcon }

export function Snackbar({
  message,
  variant = 'info',
  action,
  onClose,
  duration = 4000,
  visible: externalVisible,
}: SnackbarProps) {
  const [show, setShow] = useState(externalVisible !== undefined ? externalVisible : true)

  useEffect(() => {
    if (externalVisible !== undefined) {
      setShow(externalVisible)
      return
    }
    if (duration > 0) {
      const t = setTimeout(() => {
        setShow(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(t)
    }
  }, [duration, externalVisible])

  if (!show) return null

  const Icon = iconMap[variant]

  return (
    <div className={`snackbar snackbar--${variant}`} role="alert">
      <span className="snackbar__icon"><Icon /></span>
      <span className="snackbar__message">{message}</span>
      {action && (
        <button className="snackbar__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
      {onClose && (
        <button className="snackbar__close" onClick={() => { setShow(false); onClose() }} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
