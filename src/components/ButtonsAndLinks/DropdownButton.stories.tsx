import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DropdownButton } from './ButtonsAndLinks'

const sampleItems = [
  { label: 'Option A', onClick: () => alert('Option A') },
  { label: 'Option B', onClick: () => alert('Option B') },
  { label: 'Option C (disabled)', disabled: true },
]

const meta: Meta<typeof DropdownButton> = {
  title: 'Molecules/ButtonsAndLinks/Dropdown Button',
  component: DropdownButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
    styleVariant: { control: 'radio', options: ['solid-primary', 'outline-primary', 'solid-neutral'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof DropdownButton>

export const Default: Story = {
  args: { label: 'Actions', items: sampleItems, size: 'lg', styleVariant: 'solid-primary' },
}

export const OutlinePrimary: Story = {
  args: { label: 'Actions', items: sampleItems, size: 'lg', styleVariant: 'outline-primary' },
}

export const SolidNeutral: Story = {
  args: { label: 'Actions', items: sampleItems, size: 'lg', styleVariant: 'solid-neutral' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {(['lg', 'md', 'sm'] as const).map(s => (
        <DropdownButton key={s} label={`${s.toUpperCase()}`} items={sampleItems} size={s} styleVariant="solid-primary" />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { label: 'Actions', items: sampleItems, size: 'lg', styleVariant: 'solid-primary', disabled: true },
}
