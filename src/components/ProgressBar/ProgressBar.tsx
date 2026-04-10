import React from 'react'
import './ProgressBar.css'

export type ProgressBarVariant = 'default' | 'checklist'

export interface ProgressBarProps {
  value: number
  max?: number
  variant?: ProgressBarVariant
  label?: string
  showPercentage?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  label,
  showPercentage = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={`progress-bar progress-bar--${variant}`}>
      {(label || showPercentage) && (
        <div className="progress-bar__header">
          {label && <span className="progress-bar__label">{label}</span>}
          {showPercentage && (
            <span className="progress-bar__percentage">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="progress-bar__track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
