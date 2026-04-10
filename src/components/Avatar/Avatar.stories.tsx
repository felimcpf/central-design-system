import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: ['navy', 'orange', 'purple', 'green', 'maroon', 'aqua'] },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: { initials: 'AB', color: 'navy', size: 'md' },
}

export const WithStatus: Story = {
  args: { initials: 'JD', color: 'green', size: 'md', showStatus: true },
}

export const Disabled: Story = {
  args: { initials: 'CD', size: 'md', disabled: true },
}

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['navy', 'orange', 'purple', 'green', 'maroon', 'aqua'] as const).map(color => (
        <Avatar key={color} initials={color.slice(0, 2).toUpperCase()} color={color} size="md" />
      ))}
      <Avatar initials="DI" size="md" disabled />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="SM" color="navy" size="sm" />
      <Avatar initials="MD" color="navy" size="md" />
    </div>
  ),
}

export const Stacked: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { initials: 'AB', color: 'navy' },
        { initials: 'CD', color: 'orange' },
        { initials: 'EF', color: 'green' },
        { initials: 'GH', color: 'aqua' },
        { initials: 'IJ', color: 'purple' },
        { initials: 'KL', color: 'maroon' },
        { initials: 'MN', color: 'navy' },
      ]}
      size="md"
      max={5}
    />
  ),
}
