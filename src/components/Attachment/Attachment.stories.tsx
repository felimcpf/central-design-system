import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Attachment } from './Attachment'

const meta: Meta<typeof Attachment> = {
  title: 'Organisms/Attachment',
  component: Attachment,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Attachment>

const sampleFile = {
  name: 'document.jpg',
  size: '2.4 MB',
  previewUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop',
}

const sampleFileNoPreview = {
  name: 'report.pdf',
  size: '1.2 MB',
}

// ── State grid ────────────────────────────────────────────────────────────────

function StateGrid() {
  const states: Array<{ label: string; props: React.ComponentProps<typeof Attachment> }> = [
    {
      label: 'Default',
      props: { state: 'default' },
    },
    {
      label: 'Hover',
      props: { state: 'hover' },
    },
    {
      label: 'Selected',
      props: { state: 'selected' },
    },
    {
      label: 'Disabled',
      props: { state: 'disabled' },
    },
    {
      label: 'Uploaded (with preview)',
      props: { state: 'uploaded', file: sampleFile },
    },
    {
      label: 'Uploaded + Disabled (with preview)',
      props: { state: 'uploaded', file: sampleFile },
    },
    {
      label: 'Uploaded (without preview)',
      props: { state: 'uploaded-no-preview', file: sampleFileNoPreview },
    },
    {
      label: 'Uploaded + Disabled (without preview)',
      props: { state: 'uploaded-no-preview', file: sampleFileNoPreview },
    },
    {
      label: 'Error',
      props: { state: 'error', error: 'File type not supported. Please upload JPEG, PNG or SVG.' },
    },
    {
      label: 'Uploading',
      props: { state: 'uploading', file: { name: 'document.jpg', size: '2.4 MB' }, uploadProgress: 60 },
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {states.map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ width: 200, paddingTop: 8, fontSize: 13, color: '#6D6D6D', fontFamily: 'Lato, sans-serif', textAlign: 'right', flexShrink: 0 }}>
            {label}
          </div>
          <div style={{ width: 626 }}>
            <Attachment {...props} />
          </div>
        </div>
      ))}
    </div>
  )
}

export const AllStates: Story = {
  name: 'All States',
  render: () => <StateGrid />,
}

export const Default: Story = {
  args: { state: 'default' },
}

export const Hover: Story = {
  args: { state: 'hover' },
}

export const Selected: Story = {
  args: { state: 'selected' },
}

export const Disabled: Story = {
  args: { state: 'disabled' },
}

export const UploadedWithPreview: Story = {
  name: 'Uploaded (with preview)',
  args: { state: 'uploaded', file: sampleFile },
}

export const UploadedWithoutPreview: Story = {
  name: 'Uploaded (without preview)',
  args: { state: 'uploaded-no-preview', file: sampleFileNoPreview },
}

export const Error: Story = {
  args: {
    state: 'error',
    error: 'File type not supported. Please upload JPEG, PNG or SVG.',
  },
}

export const Uploading: Story = {
  args: {
    state: 'uploading',
    file: { name: 'document.jpg', size: '2.4 MB' },
    uploadProgress: 60,
  },
}
