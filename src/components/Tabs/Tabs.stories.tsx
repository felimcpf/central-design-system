import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Tabs>

const tabItems = [
  { label: 'Overview', content: 'Overview content goes here. This tab provides a summary.' },
  { label: 'Details', content: 'Detailed information is shown here with additional specifics.' },
  { label: 'Settings', content: 'Configuration and settings can be found in this tab.' },
]

export const Default: Story = {
  args: { items: tabItems, defaultIndex: 0 },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
}

export const TwoTabs: Story = {
  args: {
    items: [
      { label: 'Left Tab', content: 'Content for the left tab.' },
      { label: 'Right Tab', content: 'Content for the right tab.' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export const ManyTabs: Story = {
  args: {
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
      { label: 'Tab 5' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
}
