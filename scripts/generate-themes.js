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

  // Generate base.css from base.json — uses :root (shared, always active)
  const base = JSON.parse(fs.readFileSync(path.join(tokensDir, 'base.json'), 'utf8'))
  fs.writeFileSync(path.join(themesDir, 'base.css'), tokensToCSS(flattenTokens(base)))
  console.log('✓ Generated src/themes/base.css')

  // Generate product CSS — scoped to [data-theme="product-name"]
  for (const file of fs.readdirSync(tokensDir).sort()) {
    if (file === 'base.json' || !file.endsWith('.json')) continue
    const productName = file.replace('.json', '')  // e.g. "doc-central"
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

// Only run when invoked directly (not when imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run()
}
