import type { Meta, StoryObj } from '@storybook/react'
import { GlobalNavigation } from './GlobalNavigation'

const meta: Meta<typeof GlobalNavigation> = {
  title: 'Organisms/GlobalNavigation',
  component: GlobalNavigation,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['search', 'search-bell', 'links', 'mobile'],
    },
  },
}
export default meta

type Story = StoryObj<typeof GlobalNavigation>

export const WithSearch: Story = {
  name: 'Default — With Search Bar',
  args: {
    variant: 'search',
    logoSrc: '/logos/navCentral-full-logo.svg',
    searchPlaceholder: 'Search in navCentral',
    userInitials: 'WW',
  },
}

export const WithSearchAndBell: Story = {
  name: 'With Bell Icon',
  args: {
    variant: 'search-bell',
    logoSrc: '/logos/navCentral-full-logo.svg',
    searchPlaceholder: 'Search in navCentral',
    userInitials: 'WW',
  },
}

export const WithLinks: Story = {
  name: 'With Text Nav Links',
  args: {
    variant: 'links',
    logoSrc: '/logos/docCentral-full-logo.svg',
    navLinks: [
      { label: 'Dashboard', href: '/', active: true },
      { label: 'Guide', href: '/guide' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Download Add-In', href: '/download' },
    ],
    userInitials: 'WW',
  },
}

export const Mobile: Story = {
  name: 'Mobile',
  args: {
    variant: 'mobile',
    logoIconSrc: '/logos/navCentral-icon.svg',
    searchPlaceholder: 'Search in navCentral',
    userInitials: 'WW',
  },
}
