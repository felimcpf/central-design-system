import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LinkButton } from './ButtonsAndLinks'

const meta: Meta<typeof LinkButton> = {
  title: 'Molecules/ButtonsAndLinks/Link Button',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
    styleVariant: { control: 'radio', options: ['primary', 'neutral'] },
    state: { control: 'select', options: ['default', 'hover', 'pressed', 'disabled'] },
    withIcon: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof LinkButton>

export const Default: Story = {
  args: { label: 'Link Button', size: 'md', styleVariant: 'primary' },
}

export const WithArrowIcon: Story = {
  args: { label: 'Link Button', size: 'md', styleVariant: 'primary', withIcon: true },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['lg', 'md', 'sm'] as const).map(s => (
        <LinkButton key={s} label={`${s.toUpperCase()} Link`} size={s} styleVariant="primary" withIcon />
      ))}
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['default', 'hover', 'pressed', 'disabled'] as const).map(state => (
        <LinkButton key={state} label={state} size="md" styleVariant="primary" state={state} />
      ))}
    </div>
  ),
}

export const NeutralStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['default', 'hover', 'pressed', 'disabled'] as const).map(state => (
        <LinkButton key={state} label={state} size="md" styleVariant="neutral" state={state} />
      ))}
    </div>
  ),
}
