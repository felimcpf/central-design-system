import React, { useState } from 'react'
import './GlobalNavigation.css'

export interface NavItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

export interface GlobalNavigationProps {
  productName: string
  productLogo?: React.ReactNode
  navItems?: NavItem[]
  actions?: React.ReactNode
  userAvatar?: React.ReactNode
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function GlobalNavigation({ productName, productLogo, navItems = [], actions, userAvatar }: GlobalNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="global-nav">
      <div className="global-nav__inner">
        <div className="global-nav__brand">
          {productLogo && <span className="global-nav__logo">{productLogo}</span>}
          <span className="global-nav__product-name">{productName}</span>
        </div>

        {navItems.length > 0 && (
          <nav className="global-nav__links">
            {navItems.map((item, i) => (
              <a
                key={i}
                className={`global-nav__link ${item.active ? 'global-nav__link--active' : ''}`}
                href={item.href || '#'}
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick?.() } : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="global-nav__end">
          {actions && <div className="global-nav__actions">{actions}</div>}
          {userAvatar && <div className="global-nav__user">{userAvatar}</div>}
          {navItems.length > 0 && (
            <button className="global-nav__hamburger" onClick={() => setMobileOpen(prev => !prev)} aria-label="Toggle menu">
              <HamburgerIcon />
            </button>
          )}
        </div>
      </div>

      {mobileOpen && navItems.length > 0 && (
        <nav className="global-nav__mobile">
          {navItems.map((item, i) => (
            <a
              key={i}
              className={`global-nav__mobile-link ${item.active ? 'global-nav__mobile-link--active' : ''}`}
              href={item.href || '#'}
              onClick={() => { setMobileOpen(false); item.onClick?.() }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
