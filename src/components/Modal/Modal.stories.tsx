import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import './Modal.css'

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Modal>

// ── Shared icons ──────────────────────────────────────────────────────────────

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Alert Illustration (SVG approximation of Figma blue alert) ────────────────
function AlertIllustration() {
  return (
    <svg width="134" height="130" viewBox="0 0 134 130" fill="none" aria-hidden="true">
      {/* Blue ellipse background */}
      <ellipse cx="67" cy="65" rx="65" ry="63" fill="#dce6f7" opacity="0.6" transform="rotate(62 67 65)"/>
      {/* Warning triangle */}
      <polygon points="67,20 110,100 24,100" fill="#203397" opacity="0.9"/>
      <polygon points="67,20 110,100 24,100" fill="none" stroke="#1a2a7e" strokeWidth="2"/>
      {/* Exclamation mark */}
      <rect x="63" y="45" width="8" height="30" rx="4" fill="white"/>
      <rect x="63" y="82" width="8" height="8" rx="4" fill="white"/>
    </svg>
  )
}

// ── Modal 1 — Centered Alert ──────────────────────────────────────────────────
function Modal1Static({ onClose }: { onClose?: () => void }) {
  return (
    <div className="m1">
      <button className="m1__close" onClick={onClose} aria-label="Close">
        <CloseIcon size={20} />
      </button>
      <AlertIllustration />
      <div className="m1__message">
        <p className="m1__title">Modal title</p>
        <p className="m1__body">
          Lorem ipsum dolor sit amet consectetur. Sodales sem nunc eget tristique
          pellentesque ullamcorper vel in sed.
        </p>
      </div>
      <div className="m1__buttons">
        <button className="m1__btn-cancel" onClick={onClose}>Cancel</button>
        <button className="m1__btn-accept" onClick={onClose}>Accept</button>
      </div>
    </div>
  )
}

// ── Modal 2 — Horizontal Alert ────────────────────────────────────────────────
function Modal2Static({ onClose }: { onClose?: () => void }) {
  return (
    <div className="m2">
      <button className="m2__close" onClick={onClose} aria-label="Close">
        <CloseIcon size={20} />
      </button>
      <AlertIllustration />
      <div className="m2__content">
        <div className="m2__message">
          <p className="m2__title">Modal title</p>
          <p className="m2__body">
            Lorem ipsum dolor sit amet consectetur. Sodales sem nunc eget tristique
            pellentesque ullamcorper vel in sed.
          </p>
        </div>
        <div className="m2__buttons">
          <button className="m1__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="m1__btn-accept" onClick={onClose}>Accept</button>
        </div>
      </div>
    </div>
  )
}

// ── Modal 3 — Manage Owners ───────────────────────────────────────────────────
const users = [
  { name: 'Hussain', email: 'hussain_h_mohamad@cpf.gov.sg', color: '#19335b', initials: 'HH' },
  { name: 'Chee Siang', email: 'ong_chee_siang@cpf.gov.sg', color: '#5b1941', initials: 'CS' },
  { name: 'John Doe', email: 'john_doe_withaverylongsirname@cpf.', color: '#bf742e', initials: 'JD' },
]

function Modal3Static({ onClose }: { onClose?: () => void }) {
  return (
    <div className="m3">
      <div className="m3__header-row">
        <h2 className="m3__title">Manage owners</h2>
        <button className="m3__close" onClick={onClose} aria-label="Close">
          <CloseIcon size={16} />
        </button>
      </div>
      <p className="m3__subtitle" style={{ marginTop: -8 }}>
        Allow others to have editing rights and visibility to the full statistics of this short link
      </p>
      <div className="m3__input-row">
        <input className="m3__text-input" type="text" placeholder="Text" />
        <button className="m3__add-btn">Add user</button>
      </div>
      <div className="m3__user-list">
        {users.map((user) => (
          <div key={user.email} className="m3__user-row">
            <div className="m3__user-left">
              <span className="m3__avatar" style={{ background: user.color }}>
                {user.initials}
              </span>
              <div className="m3__user-info">
                <span className="m3__user-name">{user.name}</span>
                <span className="m3__user-email">{user.email}</span>
              </div>
            </div>
            <button className="m3__trash-btn" aria-label={`Remove ${user.name}`}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
      <div className="m3__scrollbar">
        <div className="m3__scrollbar-thumb" />
      </div>
    </div>
  )
}

// ── Modal 4 — Image Viewer ────────────────────────────────────────────────────
function Modal4Static({ onClose }: { onClose?: () => void }) {
  return (
    <div className="m4">
      <div className="m4__header">
        <button className="m4__close" onClick={onClose} aria-label="Close">
          <CloseIcon size={20} />
        </button>
      </div>
      <div
        className="m4__image"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span>Image Preview</span>
      </div>
    </div>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Modal1: Story = {
  name: 'Modal 1 — Centered Alert',
  render: () => (
    <div className="modal-static">
      <Modal1Static />
    </div>
  ),
}

export const Modal2: Story = {
  name: 'Modal 2 — Horizontal Alert',
  render: () => (
    <div className="modal-static">
      <Modal2Static />
    </div>
  ),
}

export const Modal3ManageOwners: Story = {
  name: 'Modal 3 — Manage Owners',
  render: () => (
    <div className="modal-static" style={{ alignItems: 'flex-start' }}>
      <Modal3Static />
    </div>
  ),
}

export const Modal4ImageViewer: Story = {
  name: 'Modal 4 — Image Viewer',
  render: () => (
    <div className="modal-static">
      <Modal4Static />
    </div>
  ),
}

// ── Interactive (existing generic modal) ──────────────────────────────────────
function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button label="Open Modal" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
        footer={
          <>
            <Button label="Cancel" variant="outline-neutral" onClick={() => setOpen(false)} />
            <Button label="Confirm" variant="solid-primary" onClick={() => setOpen(false)} />
          </>
        }
      >
        <p>This is the modal body content. You can place any content here.</p>
        <p style={{ marginTop: 12 }}>Press Escape or click outside to close.</p>
      </Modal>
    </div>
  )
}

export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: () => <ModalDemo />,
}
