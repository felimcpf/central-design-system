import type { Meta, StoryObj } from '@storybook/react'
import { GlobalNavigation } from './GlobalNavigation'
import { Avatar } from '../Avatar/Avatar'
import { SearchBar } from '../SearchBar/SearchBar'

const meta: Meta<typeof GlobalNavigation> = {
  title: 'Organisms/GlobalNavigation',
  component: GlobalNavigation,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof GlobalNavigation>

const navItems = [
  { label: 'Dashboard', href: '/', active: true },
  { label: 'Documents', href: '/docs' },
  { label: 'Reports', href: '/reports' },
  { label: 'Team', href: '/team' },
]

export const Default: Story = {
  args: {
    productName: 'navCentral',
    navItems,
    userAvatar: <Avatar initials="JD" color="orange" size="sm" />,
  },
}

export const WithSearch: Story = {
  args: {
    productName: 'docCentral',
    navItems,
    actions: (
      <div style={{ width: 220 }}>
        <SearchBar placeholder="Search..." size="sm" />
      </div>
    ),
    userAvatar: <Avatar initials="AB" color="green" size="sm" />,
  },
}

export const Minimal: Story = {
  args: {
    productName: 'draftCentral',
    userAvatar: <Avatar initials="CD" color="navy" size="sm" />,
  },
}
