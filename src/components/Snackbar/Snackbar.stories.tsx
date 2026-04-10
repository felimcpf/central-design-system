import type { Meta, StoryObj } from '@storybook/react'
import { Snackbar } from './Snackbar'

const meta: Meta<typeof Snackbar> = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    duration: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof Snackbar>

export const Info: Story = {
  args: { message: 'Your changes have been saved.', variant: 'info', visible: true, duration: 0 },
}

export const Success: Story = {
  args: { message: 'File uploaded successfully.', variant: 'success', visible: true, duration: 0 },
}

export const Warning: Story = {
  args: { message: 'Please review before submitting.', variant: 'warning', visible: true, duration: 0 },
}

export const Error: Story = {
  args: { message: 'Something went wrong. Please try again.', variant: 'error', visible: true, duration: 0 },
}

export const WithAction: Story = {
  args: {
    message: 'Item deleted.',
    variant: 'info',
    visible: true,
    duration: 0,
    action: { label: 'Undo', onClick: () => {} },
  },
}

export const WithClose: Story = {
  args: {
    message: 'This is a dismissable notification.',
    variant: 'info',
    visible: true,
    duration: 0,
    onClose: () => {},
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Snackbar message="Informational message here." variant="info" visible duration={0} />
      <Snackbar message="Action completed successfully." variant="success" visible duration={0} />
      <Snackbar message="Warning: please check your inputs." variant="warning" visible duration={0} />
      <Snackbar message="An error occurred. Please retry." variant="error" visible duration={0} />
    </div>
  ),
}
