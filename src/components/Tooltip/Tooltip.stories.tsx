import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    direction: { control: 'radio', options: ['up', 'down', 'left', 'right'] },
  },
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: { content: 'Tooltip text here', direction: 'up' },
  render: (args) => (
    <div style={{ padding: 60 }}>
      <Tooltip {...args}>
        <Button label="Hover me" size="md" />
      </Tooltip>
    </div>
  ),
}

export const AllDirections: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, padding: 80 }}>
      {(['up', 'down', 'left', 'right'] as const).map(dir => (
        <div key={dir} style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip content={`Direction: ${dir}`} direction={dir}>
            <Button label={dir} size="sm" />
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}
