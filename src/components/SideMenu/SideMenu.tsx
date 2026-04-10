import React, { useState } from 'react'
import './SideMenu.css'

export interface SideMenuItemBase {
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  badge?: string | number
}

export interface SideMenuGroup {
  title?: string
  items: SideMenuItemBase[]
}

export interface SideMenuProps {
  groups: SideMenuGroup[]
  activeItem?: string
  collapsed?: boolean
  productName?: string
  productLogo?: React.ReactNode
}

export function SideMenu({ groups, activeItem, collapsed = false, productName, productLogo }: SideMenuProps) {
  const [active, setActive] = useState(activeItem || '')

  return (
    <nav className={`side-menu ${collapsed ? 'side-menu--collapsed' : ''}`} aria-label="Side navigation">
      {(productName || productLogo) && (
        <div className="side-menu__brand">
          {productLogo && <span className="side-menu__logo">{productLogo}</span>}
          {!collapsed && productName && <span className="side-menu__product-name">{productName}</span>}
        </div>
      )}
      <div className="side-menu__content">
        {groups.map((group, gi) => (
          <div key={gi} className="side-menu__group">
            {group.title && !collapsed && (
              <span className="side-menu__group-title">{group.title}</span>
            )}
            {group.items.map((item, ii) => {
              const isActive = item.label === active || item.href === activeItem
              return (
                <a
                  key={ii}
                  className={`side-menu__item ${isActive ? 'side-menu__item--active' : ''}`}
                  href={item.href || '#'}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(item.label)
                    item.onClick?.()
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon && <span className="side-menu__item-icon">{item.icon}</span>}
                  {!collapsed && <span className="side-menu__item-label">{item.label}</span>}
                  {!collapsed && item.badge !== undefined && (
                    <span className="side-menu__badge">{item.badge}</span>
                  )}
                </a>
              )
            })}
          </div>
        ))}
      </div>
    </nav>
  )
}
