import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from './DropdownMenu'
import { Button } from '../Button/Button'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof DropdownMenu>

const sampleItems = [
  { label: 'Edit', onClick: () => {} },
  { label: 'Duplicate', onClick: () => {} },
  { divider: true },
  { label: 'Share', onClick: () => {} },
  { label: 'Archive', onClick: () => {} },
  { divider: true },
  { label: 'Delete', onClick: () => {}, disabled: false },
]

export const Default: Story = {
  args: {
    trigger: <Button label="Options" size="md" />,
    items: sampleItems,
  },
  decorators: [(Story) => <div style={{ paddingBottom: 200 }}><Story /></div>],
}

export const WithDisabledItems: Story = {
  args: {
    trigger: <Button label="Actions" size="md" />,
    items: [
      { label: 'View', onClick: () => {} },
      { label: 'Edit', onClick: () => {} },
      { label: 'Delete (unavailable)', disabled: true },
    ],
  },
  decorators: [(Story) => <div style={{ paddingBottom: 160 }}><Story /></div>],
}
