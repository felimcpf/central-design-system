import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tags'

const meta: Meta<typeof Tag> = {
  title: 'Molecules/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    state: { control: 'select', options: ['default', 'hover', 'pressed', 'disabled'] },
  },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: { label: 'tag', size: 'md', state: 'default' },
}

export const WithIcon: Story = {
  args: { label: 'tag', size: 'md', withIcon: true },
}

export const WithClose: Story = {
  args: { label: 'tag', size: 'md', onClose: () => {} },
}

export const WithIconAndClose: Story = {
  args: { label: 'tag', size: 'md', withIcon: true, onClose: () => {} },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag label="Large" size="lg" withIcon onClose={() => {}} />
      <Tag label="Medium" size="md" withIcon onClose={() => {}} />
      <Tag label="Small" size="sm" withIcon onClose={() => {}} />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {(['default', 'hover', 'pressed', 'disabled'] as const).map(state => (
        <Tag key={state} label={state} size="md" state={state} withIcon onClose={() => {}} />
      ))}
    </div>
  ),
}
