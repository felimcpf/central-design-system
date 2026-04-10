import type { Meta, StoryObj } from '@storybook/react'
import { LinkCard, LinkCardGrid } from './LinkCard'

function DocIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 7H12M6 10H12M6 13H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}
function LinkIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7.5 10.5L10.5 7.5M10.5 12L12.5 10C13.5 9 13.5 7.5 12.5 6.5L11.5 5.5C10.5 4.5 9 4.5 8 5.5L6 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7.5 6L5.5 8C4.5 9 4.5 10.5 5.5 11.5L6.5 12.5C7.5 13.5 9 13.5 10 12.5L12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}
function CalIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 8H16M6 2V5M12 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}

const meta: Meta<typeof LinkCard> = {
  title: 'Templates/LinkCard',
  component: LinkCard,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof LinkCard>

export const Default: Story = {
  args: {
    title: 'Board Meeting Minutes',
    description: 'Access all Board meeting minutes and agendas from 2024.',
    href: '#',
    icon: <DocIcon />,
  },
  decorators: [(Story) => <div style={{ maxWidth: 300 }}><Story /></div>],
}

export const External: Story = {
  args: {
    title: 'SharePoint Portal',
    description: 'Access shared documents and resources on SharePoint.',
    href: '#',
    icon: <LinkIcon />,
    external: true,
  },
  decorators: [(Story) => <div style={{ maxWidth: 300 }}><Story /></div>],
}

export const WithTag: Story = {
  args: {
    title: 'Annual Report 2024',
    description: 'Download the full annual report for the financial year 2024.',
    href: '#',
    icon: <DocIcon />,
    tag: 'New',
  },
  decorators: [(Story) => <div style={{ maxWidth: 300 }}><Story /></div>],
}

export const CardGrid: Story = {
  render: () => (
    <LinkCardGrid
      columns={3}
      cards={[
        { title: 'Board Documents', description: 'Meeting minutes, agendas, and resolutions.', href: '#', icon: <DocIcon /> },
        { title: 'External Links', description: 'Useful resources and partner portals.', href: '#', icon: <LinkIcon />, external: true },
        { title: 'Calendar', description: 'View upcoming meetings and events.', href: '#', icon: <CalIcon />, tag: 'Updated' },
        { title: 'Reports', description: 'Quarterly and annual reports.', href: '#', icon: <DocIcon /> },
        { title: 'Policies', description: 'Governance policies and procedures.', href: '#', icon: <DocIcon /> },
        { title: 'Resources', description: 'Training materials and reference guides.', href: '#', icon: <LinkIcon /> },
      ]}
    />
  ),
  decorators: [(Story) => <div style={{ maxWidth: 900 }}><Story /></div>],
}
