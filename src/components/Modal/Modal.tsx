import React, { useEffect } from 'react'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: ModalSize
  children: React.ReactNode
  footer?: React.ReactNode
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Modal({ open, onClose, title, size = 'md', children, footer }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`modal modal--${size}`} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
        <div className="modal__header">
          {title && <h2 className="modal__title" id="modal-title">{title}</h2>}
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
