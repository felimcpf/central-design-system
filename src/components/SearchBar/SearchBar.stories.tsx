import type { Meta, StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Organisms/SearchBar',
  component: SearchBar,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  args: { placeholder: 'Search...', size: 'md' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <SearchBar placeholder="Small search" size="sm" />
      <SearchBar placeholder="Medium search" size="md" />
      <SearchBar placeholder="Large search" size="lg" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: 'Search disabled', disabled: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}
