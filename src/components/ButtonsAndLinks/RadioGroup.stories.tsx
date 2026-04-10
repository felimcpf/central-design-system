import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './ButtonsAndLinks'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C (disabled)', value: 'c', disabled: true },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/ButtonsAndLinks/Radio Button',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: { options },
}

export const WithSelectedValue: Story = {
  args: { options, value: 'b' },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <RadioGroup options={[
        { label: 'Default (unselected)', value: 'x' },
        { label: 'Selected', value: 'y' },
        { label: 'Disabled', value: 'z', disabled: true },
      ]} value="y" />
    </div>
  ),
}
