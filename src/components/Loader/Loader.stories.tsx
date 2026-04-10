import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
  title: 'Atoms/Loader',
  component: Loader,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['spinner', 'dot'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof Loader>

export const Spinner: Story = {
  args: { variant: 'spinner', size: 'md' },
}

export const Dot: Story = {
  args: { variant: 'dot', size: 'md' },
}

export const SpinnerSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Loader variant="spinner" size="sm" />
      <Loader variant="spinner" size="md" />
      <Loader variant="spinner" size="lg" />
    </div>
  ),
}

export const DotSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Loader variant="dot" size="sm" />
      <Loader variant="dot" size="md" />
      <Loader variant="dot" size="lg" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Loader variant="spinner" size="md" label="Loading..." />
      <Loader variant="dot" size="md" label="Please wait" />
    </div>
  ),
}
