import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─── Application Illustrations ────────────────────────────────────────────────

function EmptyStateIllustration({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const w = size === 'sm' ? 80 : 160
  const h = size === 'sm' ? 80 : 160
  return (
    <svg width={w} height={h} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="80" fill="var(--color-primary-50, #EBF2FC)" />
      <rect x="40" y="50" width="80" height="10" rx="5" fill="var(--color-primary-200, #B0CCF3)" />
      <rect x="40" y="70" width="60" height="10" rx="5" fill="var(--color-primary-200, #B0CCF3)" />
      <rect x="40" y="90" width="70" height="10" rx="5" fill="var(--color-primary-200, #B0CCF3)" />
      <circle cx="120" cy="45" r="20" fill="var(--color-primary-500, #5B8ED6)" opacity="0.15" />
      <path d="M113 45L119 51L127 43" stroke="var(--color-primary-500, #5B8ED6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchEmptyIllustration({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const w = size === 'sm' ? 80 : 160
  const h = size === 'sm' ? 80 : 160
  return (
    <svg width={w} height={h} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="80" fill="var(--color-neutral-100, #F9F9F9)" />
      <circle cx="72" cy="72" r="32" stroke="var(--color-neutral-400, #BCBCBC)" strokeWidth="3" fill="none" />
      <line x1="96" y1="96" x2="120" y2="120" stroke="var(--color-neutral-400, #BCBCBC)" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="72" x2="84" y2="72" stroke="var(--color-neutral-300, #D9D9D9)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="64" x2="78" y2="64" stroke="var(--color-neutral-300, #D9D9D9)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function ErrorIllustration({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const w = size === 'sm' ? 80 : 160
  const h = size === 'sm' ? 80 : 160
  return (
    <svg width={w} height={h} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="80" fill="#FEF3F3" />
      <circle cx="80" cy="80" r="36" stroke="#EF3434" strokeWidth="3" fill="none" opacity="0.3" />
      <line x1="68" y1="68" x2="92" y2="92" stroke="#EF3434" strokeWidth="3" strokeLinecap="round" />
      <line x1="92" y1="68" x2="68" y2="92" stroke="#EF3434" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function SuccessIllustration({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const w = size === 'sm' ? 80 : 160
  const h = size === 'sm' ? 80 : 160
  return (
    <svg width={w} height={h} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="80" fill="#F0FDF4" />
      <circle cx="80" cy="80" r="36" stroke="#22C55E" strokeWidth="3" fill="none" opacity="0.3" />
      <path d="M64 80L76 92L96 70" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UploadIllustration({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const w = size === 'sm' ? 80 : 160
  const h = size === 'sm' ? 80 : 160
  return (
    <svg width={w} height={h} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="80" fill="var(--color-primary-50, #EBF2FC)" />
      <rect x="52" y="60" width="56" height="44" rx="8" fill="white" stroke="var(--color-primary-200, #B0CCF3)" strokeWidth="2" />
      <path d="M80 48V84M80 48L70 58M80 48L90 58" stroke="var(--color-primary-500, #5B8ED6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="62" y="88" width="36" height="6" rx="3" fill="var(--color-primary-100, #D6E5F9)" />
    </svg>
  )
}

// ─── Marketing Illustrations (navCentral — navy blue) ─────────────────────────

function NavWelcomeIllustration() {
  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="200" rx="16" fill="#F0F4FF" />
      <rect x="60" y="60" width="70" height="90" rx="8" fill="white" stroke="#3B5998" strokeWidth="2" />
      <rect x="75" y="75" width="20" height="20" rx="3" fill="#3B5998" opacity="0.2" />
      <rect x="105" y="75" width="10" height="20" rx="2" fill="#3B5998" opacity="0.15" />
      <rect x="75" y="105" width="40" height="8" rx="3" fill="#3B5998" opacity="0.15" />
      <rect x="75" y="120" width="30" height="8" rx="3" fill="#3B5998" opacity="0.1" />
      <path d="M150 100 Q190 80 220 110 Q230 120 220 140" stroke="#3B5998" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" fill="none" opacity="0.5" />
      <circle cx="220" cy="140" r="12" fill="#3B5998" opacity="0.15" />
      <circle cx="220" cy="140" r="5" fill="#3B5998" opacity="0.7" />
      <rect x="60" y="165" width="160" height="16" rx="4" fill="#3B5998" opacity="0.08" />
    </svg>
  )
}

function NavDocumentIllustration() {
  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="200" rx="16" fill="#F8FAFF" />
      <rect x="50" y="30" width="110" height="140" rx="10" fill="white" stroke="#3B5998" strokeWidth="2" />
      <rect x="70" y="55" width="70" height="8" rx="4" fill="#3B5998" opacity="0.3" />
      <rect x="70" y="73" width="50" height="6" rx="3" fill="#3B5998" opacity="0.15" />
      <rect x="70" y="89" width="60" height="6" rx="3" fill="#3B5998" opacity="0.15" />
      <rect x="70" y="105" width="45" height="6" rx="3" fill="#3B5998" opacity="0.15" />
      <rect x="70" y="121" width="55" height="6" rx="3" fill="#3B5998" opacity="0.1" />
      <circle cx="185" cy="130" r="36" fill="white" stroke="#3B5998" strokeWidth="2.5" />
      <circle cx="185" cy="130" r="24" stroke="#3B5998" strokeWidth="2" fill="none" opacity="0.3" />
      <rect x="176" y="124" width="18" height="5" rx="2.5" fill="#3B5998" opacity="0.5" />
      <rect x="176" y="133" width="14" height="5" rx="2.5" fill="#3B5998" opacity="0.3" />
      <line x1="203" y1="148" x2="218" y2="163" stroke="#3B5998" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const teamCx = [70, 140, 210]

function NavTeamIllustration() {
  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="200" rx="16" fill="#EEF2FF" />
      {teamCx.map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={90} r={26} fill="white" stroke="#3B5998" strokeWidth="2" opacity={0.9 - i * 0.1} />
          <circle cx={cx} cy={82} r={10} fill="#3B5998" opacity={0.2} />
          <path d={`M${cx - 16} 110 Q${cx} 102 ${cx + 16} 110`} stroke="#3B5998" strokeWidth="1.5" fill="none" opacity={0.2} />
        </g>
      ))}
      <line x1="96" y1="90" x2="114" y2="90" stroke="#3B5998" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
      <line x1="166" y1="90" x2="184" y2="90" stroke="#3B5998" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
      <rect x="70" y="142" width="140" height="8" rx="4" fill="#3B5998" opacity="0.1" />
      <rect x="90" y="158" width="100" height="6" rx="3" fill="#3B5998" opacity="0.07" />
    </svg>
  )
}

// ─── Story data ───────────────────────────────────────────────────────────────

const applicationIllos: Array<{ name: string; Component: React.FC<{ size: 'sm' | 'md' }> }> = [
  { name: 'Empty State', Component: EmptyStateIllustration },
  { name: 'Search Empty', Component: SearchEmptyIllustration },
  { name: 'Error', Component: ErrorIllustration },
  { name: 'Success', Component: SuccessIllustration },
  { name: 'Upload', Component: UploadIllustration },
]

const marketingIllos: Array<{ name: string; Component: React.FC }> = [
  { name: 'Welcome', Component: NavWelcomeIllustration },
  { name: 'Document', Component: NavDocumentIllustration },
  { name: 'Team', Component: NavTeamIllustration },
]

const sectionTitle: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: 14,
  fontWeight: 600,
  color: '#262626',
}

const meta: Meta = {
  title: 'Atoms/Illustrations',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const ApplicationSmall: Story = {
  name: 'Application — Small',
  render: () => (
    <div>
      <h3 style={sectionTitle}>Application Illustrations — Small (80px)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {applicationIllos.map(({ name, Component }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Component size="sm" />
            <span style={{ fontSize: 12, color: '#858585' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ApplicationMedium: Story = {
  name: 'Application — Medium',
  render: () => (
    <div>
      <h3 style={sectionTitle}>Application Illustrations — Medium (160px)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {applicationIllos.map(({ name, Component }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Component size="md" />
            <span style={{ fontSize: 12, color: '#858585' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const MarketingNavCentral: Story = {
  name: 'Marketing — navCentral',
  render: () => (
    <div>
      <h3 style={sectionTitle}>Marketing Illustrations — navCentral</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {marketingIllos.map(({ name, Component }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Component />
            <span style={{ fontSize: 12, color: '#858585' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const AllIllustrations: Story = {
  name: 'All Illustrations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div>
        <h3 style={sectionTitle}>Application — Small (80px)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {applicationIllos.map(({ name, Component }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Component size="sm" />
              <span style={{ fontSize: 12, color: '#858585' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={sectionTitle}>Application — Medium (160px)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {applicationIllos.map(({ name, Component }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <Component size="md" />
              <span style={{ fontSize: 12, color: '#858585' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={sectionTitle}>Marketing — navCentral</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {marketingIllos.map(({ name, Component }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <Component />
              <span style={{ fontSize: 12, color: '#858585' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
