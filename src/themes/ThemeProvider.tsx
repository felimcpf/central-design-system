// src/themes/ThemeProvider.tsx
import React from 'react'
import './agent-central.css'
import './doc-central.css'
import './draft-central.css'
import './nav-central.css'
import './base.css'

export type ProductTheme = 'doc-central' | 'nav-central' | 'draft-central' | 'agent-central'

interface ThemeProviderProps {
  product: ProductTheme
  children: React.ReactNode
  className?: string
}

/**
 * Wraps content in a div with a data-theme attribute.
 * CSS custom properties are scoped to [data-theme="<product>"], so all
 * components inside automatically use the correct product colors.
 *
 * Usage:
 *   <ThemeProvider product="nav-central">
 *     <App />
 *   </ThemeProvider>
 */
export function ThemeProvider({ product, children, className }: ThemeProviderProps) {
  return (
    <div data-theme={product} className={className} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
