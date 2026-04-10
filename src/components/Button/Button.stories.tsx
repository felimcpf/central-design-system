// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button, type ButtonVariant, type ButtonSize } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid-primary', 'outline-primary', 'clear-primary',
        'solid-warning', 'outline-warning', 'clear-warning',
        'outline-neutral', 'clear-neutral',
        'solid-secondary-1', 'solid-secondary-2', 'solid-neutral',
      ],
    },
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
    withIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const SolidPrimary: Story = {
  args: { label: 'Primary', variant: 'solid-primary', size: 'lg' },
}

export const OutlinePrimary: Story = {
  args: { label: 'Primary', variant: 'outline-primary', size: 'lg' },
}

export const ClearPrimary: Story = {
  args: { label: 'Primary', variant: 'clear-primary', size: 'lg' },
}

export const WithIcon: Story = {
  args: { label: 'Primary', variant: 'solid-primary', size: 'lg', withIcon: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled', variant: 'solid-primary', size: 'lg', disabled: true },
}

const allVariants: ButtonVariant[] = [
  'solid-primary', 'outline-primary', 'clear-primary',
  'solid-warning', 'outline-warning', 'clear-warning',
  'outline-neutral', 'clear-neutral',
  'solid-secondary-1', 'solid-secondary-2', 'solid-neutral',
]

const variantLabel: Record<ButtonVariant, string> = {
  'solid-primary': 'Solid Primary',
  'outline-primary': 'Outline Primary',
  'clear-primary': 'Clear Primary',
  'solid-warning': 'Solid Warning',
  'outline-warning': 'Outline Warning',
  'clear-warning': 'Clear Warning',
  'outline-neutral': 'Outline Neutral',
  'clear-neutral': 'Clear Neutral',
  'solid-secondary-1': 'Secondary 1',
  'solid-secondary-2': 'Secondary 2',
  'solid-neutral': 'Solid Neutral',
}

const row = (style: React.CSSProperties = {}) => ({
  display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center', ...style,
})

export const AllStyles: Story = {
  render: () => (
    <div style={row()}>
      {allVariants.map(v => (
        <Button key={v} label={variantLabel[v]} variant={v} size="lg" />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={row()}>
      {(['lg', 'md', 'sm'] as ButtonSize[]).map(s => (
        <Button key={s} label={s.toUpperCase()} variant="solid-primary" size={s} />
      ))}
    </div>
  ),
}

export const AllWithIcons: Story = {
  render: () => (
    <div style={row()}>
      {allVariants.map(v => (
        <Button key={v} label={variantLabel[v]} variant={v} size="lg" withIcon />
      ))}
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div style={row()}>
      {allVariants.map(v => (
        <Button key={v} label={variantLabel[v]} variant={v} size="lg" disabled />
      ))}
    </div>
  ),
}

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['lg', 'md', 'sm'] as ButtonSize[]).map(s => (
        <div key={s} style={row()}>
          {['solid-primary', 'outline-primary', 'clear-primary'].map(v => (
            <Button key={v} label={variantLabel[v as ButtonVariant]} variant={v as ButtonVariant} size={s} />
          ))}
        </div>
      ))}
    </div>
  ),
}
