import React from 'react'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

function ChevronRight() {
  return (
    <svg className="breadcrumb__separator" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="breadcrumb__item">
              {i > 0 && <ChevronRight />}
              {isLast ? (
                <span className="breadcrumb__current" aria-current="page">{item.label}</span>
              ) : (
                <a
                  className="breadcrumb__link"
                  href={item.href || '#'}
                  onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick?.() } : undefined}
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
