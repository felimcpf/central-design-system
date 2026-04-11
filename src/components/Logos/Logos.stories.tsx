import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─── Asset paths (served from /public/logos/) ─────────────────────────────────

// Icons (no text)
const ICONS: Record<string, { noBg: string; bg?: string; w: number; h: number }> = {
  docCentral:    { noBg: '/logos/docCentral-icon-no-bg.svg',    bg: '/logos/docCentral-icon-bg.svg',    w: 80,   h: 76.67 },
  navCentral:    { noBg: '/logos/navCentral-icon.svg',                                                  w: 80,   h: 80    },
  chatCentral:   { noBg: '/logos/chatCentral-icon.svg',                                                 w: 80,   h: 70    },
  draftCentral:  { noBg: '/logos/draftCentral-icon.svg',                                                w: 55.9, h: 80.4  },
  formCentral:   { noBg: '/logos/formCentral-icon.svg',                                                 w: 87.8, h: 64.6  },
  searchCentral: { noBg: '/logos/searchCentral-icon.svg',                                               w: 76.3, h: 78.3  },
  genCentral:    { noBg: '/logos/genCentral-icon.svg',                                                  w: 80,   h: 80    },
  senseCentral:  { noBg: '/logos/senseCentral-icon.svg',                                                w: 80,   h: 80    },
  promptCentral: { noBg: '/logos/promptCentral-icon.png',                                               w: 80,   h: 57.4  },
  agentCentral:  { noBg: '/logos/agentCentral-icon.svg',                                                w: 80,   h: 65.3  },
  appCentral:    { noBg: '/logos/appCentral-icon-no-bg.svg',    bg: '/logos/appCentral-icon-bg.svg',    w: 80,   h: 75    },
}

// Full logos with text (vector SVGs — icon + wordmark combined)
const FULL_LOGOS: Record<string, { src: string; w: number; h: number }> = {
  docCentral:    { src: '/logos/docCentral-full-logo.svg',    w: 617,    h: 77    },
  navCentral:    { src: '/logos/navCentral-full-logo.svg',    w: 613.3,  h: 79.5  },
  askNav:        { src: '/logos/askNav-full-logo.svg',        w: 463,    h: 79.5  },
  chatCentral:   { src: '/logos/chatCentral-full-logo.svg',   w: 650.1,  h: 71.3  },
  draftCentral:  { src: '/logos/draftCentral-full-logo.svg',  w: 669.3,  h: 76.3  },
  formCentral:   { src: '/logos/formCentral-full-logo.svg',   w: 655.3,  h: 80    },
  searchCentral: { src: '/logos/searchCentral-full-logo.svg', w: 739.9,  h: 78.3  },
  genCentral:    { src: '/logos/genCentral-full-logo.svg',    w: 609.2,  h: 92.2  },
  senseCentral:  { src: '/logos/senseCentral-full-logo.svg',  w: 705.3,  h: 80    },
  promptCentral: { src: '/logos/promptCentral-full-logo.svg', w: 784.8,  h: 91.2  },
  agentCentral:  { src: '/logos/agentCentral-full-logo.svg',  w: 635.1,  h: 95.8  },
  appCentral:    { src: '/logos/appCentral-full-logo-vector.svg', w: 629.6, h: 91.2 },
}

// Text-editable icon files (100×100 bounding box)
const EDITABLE_ICONS: Record<string, string> = {
  docCentral:    '/logos/docCentral-icon-bg.svg',
  navCentral:    '/logos/navCentral-icon.svg',
  askNav:        '/logos/navCentral-icon.svg',
  chatCentral:   '/logos/chatCentral-icon.svg',
  draftCentral:  '/logos/draftCentral-icon.svg',
  formCentral:   '/logos/formCentral-icon.svg',
  searchCentral: '/logos/searchCentral-text-editable-icon.svg',
  genCentral:    '/logos/genCentral-text-editable-icon.svg',
  senseCentral:  '/logos/senseCentral-text-editable-icon.svg',
  promptCentral: '/logos/promptCentral-text-editable-icon.svg',
  agentCentral:  '/logos/agentCentral-icon.svg',
  appCentral:    '/logos/appCentral-icon-no-bg.svg',
}

// Product text colours (Lexend Medium)
const TEXT_COLORS: Record<string, string> = {
  docCentral:    '#255608',
  navCentral:    '#172faf',
  askNav:        '#172faf',
  chatCentral:   '#8300ea',
  draftCentral:  '#3f78c7',
  formCentral:   '#009688',
  searchCentral: '#045037',
  genCentral:    '#6745ec',
  senseCentral:  '#2f91c6',
  promptCentral: '#d845f0',
  agentCentral:  '#fd5288',
  appCentral:    '#000000',
}

// Ordered list
const PRODUCTS_WITH_TEXT = [
  'docCentral', 'navCentral', 'askNav', 'chatCentral', 'draftCentral',
  'formCentral', 'searchCentral', 'genCentral', 'senseCentral',
  'promptCentral', 'agentCentral', 'appCentral',
]

const PRODUCTS_NO_TEXT = [
  'docCentral', 'navCentral', 'chatCentral', 'draftCentral', 'formCentral',
  'searchCentral', 'genCentral', 'senseCentral', 'promptCentral',
  'agentCentral', 'appCentral',
]

// ─── Shared styles ────────────────────────────────────────────────────────────

const sectionTitle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: '#262626',
  margin: '0 0 4px',
}

const subTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: '#262626',
  margin: '0 0 16px',
}

const caption: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: '#6b7280',
  margin: '0 0 24px',
}

const divider: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #d9d9d9',
  margin: '32px 0',
}

// ─── Placeholder (dummy component for Storybook meta) ─────────────────────────
function LogosPlaceholder() {
  return <div />
}

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Atoms/Logos',
  component: LogosPlaceholder,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

// ─── 1. Logos with text ───────────────────────────────────────────────────────
export const LogosWithText: Story = {
  name: 'Logos with text',
  render: () => (
    <div style={{ maxWidth: 860, fontFamily: 'sans-serif' }}>
      <h1 style={sectionTitle}>Logos with text</h1>
      <p style={{ ...caption, marginBottom: 8 }}>
        Product logos under the Frontier Product Team come in five variants, for five of our current active products
      </p>
      <p style={{ ...caption, marginBottom: 24 }}>
        Text based logos come in two forms, with an editable text version and fully vector version of the product logos
      </p>
      <hr style={divider} />

      {/* Vector Based */}
      <h2 style={subTitle}>Vector Based Logos</h2>
      <p style={{ ...caption, marginBottom: 20 }}>Scalable logos are below for all products in FPT:</p>

      <div style={{
        border: '1.5px dashed #d9d9d9',
        borderRadius: 12,
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginBottom: 40,
      }}>
        {PRODUCTS_WITH_TEXT.map(product => {
          const logo = FULL_LOGOS[product]
          if (!logo) return null
          const displayH = 50
          const displayW = (logo.w / logo.h) * displayH
          return (
            <div key={product} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logo.src}
                alt={product}
                width={displayW}
                height={displayH}
                style={{ display: 'block', objectFit: 'contain' }}
              />
            </div>
          )
        })}
      </div>

      {/* Text Based (editable) */}
      <h2 style={subTitle}>Text Based Logos</h2>
      <p style={{ ...caption, marginBottom: 20 }}>Text editable logos are below for all products in FPT:</p>

      <div style={{
        border: '1.5px dashed #d9d9d9',
        borderRadius: 12,
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginBottom: 40,
      }}>
        {PRODUCTS_WITH_TEXT.map(product => {
          const iconSrc = EDITABLE_ICONS[product]
          const color = TEXT_COLORS[product]
          return (
            <div key={product} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <img
                  src={iconSrc}
                  alt={`${product} icon`}
                  style={{ width: 64, height: 64, objectFit: 'contain' }}
                />
              </div>
              <span style={{
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 500,
                fontSize: 48,
                color,
                lineHeight: 1,
                letterSpacing: '-0.5px',
              }}>
                {product}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  ),
}

// ─── 2. Logos without text ────────────────────────────────────────────────────
export const LogosWithoutText: Story = {
  name: 'Logos without text',
  render: () => (
    <div style={{ maxWidth: 500, fontFamily: 'sans-serif' }}>
      <h1 style={sectionTitle}>Logos without text</h1>
      <p style={{ ...caption, marginBottom: 8 }}>
        Product logos under the Frontier Product Team come in five variants, for five of our current active products
      </p>
      <hr style={divider} />

      <h2 style={subTitle}>Logo (without text)</h2>
      <p style={{ ...caption, marginBottom: 24 }}>
        Logos without text come in two forms, with or without a white background
      </p>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 100px 100px', gap: 0, marginBottom: 8 }}>
        <div />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#858585', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>No BG</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#858585', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>BG</span>
      </div>

      <div style={{
        border: '1.5px dashed #d9d9d9',
        borderRadius: 12,
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        {PRODUCTS_NO_TEXT.map(product => {
          const icon = ICONS[product]
          if (!icon) return null
          return (
            <div key={product} style={{
              display: 'grid',
              gridTemplateColumns: '160px 100px 100px',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0',
            }}>
              {/* Label */}
              <span style={{ fontSize: 13, fontWeight: 500, color: '#262626' }}>{product}</span>

              {/* No BG */}
              <div style={{
                width: 100,
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={icon.noBg}
                  alt={`${product} no bg`}
                  style={{ maxWidth: 80, maxHeight: 80, objectFit: 'contain' }}
                />
              </div>

              {/* BG (white card) */}
              <div style={{
                width: 100,
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: 80,
                  height: 80,
                  background: '#ffffff',
                  borderRadius: 4,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={icon.bg ?? icon.noBg}
                    alt={`${product} bg`}
                    style={{ maxWidth: 64, maxHeight: 64, objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  ),
}

// ─── 3. Logos with tag ────────────────────────────────────────────────────────

function AlphaTag() {
  return (
    <div style={{
      background: 'var(--color-primary-50, #edf0fd)',
      borderRadius: 12,
      padding: '6px 16px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
    }}>
      <img src="/logos/alpha-tag.svg" alt="Alpha" style={{ height: 26, objectFit: 'contain' }} />
    </div>
  )
}

function BetaTag() {
  return (
    <div style={{
      background: '#f0f0f0',
      borderRadius: 12,
      padding: '6px 16px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
    }}>
      <img src="/logos/beta-tag.svg" alt="Beta" style={{ height: 21, objectFit: 'contain' }} />
    </div>
  )
}

export const LogosWithTag: Story = {
  name: 'Logos with tag',
  render: () => (
    <div style={{ maxWidth: 800, fontFamily: 'sans-serif' }}>
      <h1 style={sectionTitle}>Logos with tag</h1>
      <hr style={divider} />

      {/* Master — just the tags */}
      <p style={{ ...subTitle, color: '#702acb' }}>Master</p>
      <div style={{
        border: '1.5px dashed #c084fc',
        borderRadius: 12,
        padding: '24px',
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 16,
        marginBottom: 40,
      }}>
        <AlphaTag />
        <BetaTag />
      </div>

      {/* Component — navCentral logo + tags */}
      <p style={{ ...subTitle, color: '#702acb', marginTop: 8 }}>Component</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <img
          src="/logos/navCentral-logo-with-tag.svg"
          alt="navCentral"
          style={{ height: 50, objectFit: 'contain' }}
        />
        <AlphaTag />
        <BetaTag />
      </div>
    </div>
  ),
}

// ─── 4. All three sections in one view ───────────────────────────────────────
export const AllLogos: Story = {
  name: 'All Logos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, maxWidth: 900, fontFamily: 'sans-serif' }}>

      {/* ── With text ── */}
      <section>
        <h2 style={{ ...sectionTitle, marginBottom: 4 }}>Logos with text</h2>
        <p style={{ ...caption, marginBottom: 20 }}>Vector-based (icon + wordmark in one SVG)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PRODUCTS_WITH_TEXT.map(product => {
            const logo = FULL_LOGOS[product]
            if (!logo) return null
            const h = 44
            const w = (logo.w / logo.h) * h
            return (
              <img key={product} src={logo.src} alt={product} width={w} height={h}
                style={{ display: 'block', objectFit: 'contain' }} />
            )
          })}
        </div>
      </section>

      {/* ── Without text ── */}
      <section>
        <h2 style={{ ...sectionTitle, marginBottom: 4 }}>Logos without text</h2>
        <p style={{ ...caption, marginBottom: 20 }}>Icon only — two variants per product (no background / white background)</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
        }}>
          {PRODUCTS_NO_TEXT.map(product => {
            const icon = ICONS[product]
            if (!icon) return null
            return (
              <div key={product} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#858585' }}>{product}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {/* No BG */}
                  <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={icon.noBg} alt="" style={{ maxWidth: 56, maxHeight: 56, objectFit: 'contain' }} />
                  </div>
                  {/* BG */}
                  <div style={{
                    width: 64, height: 64,
                    background: '#fff',
                    borderRadius: 6,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img src={icon.bg ?? icon.noBg} alt="" style={{ maxWidth: 48, maxHeight: 48, objectFit: 'contain' }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── With tag ── */}
      <section>
        <h2 style={{ ...sectionTitle, marginBottom: 4 }}>Logos with tag</h2>
        <p style={{ ...caption, marginBottom: 20 }}>Used to indicate product lifecycle stage (Alpha / Beta)</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <img src="/logos/navCentral-logo-with-tag.svg" alt="navCentral" style={{ height: 44, objectFit: 'contain' }} />
          <AlphaTag />
          <BetaTag />
        </div>
      </section>

    </div>
  ),
  parameters: { layout: 'padded' },
}
