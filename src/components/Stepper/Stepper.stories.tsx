import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  argTypes: {
    activeStep: { control: { type: 'range', min: 0, max: 4 } },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}
export default meta

type Story = StoryObj<typeof Stepper>

const steps = [
  { label: 'Step 1', description: 'Basic information' },
  { label: 'Step 2', description: 'Document upload' },
  { label: 'Step 3', description: 'Review' },
  { label: 'Step 4', description: 'Submit' },
]

export const Horizontal: Story = {
  args: { steps, activeStep: 1, orientation: 'horizontal' },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
}

export const Vertical: Story = {
  args: { steps, activeStep: 2, orientation: 'vertical' },
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
}

export const AllComplete: Story = {
  args: { steps, activeStep: 4, orientation: 'horizontal' },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
}

export const FirstStep: Story = {
  args: { steps, activeStep: 0, orientation: 'horizontal' },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
}
