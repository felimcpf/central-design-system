import React, { useState, useRef, useEffect } from 'react'
import './DropdownMenu.css'

export interface DropdownMenuItem {
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  divider?: boolean
}

export interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  placement?: 'bottom-start' | 'bottom-end'
}

export function DropdownMenu({ trigger, items, placement = 'bottom-start' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="dropdown-menu" ref={ref}>
      <div className="dropdown-menu__trigger" onClick={() => setOpen(prev => !prev)}>
        {trigger}
      </div>
      {open && (
        <div className={`dropdown-menu__panel dropdown-menu__panel--${placement}`}>
          {items.map((item, i) => (
            item.divider ? (
              <div key={i} className="dropdown-menu__divider" />
            ) : (
              <button
                key={i}
                className={`dropdown-menu__item ${item.disabled ? 'dropdown-menu__item--disabled' : ''}`}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.()
                    setOpen(false)
                  }
                }}
              >
                {item.icon && <span className="dropdown-menu__item-icon">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            )
          ))}
        </div>
      )}
    </div>
  )
}
