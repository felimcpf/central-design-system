import React from 'react'
import './LinkCard.css'

export interface LinkCardProps {
  title: string
  description?: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  tag?: string
  external?: boolean
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M6 2H2V12H12V8M8 2H12M12 2V6M12 2L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LinkCard({ title, description, href, onClick, icon, tag, external }: LinkCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <a
      className="link-card"
      href={href || '#'}
      onClick={handleClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <div className="link-card__inner">
        {icon && <div className="link-card__icon">{icon}</div>}
        <div className="link-card__content">
          <div className="link-card__header">
            <span className="link-card__title">{title}</span>
            {external ? <ExternalIcon /> : <ArrowIcon />}
          </div>
          {description && <p className="link-card__description">{description}</p>}
        </div>
      </div>
      {tag && <span className="link-card__tag">{tag}</span>}
    </a>
  )
}

export interface LinkCardGridProps {
  cards: LinkCardProps[]
  columns?: 1 | 2 | 3 | 4
}

export function LinkCardGrid({ cards, columns = 3 }: LinkCardGridProps) {
  return (
    <div className="link-card-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {cards.map((card, i) => (
        <LinkCard key={i} {...card} />
      ))}
    </div>
  )
}
