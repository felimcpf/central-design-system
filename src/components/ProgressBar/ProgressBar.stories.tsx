import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'checklist'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 10 } },
  },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 40, label: 'Progress', showPercentage: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
}

export const AllStates: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[0, 10, 40, 70, 100].map(v => (
        <ProgressBar key={v} value={v} label={v === 0 ? 'Empty' : v === 100 ? 'Complete' : `${v}%`} showPercentage />
      ))}
    </div>
  ),
}

export const Checklist: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[0, 10, 40, 70, 100].map(v => (
        <ProgressBar key={v} value={v} variant="checklist" label="navC Main Checklist" showPercentage />
      ))}
    </div>
  ),
}
