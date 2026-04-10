import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToggleButton } from './ButtonsAndLinks'

const twoOptions = [
  { label: 'Option 1', value: 'one' },
  { label: 'Option 2', value: 'two' },
]

const threeOptions = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

const meta: Meta<typeof ToggleButton> = {
  title: 'Molecules/ButtonsAndLinks/Toggle Button',
  component: ToggleButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ToggleButton>

export const TwoOptions: Story = {
  args: { options: twoOptions },
}

export const ThreeOptions: Story = {
  args: { options: threeOptions },
}

export const ControlledValue: Story = {
  args: { options: threeOptions, value: 'week' },
}
