import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DropdownSelector } from './DropdownSelector'
import type { DSState } from './DropdownSelector'

// ─── Shared data ──────────────────────────────────────────────────────────────
const textOptions = [
  { label: 'Option A', sublabel: 'Sub description A', value: 'a' },
  { label: 'Option B', sublabel: 'Sub description B', value: 'b' },
  { label: 'Option C', sublabel: 'Sub description C', value: 'c' },
  { label: 'Option D', sublabel: 'Sub description D', value: 'd' },
]

const tagOptions = [
  { label: 'chatgpt', value: 'chatgpt' },
  { label: 'datasmart', value: 'datasmart' },
  { label: 'claude', value: 'claude' },
  { label: 'gemini', value: 'gemini' },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta<typeof DropdownSelector> = {
  title: 'Molecules/Dropdown Selector',
  component: DropdownSelector,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    inputType: { control: 'radio', options: ['short-text', 'tags'] },
    toggle: { control: 'boolean' },
    multiple: { control: 'boolean' },
    state: { control: 'select', options: ['default', 'active', 'error', 'disabled'] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 380, padding: 8 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof DropdownSelector>

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: 'Playground',
  args: {
    label: 'Label',
    labelRight: 'Top right',
    placeholder: 'eg. datasmart',
    inputType: 'short-text',
    toggle: true,
    multiple: false,
    options: textOptions,
    state: 'default',
    caption: 'Caption text',
  },
}

// ─── Helper components for the All Variants grid ──────────────────────────────
const colLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#A3A3A3',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 12,
}

const sectionHead: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: '#262626',
  margin: '0 0 20px',
  paddingBottom: 8,
  borderBottom: '2px solid #EBEBEB',
}

const rowGap: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 28 }

function StatRow({ label }: { label: string }) {
  return <p style={colLabel}>{label}</p>
}

// ─── Single Select — all 4 input modes × states ────────────────────────────────

function SSShortTextNoToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="default" value="Text" /></div>
      <div><StatRow label="Active without input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="active" /></div>
      <div><StatRow label="Active with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="active" value="Text" /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="error" value="Text" error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} state="disabled" value="Text" /></div>
    </div>
  )
}

function SSShortTextToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="default" value="b" /></div>
      <div><StatRow label="Active without input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="active" /></div>
      <div><StatRow label="Active with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="active" value="b" /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="error" error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="short-text" toggle={true} multiple={false} options={textOptions} state="disabled" value="b" /></div>
    </div>
  )
}

function SSTagsNoToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="default" value={['chatgpt']} /></div>
      <div><StatRow label="Active without input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="active" /></div>
      <div><StatRow label="Active with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="active" value={['chatgpt']} /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="error" value={['chatgpt', 'chat-g']} error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} state="disabled" value={['name', 'chatgpt', 'text']} /></div>
    </div>
  )
}

function SSTagsToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="default" value="chatgpt" /></div>
      <div><StatRow label="Active without input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="active" /></div>
      <div><StatRow label="Active with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="active" value="chatgpt" /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="error" error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose an option" inputType="tags" toggle={true} multiple={false} options={tagOptions} state="disabled" value="chatgpt" /></div>
    </div>
  )
}

// ─── Multi Select — all 4 input modes × states ────────────────────────────────

function MSShortTextNoToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="default" value="Text" /></div>
      <div><StatRow label="Active without input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="active" /></div>
      <div><StatRow label="Active with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="active" value="Text" /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="error" value="Text" error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="eg. datasmart" inputType="short-text" toggle={false} multiple={true} state="disabled" value="Text" /></div>
    </div>
  )
}

function MSShortTextToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="default" value={['a']} /></div>
      <div><StatRow label="Selected without input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="active" /></div>
      <div><StatRow label="Selected with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="active" value={['a']} /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="error" value={['a']} error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Label" labelRight="Top right" placeholder="Choose at least one option" inputType="short-text" toggle={true} multiple={true} options={textOptions} state="disabled" value={['a']} /></div>
    </div>
  )
}

function MSTagsNoToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="default" value={['chatgpt']} /></div>
      <div><StatRow label="Selected without input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="active" /></div>
      <div><StatRow label="Selected with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="active" value={['chatgpt']} /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="error" value={['chat-g']} error="Hashtags can only contain alphabets and numbers" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="eg. datasmart" inputType="tags" toggle={false} multiple={true} state="disabled" value={['name', 'chatgpt', 'text']} /></div>
    </div>
  )
}

function MSTagsToggle() {
  return (
    <div style={rowGap}>
      <div><StatRow label="Default" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="default" /></div>
      <div><StatRow label="Default with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="default" value={['chatgpt']} /></div>
      <div><StatRow label="Selected without input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="active" /></div>
      <div><StatRow label="Selected with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="active" value={['chatgpt']} /></div>
      <div><StatRow label="Error" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="error" error="Caption" /></div>
      <div><StatRow label="Disabled" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="disabled" /></div>
      <div><StatRow label="Disabled with input" /><DropdownSelector label="Hashtags (optional)" labelRight="Top right" placeholder="Choose at least one option" inputType="tags" toggle={true} multiple={true} options={tagOptions} state="disabled" value={['chatgpt']} /></div>
    </div>
  )
}

// ─── Main "All Variants" stories ──────────────────────────────────────────────

export const SingleSelect: Story = {
  name: 'Single Select — All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 300px)', gap: 48, padding: 24, alignItems: 'start' }}>
      <div>
        <h3 style={sectionHead}>Short text · No toggle</h3>
        <SSShortTextNoToggle />
      </div>
      <div>
        <h3 style={sectionHead}>Short text · With toggle</h3>
        <SSShortTextToggle />
      </div>
      <div>
        <h3 style={sectionHead}>Tags · No toggle</h3>
        <SSTagsNoToggle />
      </div>
      <div>
        <h3 style={sectionHead}>Tags · With toggle</h3>
        <SSTagsToggle />
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
}

export const MultiSelect: Story = {
  name: 'Multi Select — All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 300px)', gap: 48, padding: 24, alignItems: 'start' }}>
      <div>
        <h3 style={sectionHead}>Short text · No toggle</h3>
        <MSShortTextNoToggle />
      </div>
      <div>
        <h3 style={sectionHead}>Short text · With toggle</h3>
        <MSShortTextToggle />
      </div>
      <div>
        <h3 style={sectionHead}>Tags · No toggle</h3>
        <MSTagsNoToggle />
      </div>
      <div>
        <h3 style={sectionHead}>Tags · With toggle</h3>
        <MSTagsToggle />
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
}

// ─── Interactive demos ─────────────────────────────────────────────────────────

export const InteractiveSingleText: Story = {
  name: 'Interactive · Single select (text)',
  render: () => {
    const [val, setVal] = React.useState('')
    return (
      <div style={{ maxWidth: 320 }}>
        <DropdownSelector
          label="Select option"
          labelRight="Required"
          placeholder="Choose an option"
          options={textOptions}
          inputType="short-text"
          toggle={true}
          multiple={false}
          value={val}
          onChange={v => setVal(v as string)}
          caption={val ? `Selected: ${textOptions.find(o => o.value === val)?.label}` : 'Nothing selected'}
        />
      </div>
    )
  },
  decorators: [(Story) => <Story />],
}

export const InteractiveMultiText: Story = {
  name: 'Interactive · Multi select (text)',
  render: () => {
    const [vals, setVals] = React.useState<string[]>([])
    return (
      <div style={{ maxWidth: 320 }}>
        <DropdownSelector
          label="Select options"
          labelRight="Optional"
          placeholder="Choose at least one option"
          options={textOptions}
          inputType="short-text"
          toggle={true}
          multiple={true}
          value={vals}
          onChange={v => setVals(v as string[])}
          caption={vals.length > 0 ? `${vals.length} selected` : 'Nothing selected'}
        />
      </div>
    )
  },
  decorators: [(Story) => <Story />],
}

export const InteractiveMultiTags: Story = {
  name: 'Interactive · Multi select (tags)',
  render: () => {
    const [vals, setVals] = React.useState<string[]>([])
    return (
      <div style={{ maxWidth: 320 }}>
        <DropdownSelector
          label="Hashtags (optional)"
          labelRight="Top right"
          placeholder="Choose at least one option"
          options={tagOptions}
          inputType="tags"
          toggle={true}
          multiple={true}
          value={vals}
          onChange={v => setVals(v as string[])}
          caption={vals.length > 0 ? `${vals.length} tag(s) selected` : 'No tags selected'}
        />
      </div>
    )
  },
  decorators: [(Story) => <Story />],
}

export const InteractiveFreeEntry: Story = {
  name: 'Interactive · Free tag entry',
  render: () => {
    const [tags, setTags] = React.useState<string[]>([])
    return (
      <div style={{ maxWidth: 320 }}>
        <DropdownSelector
          label="Hashtags (optional)"
          labelRight="Top right"
          placeholder="eg. datasmart"
          inputType="tags"
          toggle={false}
          value={tags}
          onChange={v => setTags(v as string[])}
          caption="Press Enter or comma to add a tag"
        />
      </div>
    )
  },
  decorators: [(Story) => <Story />],
}
