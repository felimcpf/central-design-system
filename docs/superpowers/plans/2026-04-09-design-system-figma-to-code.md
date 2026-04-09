# Design System: Figma to Code — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a React/TypeScript component library with 4 product color themes, Storybook with a live theme switcher, and scripts to sync design tokens from Figma — all operable by a non-technical user.

**Architecture:** Vite-based React + TypeScript project. Design tokens live in JSON files (one per product theme + shared base), transformed into CSS custom properties by `scripts/generate-themes.js`. All components reference colors via CSS variables only, so theme switching requires zero component code changes. `scripts/sync-figma.js` calls the Figma REST Variables API to update token files when Figma changes. Storybook is configured with a global theme switcher toolbar.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Storybook 8, Vitest, Node.js 22 (scripts use native `fetch`)

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies + npm scripts: `storybook`, `build-storybook`, `sync-figma`, `generate-themes`, `test` |
| `vite.config.ts` | Vite + Vitest config |
| `tokens/base.json` | Shared tokens: spacing, typography, border-radius |
| `tokens/product-1.json` | Color scale for Product 1 (populated by sync-figma) |
| `tokens/product-2.json` | Color scale for Product 2 |
| `tokens/product-3.json` | Color scale for Product 3 |
| `tokens/product-4.json` | Color scale for Product 4 |
| `scripts/generate-themes.js` | Reads all token JSON files → writes `src/themes/product-N.css` |
| `scripts/sync-figma.js` | Calls Figma REST API → writes token JSON files → calls generate-themes |
| `src/themes/ThemeProvider.tsx` | React context + component; accepts `product` prop, applies CSS file |
| `src/themes/product-1.css` | CSS custom properties for Product 1 (generated, do not edit manually) |
| `src/themes/product-2.css` | CSS custom properties for Product 2 |
| `src/themes/product-3.css` | CSS custom properties for Product 3 |
| `src/themes/product-4.css` | CSS custom properties for Product 4 |
| `src/themes/base.css` | Shared CSS variables (spacing, typography, radii) |
| `src/components/Button/Button.tsx` | Example component — all colors via CSS vars |
| `src/components/Button/Button.stories.tsx` | Storybook story for Button |
| `.storybook/main.ts` | Storybook config |
| `.storybook/preview.tsx` | Global theme decorator + toolbar dropdown |
| `tests/generate-themes.test.js` | Unit tests for generate-themes.js |
| `tests/ThemeProvider.test.tsx` | Unit tests for ThemeProvider |
| `FIGMA_SETUP.md` | Step-by-step guide: get Figma token, configure MCP, run first sync |

---

## Task 1: Scaffold the project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1.1: Initialize the project**

```bash
cd /Users/felicialim/Downloads/central-design-system
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty. Please choose how to proceed": select **Ignore files and continue**.

- [ ] **Step 1.2: Install core dependencies**

```bash
npm install
```

- [ ] **Step 1.3: Install Storybook**

```bash
npx storybook@latest init --yes
```

This auto-detects Vite + React and installs the right packages. It will also add example stories — delete them after.

- [ ] **Step 1.4: Install Vitest and testing libraries**

```bash
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 1.5: Replace `vite.config.ts` with Vitest config included**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
```

- [ ] **Step 1.6: Create test setup file**

```typescript
// tests/setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 1.7: Delete Storybook example stories**

```bash
rm -rf src/stories
```

- [ ] **Step 1.8: Verify Storybook starts**

```bash
npm run storybook
```

Expected: browser opens at `http://localhost:6006` with empty Storybook. Stop with Ctrl+C.

- [ ] **Step 1.9: Commit**

```bash
git add -A
git commit -m "feat: scaffold React/TS/Vite project with Storybook and Vitest"
```

---

## Task 2: Token JSON structure

**Files:**
- Create: `tokens/base.json`
- Create: `tokens/product-1.json`
- Create: `tokens/product-2.json`
- Create: `tokens/product-3.json`
- Create: `tokens/product-4.json`

These files define the shape of design tokens. The color values here are **placeholders** — `sync-figma.js` (Task 6) will overwrite color values with real Figma data. The base tokens (spacing, typography, radii) are not sourced from Figma variables and should be set manually here.

- [ ] **Step 2.1: Create `tokens/base.json`**

```json
{
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  },
  "typography": {
    "fontFamily": {
      "sans": "Inter, system-ui, sans-serif",
      "mono": "JetBrains Mono, monospace"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "base": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px"
    },
    "fontWeight": {
      "regular": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    },
    "lineHeight": {
      "tight": "1.25",
      "normal": "1.5",
      "relaxed": "1.75"
    }
  },
  "borderRadius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "full": "9999px"
  }
}
```

- [ ] **Step 2.2: Create `tokens/product-1.json`**

```json
{
  "color": {
    "primary": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a"
    },
    "neutral": {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a"
    },
    "success": {
      "500": "#22c55e",
      "700": "#15803d"
    },
    "warning": {
      "500": "#f59e0b",
      "700": "#b45309"
    },
    "error": {
      "500": "#ef4444",
      "700": "#b91c1c"
    }
  }
}
```

- [ ] **Step 2.3: Create `tokens/product-2.json`**

```json
{
  "color": {
    "primary": {
      "50": "#fdf4ff",
      "100": "#fae8ff",
      "200": "#f5d0fe",
      "300": "#f0abfc",
      "400": "#e879f9",
      "500": "#d946ef",
      "600": "#c026d3",
      "700": "#a21caf",
      "800": "#86198f",
      "900": "#701a75"
    },
    "neutral": {
      "50": "#fafafa",
      "100": "#f4f4f5",
      "200": "#e4e4e7",
      "300": "#d4d4d8",
      "400": "#a1a1aa",
      "500": "#71717a",
      "600": "#52525b",
      "700": "#3f3f46",
      "800": "#27272a",
      "900": "#18181b"
    },
    "success": {
      "500": "#22c55e",
      "700": "#15803d"
    },
    "warning": {
      "500": "#f59e0b",
      "700": "#b45309"
    },
    "error": {
      "500": "#ef4444",
      "700": "#b91c1c"
    }
  }
}
```

- [ ] **Step 2.4: Create `tokens/product-3.json`**

```json
{
  "color": {
    "primary": {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
      "800": "#065f46",
      "900": "#064e3b"
    },
    "neutral": {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827"
    },
    "success": {
      "500": "#22c55e",
      "700": "#15803d"
    },
    "warning": {
      "500": "#f59e0b",
      "700": "#b45309"
    },
    "error": {
      "500": "#ef4444",
      "700": "#b91c1c"
    }
  }
}
```

- [ ] **Step 2.5: Create `tokens/product-4.json`**

```json
{
  "color": {
    "primary": {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
      "500": "#f97316",
      "600": "#ea580c",
      "700": "#c2410c",
      "800": "#9a3412",
      "900": "#7c2d12"
    },
    "neutral": {
      "50": "#fafaf9",
      "100": "#f5f5f4",
      "200": "#e7e5e4",
      "300": "#d6d3d1",
      "400": "#a8a29e",
      "500": "#78716c",
      "600": "#57534e",
      "700": "#44403c",
      "800": "#292524",
      "900": "#1c1917"
    },
    "success": {
      "500": "#22c55e",
      "700": "#15803d"
    },
    "warning": {
      "500": "#f59e0b",
      "700": "#b45309"
    },
    "error": {
      "500": "#ef4444",
      "700": "#b91c1c"
    }
  }
}
```

- [ ] **Step 2.6: Commit**

```bash
git add tokens/
git commit -m "feat: add design token JSON files for 4 product themes and base"
```

---

## Task 3: `generate-themes.js` — tokens → CSS variables

**Files:**
- Create: `scripts/generate-themes.js`
- Create: `tests/generate-themes.test.js`

This script reads all token JSON files and writes CSS custom property files to `src/themes/`.

- [ ] **Step 3.1: Write the failing test**

```javascript
// tests/generate-themes.test.js
import { describe, it, expect } from 'vitest'
import { flattenTokens, toCssVarName, tokensToCSS } from '../scripts/generate-themes.js'

describe('flattenTokens', () => {
  it('flattens nested token object into dot-path entries', () => {
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
  it('converts a dot-path key to a CSS custom property name', () => {
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
```

- [ ] **Step 3.2: Run test to confirm it fails**

```bash
npx vitest run tests/generate-themes.test.js
```

Expected: FAIL — `Cannot find module '../scripts/generate-themes.js'`

- [ ] **Step 3.3: Create `scripts/generate-themes.js`**

```javascript
// scripts/generate-themes.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

/** Flatten { color: { primary: { 500: '#fff' } } } → { 'color-primary-500': '#fff' } */
export function flattenTokens(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}-${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenTokens(value, fullKey))
    } else {
      acc[fullKey] = value
    }
    return acc
  }, {})
}

/** 'color-primary-500' → '--color-primary-500' */
export function toCssVarName(key) {
  return `--${key}`
}

/** flat token map → CSS :root { ... } string */
export function tokensToCSS(flatTokens) {
  const vars = Object.entries(flatTokens)
    .map(([key, value]) => `  ${toCssVarName(key)}: ${value};`)
    .join('\n')
  return `:root {\n${vars}\n}\n`
}

function run() {
  const tokensDir = path.join(ROOT, 'tokens')
  const themesDir = path.join(ROOT, 'src', 'themes')
  fs.mkdirSync(themesDir, { recursive: true })

  // Generate base.css from base.json
  const base = JSON.parse(fs.readFileSync(path.join(tokensDir, 'base.json'), 'utf8'))
  fs.writeFileSync(path.join(themesDir, 'base.css'), tokensToCSS(flattenTokens(base)))
  console.log('✓ Generated src/themes/base.css')

  // Generate product-N.css from product-N.json
  for (const file of fs.readdirSync(tokensDir)) {
    if (!file.startsWith('product-') || !file.endsWith('.json')) continue
    const tokens = JSON.parse(fs.readFileSync(path.join(tokensDir, file), 'utf8'))
    const cssFile = file.replace('.json', '.css')
    fs.writeFileSync(path.join(themesDir, cssFile), tokensToCSS(flattenTokens(tokens)))
    console.log(`✓ Generated src/themes/${cssFile}`)
  }
}

// Only run when invoked directly (not when imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run()
}
```

- [ ] **Step 3.4: Add `"type": "module"` to `package.json`**

Open `package.json` and add `"type": "module"` at the top level (alongside `"name"`, `"version"`, etc.):

```json
{
  "type": "module",
  ...
}
```

- [ ] **Step 3.5: Run test to confirm it passes**

```bash
npx vitest run tests/generate-themes.test.js
```

Expected: PASS — 3 tests passing.

- [ ] **Step 3.6: Run the script to generate CSS files**

```bash
node scripts/generate-themes.js
```

Expected output:
```
✓ Generated src/themes/base.css
✓ Generated src/themes/product-1.css
✓ Generated src/themes/product-2.css
✓ Generated src/themes/product-3.css
✓ Generated src/themes/product-4.css
```

Verify `src/themes/product-1.css` starts with `:root {` and contains `--color-primary-500: #3b82f6;`.

- [ ] **Step 3.7: Commit**

```bash
git add scripts/generate-themes.js tests/generate-themes.test.js src/themes/
git commit -m "feat: add generate-themes script and CSS variable files"
```

---

## Task 4: `ThemeProvider` component

**Files:**
- Create: `src/themes/ThemeProvider.tsx`
- Create: `tests/ThemeProvider.test.tsx`

- [ ] **Step 4.1: Write the failing test**

```typescript
// tests/ThemeProvider.test.tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../src/themes/ThemeProvider'

describe('ThemeProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ThemeProvider product="product-1">
        <span>hello</span>
      </ThemeProvider>
    )
    expect(getByText('hello')).toBeInTheDocument()
  })

  it('sets data-theme attribute on wrapper div', () => {
    const { container } = render(
      <ThemeProvider product="product-2">
        <span>child</span>
      </ThemeProvider>
    )
    expect(container.firstChild).toHaveAttribute('data-theme', 'product-2')
  })
})
```

- [ ] **Step 4.2: Run test to confirm it fails**

```bash
npx vitest run tests/ThemeProvider.test.tsx
```

Expected: FAIL — `Cannot find module '../src/themes/ThemeProvider'`

- [ ] **Step 4.3: Create `src/themes/ThemeProvider.tsx`**

```tsx
// src/themes/ThemeProvider.tsx
import React, { useEffect } from 'react'

export type ProductTheme = 'product-1' | 'product-2' | 'product-3' | 'product-4'

interface ThemeProviderProps {
  product: ProductTheme
  children: React.ReactNode
  className?: string
}

/**
 * Wraps content in a div that loads the correct CSS theme file.
 * All components inside will automatically use the correct product colors
 * via CSS custom properties.
 *
 * Usage:
 *   <ThemeProvider product="product-2">
 *     <App />
 *   </ThemeProvider>
 */
export function ThemeProvider({ product, children, className }: ThemeProviderProps) {
  useEffect(() => {
    // Dynamically import the CSS for the selected product theme
    import(`./product-1.css`)  // preload to avoid flash — each product CSS is small
  }, [])

  return (
    <div data-theme={product} className={className} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
```

Wait — dynamic imports of CSS don't work well in all environments. Use a simpler approach: import all 4 CSS files statically and scope via `data-theme` attribute.

Replace the file with:

```tsx
// src/themes/ThemeProvider.tsx
import React from 'react'
import './product-1.css'
import './product-2.css'
import './product-3.css'
import './product-4.css'
import './base.css'

export type ProductTheme = 'product-1' | 'product-2' | 'product-3' | 'product-4'

interface ThemeProviderProps {
  product: ProductTheme
  children: React.ReactNode
  className?: string
}

/**
 * Wraps content in a div with a data-theme attribute.
 * CSS custom properties are scoped to [data-theme="product-N"], so all
 * components inside automatically use the correct product colors.
 *
 * Usage:
 *   <ThemeProvider product="product-2">
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
```

- [ ] **Step 4.4: Update CSS files to scope variables under `[data-theme]`**

The CSS files currently use `:root {}`. Since we're loading all 4 at once and scoping via `data-theme`, update `generate-themes.js` to use `[data-theme="product-N"]` selectors for product files (base stays `:root`).

Replace the `run()` function in `scripts/generate-themes.js`:

```javascript
function run() {
  const tokensDir = path.join(ROOT, 'tokens')
  const themesDir = path.join(ROOT, 'src', 'themes')
  fs.mkdirSync(themesDir, { recursive: true })

  // Generate base.css from base.json — uses :root (shared, always active)
  const base = JSON.parse(fs.readFileSync(path.join(tokensDir, 'base.json'), 'utf8'))
  fs.writeFileSync(path.join(themesDir, 'base.css'), tokensToCSS(flattenTokens(base)))
  console.log('✓ Generated src/themes/base.css')

  // Generate product-N.css — scoped to [data-theme="product-N"]
  for (const file of fs.readdirSync(tokensDir)) {
    if (!file.startsWith('product-') || !file.endsWith('.json')) continue
    const productName = file.replace('.json', '')  // e.g. "product-1"
    const tokens = JSON.parse(fs.readFileSync(path.join(tokensDir, file), 'utf8'))
    const flat = flattenTokens(tokens)
    const vars = Object.entries(flat)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join('\n')
    const css = `[data-theme="${productName}"] {\n${vars}\n}\n`
    const cssFile = file.replace('.json', '.css')
    fs.writeFileSync(path.join(themesDir, cssFile), css)
    console.log(`✓ Generated src/themes/${cssFile}`)
  }
}
```

Also update the `tokensToCSS` export so the test still passes (it tests `:root` for base — that's fine, the product selector is handled inline in `run()`).

- [ ] **Step 4.5: Regenerate CSS files**

```bash
node scripts/generate-themes.js
```

Verify `src/themes/product-1.css` now starts with `[data-theme="product-1"] {`.

- [ ] **Step 4.6: Run all tests**

```bash
npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 4.7: Commit**

```bash
git add src/themes/ThemeProvider.tsx tests/ThemeProvider.test.tsx scripts/generate-themes.js src/themes/
git commit -m "feat: add ThemeProvider with data-theme scoped CSS variables"
```

---

## Task 5: Storybook theme switcher

**Files:**
- Modify: `.storybook/main.ts`
- Create: `.storybook/preview.tsx`

- [ ] **Step 5.1: Replace `.storybook/preview.tsx` (or `.js`) with theme-switcher config**

If the file is `.storybook/preview.js`, rename to `.storybook/preview.tsx` first:
```bash
mv .storybook/preview.js .storybook/preview.tsx 2>/dev/null || true
```

```tsx
// .storybook/preview.tsx
import React from 'react'
import type { Preview, Decorator } from '@storybook/react'
import { ThemeProvider, type ProductTheme } from '../src/themes/ThemeProvider'

const PRODUCTS: ProductTheme[] = ['product-1', 'product-2', 'product-3', 'product-4']

const withTheme: Decorator = (Story, context) => {
  const product = (context.globals.theme as ProductTheme) ?? 'product-1'
  return (
    <ThemeProvider product={product}>
      <Story />
    </ThemeProvider>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Product theme',
      defaultValue: 'product-1',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: PRODUCTS.map((p) => ({ value: p, title: p })),
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
}

export default preview
```

- [ ] **Step 5.2: Verify `.storybook/main.ts` references the correct framework**

Open `.storybook/main.ts` and confirm it contains `framework: '@storybook/react-vite'`. If it says `@storybook/react-webpack5`, replace it:

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

- [ ] **Step 5.3: Commit**

```bash
git add .storybook/
git commit -m "feat: configure Storybook with global product theme switcher toolbar"
```

---

## Task 6: `sync-figma.js` — Figma API → token files

**Files:**
- Create: `scripts/sync-figma.js`

This script calls the Figma REST Variables API, maps variable modes to product token files, and writes updated JSON. It then calls `generate-themes.js` to regenerate CSS.

> **Note:** This script requires `FIGMA_TOKEN` and `FIGMA_FILE_KEY` environment variables. These are set up by the user in Task 9 (FIGMA_SETUP.md).

- [ ] **Step 6.1: Create `scripts/sync-figma.js`**

```javascript
// scripts/sync-figma.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY

if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ Missing required environment variables.')
  console.error('   Set FIGMA_TOKEN and FIGMA_FILE_KEY before running this script.')
  console.error('   See FIGMA_SETUP.md for instructions.')
  process.exit(1)
}

/** Convert Figma RGBA float object to hex string */
function figmaColorToHex({ r, g, b, a = 1 }) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0')
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return a < 1 ? `${hex}${toHex(a)}` : hex
}

/** Resolve a variable value — may be an alias to another variable */
function resolveValue(value, variables) {
  if (value?.type === 'VARIABLE_ALIAS') {
    const aliased = variables[value.id]
    if (!aliased) return null
    // Return first mode's value for aliases (aliases should be consistent across modes)
    const firstModeValue = Object.values(aliased.valuesByMode)[0]
    return resolveValue(firstModeValue, variables)
  }
  return value
}

/** Convert a Figma variable name like "color/primary/500" to nested object path */
function nameToPath(name) {
  return name.split('/').map(s => s.trim().toLowerCase().replace(/\s+/g, '-'))
}

/** Set a value at a nested path in an object */
function setAtPath(obj, pathParts, value) {
  let current = obj
  for (let i = 0; i < pathParts.length - 1; i++) {
    if (!current[pathParts[i]]) current[pathParts[i]] = {}
    current = current[pathParts[i]]
  }
  current[pathParts[pathParts.length - 1]] = value
}

async function fetchFigmaVariables() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma API error ${res.status}: ${text}`)
  }
  return res.json()
}

async function run() {
  console.log('🔄 Fetching variables from Figma...')
  const data = await fetchFigmaVariables()

  const { variables, variableCollections } = data.meta

  // Find the color variable collection (the one with 4 modes = 4 products)
  const colorCollection = Object.values(variableCollections).find(
    (c) => c.modes.length === 4
  )

  if (!colorCollection) {
    console.error('❌ Could not find a variable collection with exactly 4 modes.')
    console.error('   Make sure your Figma file has one collection with 4 product color modes.')
    process.exit(1)
  }

  console.log(`✓ Found color collection: "${colorCollection.name}"`)
  console.log(`  Modes: ${colorCollection.modes.map(m => m.name).join(', ')}`)

  const tokensDir = path.join(ROOT, 'tokens')

  // Build one token object per mode
  for (let i = 0; i < colorCollection.modes.length; i++) {
    const mode = colorCollection.modes[i]
    const productKey = `product-${i + 1}`
    const tokenObj = {}

    for (const variable of Object.values(variables)) {
      if (variable.variableCollectionId !== colorCollection.id) continue
      if (variable.resolvedType !== 'COLOR') continue

      const rawValue = variable.valuesByMode[mode.modeId]
      const resolved = resolveValue(rawValue, variables)
      if (!resolved) continue

      const hexValue = figmaColorToHex(resolved)
      const pathParts = nameToPath(variable.name)
      setAtPath(tokenObj, pathParts, hexValue)
    }

    const outFile = path.join(tokensDir, `${productKey}.json`)
    fs.writeFileSync(outFile, JSON.stringify(tokenObj, null, 2) + '\n')
    console.log(`✓ Wrote tokens/${productKey}.json (mode: "${mode.name}")`)
  }

  // Regenerate CSS
  console.log('\n🎨 Regenerating CSS variables...')
  const { execSync } = await import('child_process')
  execSync('node scripts/generate-themes.js', { cwd: ROOT, stdio: 'inherit' })

  console.log('\n✅ Sync complete! Run `npm run storybook` to preview updated themes.')
}

run().catch((err) => {
  console.error('❌ Sync failed:', err.message)
  process.exit(1)
})
```

- [ ] **Step 6.2: Commit**

```bash
git add scripts/sync-figma.js
git commit -m "feat: add sync-figma script — Figma Variables API → token JSON files"
```

---

## Task 7: Button component — example using CSS variables

**Files:**
- Create: `src/components/Button/Button.tsx`
- Create: `src/components/Button/Button.stories.tsx`

This validates the entire theme system works end-to-end in Storybook.

- [ ] **Step 7.1: Create `src/components/Button/Button.tsx`**

```tsx
// src/components/Button/Button.tsx
import React from 'react'

export interface ButtonProps {
  /** Button label */
  label: string
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: 'var(--spacing-1) var(--spacing-3)', fontSize: 'var(--typography-fontSize-sm)' },
  md: { padding: 'var(--spacing-2) var(--spacing-4)', fontSize: 'var(--typography-fontSize-base)' },
  lg: { padding: 'var(--spacing-3) var(--spacing-6)', fontSize: 'var(--typography-fontSize-lg)' },
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-primary-500)',
    color: '#fff',
    border: '2px solid var(--color-primary-500)',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary-600)',
    border: '2px solid var(--color-primary-500)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary-600)',
    border: '2px solid transparent',
  },
}

export function Button({ label, variant = 'primary', size = 'md', disabled = false, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: 'var(--borderRadius-md)',
        fontFamily: 'var(--typography-fontFamily-sans)',
        fontWeight: 'var(--typography-fontWeight-medium)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 7.2: Create `src/components/Button/Button.stories.tsx`**

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { label: 'Click me', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { label: 'Click me', variant: 'secondary', size: 'md' },
}

export const Ghost: Story = {
  args: { label: 'Click me', variant: 'ghost', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Ghost" variant="ghost" />
      <Button label="Disabled" disabled />
    </div>
  ),
}
```

- [ ] **Step 7.3: Start Storybook and verify theme switching works**

```bash
npm run storybook
```

1. Open `http://localhost:6006`
2. Click **Components > Button** in the sidebar
3. See all button variants rendered
4. Use the **Theme** toolbar dropdown to switch between product-1, product-2, product-3, product-4
5. Verify the button color changes with each theme

Stop with Ctrl+C.

- [ ] **Step 7.4: Commit**

```bash
git add src/components/
git commit -m "feat: add Button component and Storybook story as design system example"
```

---

## Task 8: `package.json` scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 8.1: Add all npm scripts to `package.json`**

Open `package.json` and update the `"scripts"` block to:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "test": "vitest run",
  "test:watch": "vitest",
  "generate-themes": "node scripts/generate-themes.js",
  "sync-figma": "node scripts/sync-figma.js"
}
```

- [ ] **Step 8.2: Run all tests to confirm everything still passes**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 8.3: Commit**

```bash
git add package.json
git commit -m "chore: add npm scripts for storybook, sync-figma, generate-themes, and test"
```

---

## Task 9: Figma MCP setup guide for non-technical users

**Files:**
- Create: `FIGMA_SETUP.md`

- [ ] **Step 9.1: Create `FIGMA_SETUP.md`**

```markdown
# Figma Setup Guide

Follow these steps once to connect your Figma design system to this project.

---

## Step 1: Get your Figma personal access token

1. Open Figma in your browser and log in
2. Click your profile picture (top-left) → **Settings**
3. Scroll to **Personal access tokens**
4. Click **Generate new token**, give it a name (e.g. "Claude Code")
5. Copy the token — you'll need it in the next step

---

## Step 2: Get your Figma file key

1. Open your design system Figma file
2. Look at the URL — it looks like: `https://www.figma.com/file/ABC123XYZ/My-Design-System`
3. The file key is the part after `/file/` — in this example: `ABC123XYZ`

---

## Step 3: Configure the Figma MCP in Claude Code

1. Open Claude Code
2. Press **Cmd+,** (Mac) or go to **Settings**
3. Find **MCP Servers** and add the Figma MCP with your token

Or tell Claude Code:
> "Set up the Figma MCP with my token: [paste your token here]"

---

## Step 4: Create a `.env` file for the sync script

In the project folder, create a file called `.env` with:

```
FIGMA_TOKEN=your_token_here
FIGMA_FILE_KEY=your_file_key_here
```

Replace `your_token_here` and `your_file_key_here` with your actual values.

> ⚠️ Never share this file or commit it to git. It's already in `.gitignore`.

---

## Step 5: Run the first sync

In the Claude Code terminal, run:

```bash
npm run sync-figma
```

This reads your Figma variables and generates the 4 product theme files.

---

## Step 6: Preview in Storybook

```bash
npm run storybook
```

Use the **Theme** dropdown in the toolbar to switch between your 4 product themes.

---

## Ongoing use

| What happened | What to run |
|--------------|-------------|
| Designer updated Figma colors | `npm run sync-figma` |
| Want to browse components | `npm run storybook` |
| Want to build a new product page | Tell Claude: "Build a [page] for [Product N] using the design system" |
```

- [ ] **Step 9.2: Add `.env` to `.gitignore`**

```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

- [ ] **Step 9.3: Commit**

```bash
git add FIGMA_SETUP.md .gitignore
git commit -m "docs: add Figma setup guide for non-technical users"
```

---

## Task 10: Final verification

- [ ] **Step 10.1: Run all tests**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 10.2: Start Storybook and do a full walkthrough**

```bash
npm run storybook
```

Verify:
- Storybook opens at `http://localhost:6006`
- Button component is visible under Components
- Theme switcher toolbar is visible (paint brush icon)
- Switching themes changes button colors
- All 4 themes look different

Stop with Ctrl+C.

- [ ] **Step 10.3: Final commit**

```bash
git add -A
git status  # should be clean
```

If any untracked files, commit them:
```bash
git add -A
git commit -m "chore: final cleanup and verification"
```

---

## What's next

Once the design system is set up:

1. **Add real Figma components:** Tell Claude Code "Read my Figma file [URL] and generate React components for every component in the [Component Library] page"
2. **Sync when Figma changes:** Run `npm run sync-figma`
3. **Build product pages:** Tell Claude Code "Build a homepage for Product 2 using the design system components, with a hero, features grid, and CTA"
