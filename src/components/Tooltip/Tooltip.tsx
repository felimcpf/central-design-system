import React, { useState } from 'react'
import './Tooltip.css'

export type TooltipDirection = 'up' | 'down' | 'left' | 'right'

export interface TooltipProps {
  content: string
  direction?: TooltipDirection
  children: React.ReactNode
}

export function Tooltip({ content, direction = 'up', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className={`tooltip tooltip--${direction}`} role="tooltip">
          <span className="tooltip__arrow" />
          <span className="tooltip__content">{content}</span>
        </span>
      )}
    </span>
  )
}
