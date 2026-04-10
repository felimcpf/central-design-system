import React from 'react'
import './Divider.css'

export type DividerEndStyle = 'round' | 'square'

export interface DividerProps {
  endStyle?: DividerEndStyle
  className?: string
}

export function Divider({ endStyle = 'round', className = '' }: DividerProps) {
  return (
    <hr
      className={`divider divider--${endStyle} ${className}`}
      aria-orientation="horizontal"
    />
  )
}
