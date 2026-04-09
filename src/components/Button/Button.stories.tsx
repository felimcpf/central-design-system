// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { label: 'Click me', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { label: 'Click me', variant: 'secondary', size: 'md' },
}

export const Ghost: Story = {
  args: { label: 'Click me', variant: 'ghost', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Ghost" variant="ghost" />
      <Button label="Disabled" disabled />
    </div>
  ),
}
