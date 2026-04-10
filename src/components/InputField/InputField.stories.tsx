import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from './InputField'

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'hover', 'focused', 'filled', 'error', 'disabled'] },
    variant: { control: 'radio', options: ['text', 'textarea', 'prefix'] },
  },
}
export default meta

type Story = StoryObj<typeof InputField>

export const Default: Story = {
  args: {
    label: 'Label',
    labelRight: 'Top right',
    placeholder: 'Text',
    caption: 'Caption',
    captionRight: 'Bottom right',
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
}

export const WithPrefix: Story = {
  args: {
    label: 'Short link name',
    prefix: 'nav.cpf/',
    placeholder: 'Your custom name',
    variant: 'prefix',
    caption: 'Randomise',
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
}

export const TextArea: Story = {
  args: {
    label: 'Description',
    placeholder: 'Text',
    variant: 'textarea',
    caption: 'Caption',
    captionRight: 'Bottom right',
    labelRight: 'Top right',
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
}

export const ErrorState: Story = {
  args: {
    label: 'Label',
    labelRight: 'Top right',
    placeholder: 'Text',
    state: 'error',
    errorMessage: 'Caption',
    captionRight: 'Bottom right',
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    labelRight: 'Top right',
    placeholder: 'Text',
    state: 'disabled',
    caption: 'Caption',
    captionRight: 'Bottom right',
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      {(['default', 'hover', 'focused', 'error', 'disabled'] as const).map(state => (
        <InputField
          key={state}
          label="Label"
          labelRight="Top right"
          placeholder="Text"
          state={state}
          caption={state === 'error' ? undefined : 'Caption'}
          captionRight={state === 'error' ? 'Bottom right' : 'Bottom right'}
          errorMessage={state === 'error' ? 'Caption' : undefined}
        />
      ))}
    </div>
  ),
}

export const PrefixAllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      {(['default', 'hover', 'focused', 'error', 'disabled'] as const).map(state => (
        <InputField
          key={state}
          label="Label"
          labelRight="Top right"
          prefix="Prefix"
          placeholder="Text"
          variant="prefix"
          state={state}
          caption={state === 'error' ? undefined : 'Caption'}
          captionRight="Bottom right"
          errorMessage={state === 'error' ? 'Caption' : undefined}
        />
      ))}
    </div>
  ),
}
