// scripts/sync-figma.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY

// Node ID of the "↳ Colours" page in the FPT DLS file
const COLOURS_PAGE_NODE_ID = '2:4574'

// Maps Figma frame names → token file names
const PRODUCT_FRAME_MAP = {
  'docCentral Colours': 'doc-central',
  'navCentral Colours': 'nav-central',
  'draftCentral Colours': 'draft-central',
  'agentCentral Colours': 'agent-central',
}

if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ Missing required environment variables.')
  console.error('   Set FIGMA_TOKEN and FIGMA_FILE_KEY before running this script.')
  console.error('   See FIGMA_SETUP.md for instructions.')
  process.exit(1)
}

/** Convert Figma RGBA float (0-1) to hex string */
function figmaColorToHex({ r, g, b }) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/** Recursively collect all RECTANGLE nodes with solid fills */
function collectColorRects(node, results = []) {
  if (node.type === 'RECTANGLE') {
    const fills = node.fills ?? []
    const solid = fills.find(f => f.type === 'SOLID')
    if (solid) {
      results.push({ name: node.name, color: figmaColorToHex(solid.color) })
    }
  }
  for (const child of node.children ?? []) {
    collectColorRects(child, results)
  }
  return results
}

/** Convert a color scale name like "800" → nested path ["primary", "800"] */
function parseColorName(name) {
  // Scale steps map to primary palette
  const scaleSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
  if (scaleSteps.includes(name.trim())) {
    return ['primary', name.trim()]
  }
  return null
}

async function fetchColoursPage() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${COLOURS_PAGE_NODE_ID}&depth=8`
  const res = await fetch(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma API error ${res.status}: ${text}`)
  }
  const data = await res.json()
  return data.nodes[COLOURS_PAGE_NODE_ID].document
}

async function run() {
  console.log('🔄 Fetching colour palettes from Figma...')
  const page = await fetchColoursPage()

  const tokensDir = path.join(ROOT, 'tokens')
  let updated = 0

  for (const [frameName, productKey] of Object.entries(PRODUCT_FRAME_MAP)) {
    // Find the frame by name
    const frame = page.children?.find(c => c.name === frameName && c.type === 'FRAME')
    if (!frame) {
      console.warn(`⚠️  Frame "${frameName}" not found — skipping ${productKey}`)
      continue
    }

    // Collect all rectangle colors in this frame
    const rects = collectColorRects(frame)

    // Build primary color scale from numbered rectangles
    const primary = {}
    for (const { name, color } of rects) {
      const parsed = parseColorName(name)
      if (parsed) {
        primary[parsed[1]] = color
      }
    }

    if (Object.keys(primary).length === 0) {
      console.warn(`⚠️  No color scale found in "${frameName}" — skipping`)
      continue
    }

    // Read existing token file to preserve non-primary entries (neutral, success, etc.)
    const tokenFile = path.join(tokensDir, `${productKey}.json`)
    let existing = {}
    if (fs.existsSync(tokenFile)) {
      existing = JSON.parse(fs.readFileSync(tokenFile, 'utf8'))
    }

    // Update only the primary color scale
    const updated_tokens = {
      ...existing,
      color: {
        ...(existing.color ?? {}),
        primary,
      },
    }

    fs.writeFileSync(tokenFile, JSON.stringify(updated_tokens, null, 2) + '\n')
    console.log(`✓ Updated tokens/${productKey}.json (${Object.keys(primary).length} primary colors)`)
    updated++
  }

  if (updated === 0) {
    console.error('❌ No tokens updated — check your Figma file structure.')
    process.exit(1)
  }

  // Regenerate CSS
  console.log('\n🎨 Regenerating CSS variables...')
  execSync('node scripts/generate-themes.js', { cwd: ROOT, stdio: 'inherit' })

  console.log('\n✅ Sync complete! Run `npm run storybook` to preview updated themes.')
}

run().catch((err) => {
  console.error('❌ Sync failed:', err.message)
  process.exit(1)
})
