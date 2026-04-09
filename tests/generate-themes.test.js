// tests/generate-themes.test.js
import { describe, it, expect } from 'vitest'
import { flattenTokens, toCssVarName, tokensToCSS } from '../scripts/generate-themes.js'

describe('flattenTokens', () => {
  it('flattens nested token object into dash-separated entries', () => {
    const tokens = {
      color: { primary: { '500': '#3b82f6' } },
      spacing: { '4': '16px' }
    }
    expect(flattenTokens(tokens)).toEqual({
      'color-primary-500': '#3b82f6',
      'spacing-4': '16px'
    })
  })
})

describe('toCssVarName', () => {
  it('converts a dash-separated key to a CSS custom property name', () => {
    expect(toCssVarName('color-primary-500')).toBe('--color-primary-500')
  })
})

describe('tokensToCSS', () => {
  it('generates a :root block with CSS variables from a flat token map', () => {
    const flat = { 'color-primary-500': '#3b82f6' }
    const css = tokensToCSS(flat)
    expect(css).toContain(':root {')
    expect(css).toContain('  --color-primary-500: #3b82f6;')
    expect(css).toContain('}')
  })
})
