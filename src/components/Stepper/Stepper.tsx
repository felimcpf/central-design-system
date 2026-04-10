import React from 'react'
import './Stepper.css'

export type StepStatus = 'complete' | 'active' | 'inactive'

export interface Step {
  label: string
  description?: string
  status?: StepStatus
}

export interface StepperProps {
  steps: Step[]
  activeStep?: number
  orientation?: 'horizontal' | 'vertical'
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Stepper({ steps, activeStep = 0, orientation = 'horizontal' }: StepperProps) {
  return (
    <div className={`stepper stepper--${orientation}`}>
      {steps.map((step, i) => {
        const isComplete = i < activeStep
        const isActive = i === activeStep
        const status: StepStatus = isComplete ? 'complete' : isActive ? 'active' : 'inactive'

        return (
          <div key={i} className={`stepper__step stepper__step--${status}`}>
            <div className="stepper__indicator-row">
              <div className="stepper__circle">
                {isComplete ? <CheckIcon /> : <span>{i + 1}</span>}
              </div>
              {i < steps.length - 1 && <div className={`stepper__line ${isComplete ? 'stepper__line--complete' : ''}`} />}
            </div>
            <div className="stepper__content">
              <span className="stepper__label">{step.label}</span>
              {step.description && (
                <span className="stepper__description">{step.description}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
