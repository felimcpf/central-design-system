import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Page', href: '/section/page' },
      { label: 'Current Page' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documents', href: '/documents' },
      { label: 'Reports', href: '/documents/reports' },
      { label: '2024', href: '/documents/reports/2024' },
      { label: 'Q1 Report' },
    ],
  },
}
