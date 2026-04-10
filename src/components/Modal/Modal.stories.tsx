import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof Modal>

function ModalDemo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button label="Open Modal" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
        size={size}
        footer={
          <>
            <Button label="Cancel" variant="outline-neutral" onClick={() => setOpen(false)} />
            <Button label="Confirm" variant="solid-primary" onClick={() => setOpen(false)} />
          </>
        }
      >
        <p>This is the modal body content. You can place any content here, including forms, lists, or rich text.</p>
        <p style={{ marginTop: 12 }}>Press Escape or click outside to close.</p>
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: () => <ModalDemo />,
}

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
}

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
}

export const StaticOpen: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 400, width: 600, overflow: 'hidden', border: '1px solid #EBEBEB', borderRadius: 8 }}>
      <Modal open={true} onClose={() => {}} title="Confirm Action" size="sm"
        footer={<><Button label="Cancel" variant="outline-neutral" /><Button label="Confirm" /></>}
      >
        <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
      </Modal>
    </div>
  ),
}
