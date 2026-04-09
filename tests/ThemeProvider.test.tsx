// tests/ThemeProvider.test.tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../src/themes/ThemeProvider'

describe('ThemeProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ThemeProvider product="doc-central">
        <span>hello</span>
      </ThemeProvider>
    )
    expect(getByText('hello')).toBeInTheDocument()
  })

  it('sets data-theme attribute on wrapper div', () => {
    const { container } = render(
      <ThemeProvider product="nav-central">
        <span>child</span>
      </ThemeProvider>
    )
    expect(container.firstChild).toHaveAttribute('data-theme', 'nav-central')
  })
})
