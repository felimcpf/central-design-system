import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    endStyle: { control: 'radio', options: ['round', 'square'] },
  },
}
export default meta

type Story = StoryObj<typeof Divider>

export const RoundEnd: Story = {
  args: { endStyle: 'round' },
  decorators: [(Story) => <div style={{ width: 400, padding: 16 }}><Story /></div>],
}

export const SquareEnd: Story = {
  args: { endStyle: 'square' },
  decorators: [(Story) => <div style={{ width: 400, padding: 16 }}><Story /></div>],
}

export const BothVariants: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#6D6D6D' }}>Round end</p>
        <Divider endStyle="round" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#6D6D6D' }}>Square end</p>
        <Divider endStyle="square" />
      </div>
    </div>
  ),
}
