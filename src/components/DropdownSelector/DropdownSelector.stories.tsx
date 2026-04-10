import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DropdownSelector } from './DropdownSelector'

const textOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
]

const tagOptions = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Marketing', value: 'marketing' },
]

const avatarOptions = [
  { label: 'Alice Chen', value: 'alice' },
  { label: 'Bob Smith', value: 'bob' },
  { label: 'Carol Davis', value: 'carol' },
  { label: 'David Lee', value: 'david' },
]

const meta: Meta<typeof DropdownSelector> = {
  title: 'Molecules/Dropdown Selector',
  component: DropdownSelector,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'active', 'disabled'] },
    inputType: { control: 'radio', options: ['text', 'tags', 'avatar'] },
    multiple: { control: 'boolean' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof DropdownSelector>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options: textOptions,
    inputType: 'text',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Label',
    options: textOptions,
    value: 'b',
    inputType: 'text',
  },
}

export const DisabledState: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options: textOptions,
    state: 'disabled',
    inputType: 'text',
  },
}

export const TagsInput: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Select tags…',
    options: tagOptions,
    inputType: 'tags',
    multiple: true,
  },
}

export const TagsWithValues: Story = {
  args: {
    label: 'Tags',
    options: tagOptions,
    value: ['design', 'engineering'],
    inputType: 'tags',
    multiple: true,
  },
}

export const AvatarInput: Story = {
  args: {
    label: 'Assignee',
    placeholder: 'Select a person…',
    options: avatarOptions,
    inputType: 'avatar',
  },
}

export const AvatarWithValue: Story = {
  args: {
    label: 'Assignee',
    options: avatarOptions,
    value: 'alice',
    inputType: 'avatar',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 480 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#858585', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Text — Default</p>
        <DropdownSelector label="Label" placeholder="Select an option" options={textOptions} inputType="text" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#858585', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tags — Multi-select</p>
        <DropdownSelector label="Tags" placeholder="Select tags…" options={tagOptions} inputType="tags" multiple />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#858585', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avatar — Assignee</p>
        <DropdownSelector label="Assignee" placeholder="Select a person…" options={avatarOptions} inputType="avatar" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#858585', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Disabled</p>
        <DropdownSelector label="Label" placeholder="Select an option" options={textOptions} state="disabled" inputType="text" />
      </div>
    </div>
  ),
}
