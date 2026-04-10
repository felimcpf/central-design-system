import type { Meta, StoryObj } from '@storybook/react'
import { SideMenu } from './SideMenu'

function HomeIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 6.5L8 2L14 6.5V13.5H10V10H6V13.5H2V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function DocsIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6 6H10M6 9H10M6 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}
function SettingsIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M8 2V3.5M8 12.5V14M2 8H3.5M12.5 8H14M3.9 3.9L5 5M11 11L12.1 12.1M3.9 12.1L5 11M11 5L12.1 3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}
function UsersIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 13C2 10.7909 3.79086 9 6 9H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="11" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7.5 14C7.5 11.7909 9.04315 10 11 10C12.9569 10 14.5 11.7909 14.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}

const meta: Meta<typeof SideMenu> = {
  title: 'Organisms/SideMenu',
  component: SideMenu,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof SideMenu>

const groups = [
  {
    items: [
      { label: 'Home', icon: <HomeIcon />, href: '/' },
      { label: 'Documents', icon: <DocsIcon />, href: '/docs', badge: 3 },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Users', icon: <UsersIcon />, href: '/users' },
      { label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
    ],
  },
]

export const Default: Story = {
  args: { groups, activeItem: 'Home', productName: 'navCentral' },
  decorators: [(Story) => <div style={{ height: 500 }}><Story /></div>],
}

export const Collapsed: Story = {
  args: { groups, activeItem: 'Documents', collapsed: true },
  decorators: [(Story) => <div style={{ height: 500 }}><Story /></div>],
}
