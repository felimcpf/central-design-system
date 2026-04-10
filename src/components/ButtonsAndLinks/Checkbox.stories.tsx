import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './ButtonsAndLinks'

const meta: Meta<typeof Checkbox> = {
  title: 'Molecules/ButtonsAndLinks/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { label: 'Checkbox label' },
}

export const Checked: Story = {
  args: { label: 'Checked', checked: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const CheckedDisabled: Story = {
  args: { label: 'Checked & Disabled', checked: true, disabled: true },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Default" />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Checked & Disabled" checked={true} disabled />
      <Checkbox />
    </div>
  ),
}
