import React from 'react'
import './GlobalNavigation.css'

export type GNavVariant = 'search' | 'search-bell' | 'links' | 'mobile'

export interface GNavLinkItem {
  label: string
  href?: string
  active?: boolean
}

export interface GlobalNavigationProps {
  variant?: GNavVariant
  logoSrc?: string
  logoIconSrc?: string
  searchPlaceholder?: string
  navLinks?: GNavLinkItem[]
  userInitials?: string
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.5 13.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
      <path d="M10.5 21.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12.5 4a7 7 0 0 1 7 7v3.5l1.5 2.5h-17l1.5-2.5V11a7 7 0 0 1 7-7Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true">
      <path d="M2 6l4.5 4.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function GlobalNavigation({
  variant = 'search',
  logoSrc = '/logos/navCentral-full-logo.svg',
  logoIconSrc = '/logos/navCentral-icon.svg',
  searchPlaceholder = 'Search in navCentral',
  navLinks = [
    { label: 'Dashboard', href: '/', active: true },
    { label: 'Guide', href: '/guide' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Download Add-In', href: '/download' },
  ],
  userInitials = 'WW',
}: GlobalNavigationProps) {
  const isMobile = variant === 'mobile'

  const userButton = (
    <button type="button" className="gnav__user-btn" aria-label="User menu">
      <span className="gnav__avatar">{userInitials}</span>
      <span className="gnav__chevron"><ChevronDownIcon /></span>
    </button>
  )

  const searchBar = (
    <div className="gnav__search">
      <span className="gnav__search-icon"><SearchIcon /></span>
      <input
        className="gnav__search-input"
        type="search"
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
      />
    </div>
  )

  return (
    <nav className={`gnav${isMobile ? ' gnav--mobile' : ''}`} aria-label="Global navigation">
      <div className="gnav__bar">
        {/* Left: logo section */}
        {isMobile ? (
          <>
            <button type="button" className="gnav__hamburger" aria-label="Toggle menu">
              <HamburgerIcon />
            </button>
            <div className="gnav__logo-section" style={{ width: 'auto', padding: '0 8px' }}>
              <img className="gnav__logo-icon-img" src={logoIconSrc} alt="Logo" />
            </div>
          </>
        ) : (
          <div className="gnav__logo-section">
            <img className="gnav__logo-img" src={logoSrc} alt="Logo" />
          </div>
        )}

        {/* Center */}
        <div className="gnav__center">
          {variant === 'links' ? (
            <nav className="gnav__links" aria-label="Main navigation">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  className="gnav__link"
                  href={link.href || '#'}
                  aria-current={link.active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : (
            searchBar
          )}
        </div>

        {/* Right */}
        <div className="gnav__right">
          {variant === 'search-bell' && (
            <span className="gnav__bell" aria-label="Notifications">
              <BellIcon />
            </span>
          )}
          {userButton}
        </div>
      </div>
    </nav>
  )
}
