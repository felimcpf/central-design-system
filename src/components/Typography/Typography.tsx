import React from 'react'
import './Typography.css'

export type TypographyVariant =
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label-lg'
  | 'label-md'
  | 'label-sm'
  | 'caption'

export type TypographyAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'

export interface TypographyProps {
  variant?: TypographyVariant
  as?: TypographyAs
  children: React.ReactNode
  className?: string
}

const defaultTagMap: Record<TypographyVariant, TypographyAs> = {
  'display-lg': 'h1',
  'display-md': 'h1',
  'display-sm': 'h2',
  'heading-lg': 'h2',
  'heading-md': 'h3',
  'heading-sm': 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'label-lg': 'span',
  'label-md': 'span',
  'label-sm': 'span',
  'caption': 'span',
}

export function Typography({ variant = 'body-md', as, children, className = '' }: TypographyProps) {
  const Tag = as || defaultTagMap[variant]
  return (
    <Tag className={`typography typography--${variant} ${className}`}>
      {children}
    </Tag>
  )
}
