import React, { useState } from 'react'
import './Accordion.css'

export interface AccordionItem {
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`accordion__chevron ${isOpen ? 'accordion__chevron--open' : ''}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className={`accordion__item ${isOpen ? 'accordion__item--open' : ''}`}>
      <button className="accordion__header" onClick={onToggle} aria-expanded={isOpen}>
        <span className="accordion__title">{item.title}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="accordion__content">
          <div className="accordion__body">{item.content}</div>
        </div>
      )}
    </div>
  )
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set(items.flatMap((item, i) => (item.defaultOpen ? [i] : [])))
  )

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!allowMultiple) next.clear()
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItemComponent
          key={i}
          item={item}
          isOpen={openItems.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}
