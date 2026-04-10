import React, { useState } from 'react'
import './Tabs.css'

export interface TabItem {
  label: string
  content?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultIndex?: number
  onChange?: (index: number) => void
}

export function Tabs({ items, defaultIndex = 0, onChange }: TabsProps) {
  const [active, setActive] = useState(defaultIndex)

  const handleSelect = (index: number) => {
    setActive(index)
    onChange?.(index)
  }

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {items.map((item, i) => {
          const isFirst = i === 0
          const isLast = i === items.length - 1
          const position = isFirst ? 'left' : isLast ? 'right' : 'middle'
          const isActive = i === active

          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              className={`tabs__tab tabs__tab--${position} ${isActive ? 'tabs__tab--selected' : ''}`}
              onClick={() => handleSelect(i)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {items[active]?.content && (
        <div className="tabs__panel" role="tabpanel">
          {items[active].content}
        </div>
      )}
    </div>
  )
}
