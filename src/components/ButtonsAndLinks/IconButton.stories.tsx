import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconButton, type IconButtonStyle } from './ButtonsAndLinks'

function StarIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L12.39 7.26L18 8.18L14 12.08L14.95 17.67L10 15.11L5.05 17.67L6 12.08L2 8.18L7.61 7.26L10 2Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const meta: Meta<typeof IconButton> = {
  title: 'Molecules/ButtonsAndLinks/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md'] },
    styleVariant: {
      control: 'select',
      options: ['solid-primary', 'outline-primary', 'clear-primary', 'solid-neutral', 'outline-neutral', 'clear-neutral'],
    },
    state: { control: 'select', options: ['default', 'hover', 'pressed', 'disabled'] },
  },
}
export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: { icon: <StarIcon />, label: 'Favourite', size: 'lg', styleVariant: 'solid-primary' },
}

const allStyles: IconButtonStyle[] = [
  'solid-primary', 'outline-primary', 'clear-primary',
  'solid-neutral', 'outline-neutral', 'clear-neutral',
]

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {allStyles.map(v => (
        <IconButton key={v} icon={<StarIcon />} label={v} size="lg" styleVariant={v} />
      ))}
    </div>
  ),
}

export const LargeAndMedium: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon={<StarIcon size={20} />} label="Large" size="lg" styleVariant="solid-primary" />
      <IconButton icon={<StarIcon size={16} />} label="Medium" size="md" styleVariant="solid-primary" />
    </div>
  ),
}

export const DisabledState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {allStyles.map(v => (
        <IconButton key={v} icon={<StarIcon />} label={v} size="lg" styleVariant={v} state="disabled" />
      ))}
    </div>
  ),
}
