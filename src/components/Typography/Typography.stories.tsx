import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: { variant: 'body-md', children: 'The quick brown fox jumps over the lazy dog' },
}

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography variant="display-lg">Display Large — 48px Bold</Typography>
      <Typography variant="display-md">Display Medium — 36px Bold</Typography>
      <Typography variant="display-sm">Display Small — 30px SemiBold</Typography>
      <hr style={{ border: '1px solid #EBEBEB', margin: '4px 0' }} />
      <Typography variant="heading-lg">Heading Large — 24px SemiBold</Typography>
      <Typography variant="heading-md">Heading Medium — 20px SemiBold</Typography>
      <Typography variant="heading-sm">Heading Small — 16px SemiBold</Typography>
      <hr style={{ border: '1px solid #EBEBEB', margin: '4px 0' }} />
      <Typography variant="body-lg">Body Large — 16px Regular — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-md">Body Medium — 14px Regular — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-sm">Body Small — 12px Regular — The quick brown fox jumps over the lazy dog.</Typography>
      <hr style={{ border: '1px solid #EBEBEB', margin: '4px 0' }} />
      <Typography variant="label-lg">Label Large — 14px Medium</Typography>
      <Typography variant="label-md">Label Medium — 12px Medium</Typography>
      <Typography variant="label-sm">Label Small — 11px Medium Uppercase</Typography>
      <Typography variant="caption">Caption — 11px Regular (secondary text)</Typography>
    </div>
  ),
}
