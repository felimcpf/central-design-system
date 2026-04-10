import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Accordion>

const sampleItems = [
  {
    title: 'What is navCentral?',
    content: 'navCentral is created to include useful information for all members of the Board. This includes both internet and intranet resources, but up to a sensitivity level of Restricted/Sensitive-Normal only.',
  },
  {
    title: 'How do I access docCentral?',
    content: 'docCentral can be accessed through your organisation credentials. Please contact your administrator for access.',
    defaultOpen: true,
  },
  {
    title: 'Who manages the design system?',
    content: 'The design system is managed by the Frontier Products Team. For inquiries, please reach out through the appropriate channels.',
  },
]

export const Default: Story = {
  args: { items: sampleItems },
  decorators: [(Story) => <div style={{ maxWidth: 680 }}><Story /></div>],
}

export const AllowMultiple: Story = {
  args: { items: sampleItems, allowMultiple: true },
  decorators: [(Story) => <div style={{ maxWidth: 680 }}><Story /></div>],
}

export const SingleItem: Story = {
  args: {
    items: [{ title: 'Click to expand', content: 'This is the expanded content of the accordion item.' }],
  },
  decorators: [(Story) => <div style={{ maxWidth: 680 }}><Story /></div>],
}
