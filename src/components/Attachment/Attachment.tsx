import React, { useRef, useState } from 'react'
import './Attachment.css'

export type AttachmentState =
  | 'default'
  | 'hover'
  | 'selected'
  | 'disabled'
  | 'uploaded'
  | 'uploaded-no-preview'
  | 'error'
  | 'uploading'

export interface AttachmentFile {
  name: string
  size: string        // e.g. "2.4 MB"
  previewUrl?: string // for image files
}

export interface AttachmentProps {
  state?: AttachmentState
  file?: AttachmentFile
  uploadProgress?: number   // 0-100 for uploading state
  caption?: string
  error?: string
  acceptFormats?: string
  onFileChange?: (file: File) => void
  onRemove?: () => void
  disabled?: boolean
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 13V4M10 4L7 7M10 4L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9L13 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 2.5L13.5 13H2.5L8 2.5Z" stroke="#EF3434" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <path d="M8 7V9.5" stroke="#EF3434" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.65" fill="#EF3434" />
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Attachment({
  state = 'default',
  file,
  uploadProgress = 60,
  caption,
  error,
  acceptFormats = 'Supported formats: JPEG, PNG, SVG',
  onFileChange,
  onRemove,
}: AttachmentProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const isDisabled = state === 'disabled'
  const isError = state === 'error'
  const isUploaded = state === 'uploaded' || state === 'uploaded-no-preview'
  const isUploading = state === 'uploading'
  const isHover = state === 'hover' || dragOver

  const cls = [
    'att',
    isHover && 'att--hover',
    state === 'selected' && 'att--selected',
    isDisabled && 'att--disabled',
    isError && 'att--error',
  ].filter(Boolean).join(' ')

  const handleClick = () => {
    if (!isDisabled) inputRef.current?.click()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (isDisabled) return
    const f = e.dataTransfer.files[0]
    if (f) onFileChange?.(f)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onFileChange?.(f)
  }

  return (
    <div className={cls}>
      {/* Drop zone (default, hover, selected, disabled, error states) */}
      {!isUploaded && !isUploading && (
        <div
          className="att__zone"
          onClick={handleClick}
          onDragOver={e => { e.preventDefault(); if (!isDisabled) setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-disabled={isDisabled}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
        >
          <div className="att__zone-row">
            <span className="att__upload-icon"><UploadIcon /></span>
            <button
              type="button"
              className="att__choose-link"
              onClick={e => { e.stopPropagation(); handleClick() }}
              disabled={isDisabled}
              tabIndex={-1}
            >
              Choose file
            </button>
            <span className="att__drag-text">or drag &amp; drop here</span>
          </div>
          <span className="att__formats">{acceptFormats}</span>
          <input
            ref={inputRef}
            className="att__input"
            type="file"
            onChange={handleInputChange}
            disabled={isDisabled}
          />
        </div>
      )}

      {/* Uploaded with preview */}
      {state === 'uploaded' && file && (
        <div className="att__file-row">
          {file.previewUrl ? (
            <img className="att__preview" src={file.previewUrl} alt={file.name} />
          ) : (
            <div className="att__file-icon"><FileIcon /></div>
          )}
          <div className="att__file-info">
            <span className="att__file-name">{file.name}</span>
            <span className="att__file-size">{file.size}</span>
          </div>
          <button
            type="button"
            className="att__trash-btn"
            onClick={onRemove}
            disabled={isDisabled}
            aria-label="Remove file"
          >
            <TrashIcon />
          </button>
        </div>
      )}

      {/* Uploaded without preview */}
      {state === 'uploaded-no-preview' && file && (
        <div className="att__file-row">
          <div className="att__file-icon"><FileIcon /></div>
          <div className="att__file-info">
            <span className="att__file-name">{file.name}</span>
            <span className="att__file-size">{file.size}</span>
          </div>
          <button
            type="button"
            className="att__trash-btn"
            onClick={onRemove}
            disabled={isDisabled}
            aria-label="Remove file"
          >
            <TrashIcon />
          </button>
        </div>
      )}

      {/* Uploading / loading */}
      {isUploading && (
        <div className="att__loading-row">
          <span className="att__loading-label">Uploading{file ? ` ${file.name}` : ''}…</span>
          <div className="att__progress-track">
            <div className="att__progress-fill" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {/* Error caption */}
      {isError && error && (
        <p className="att__caption att__caption--error">
          <WarningIcon />
          {error}
        </p>
      )}
      {!isError && caption && (
        <p className="att__caption">{caption}</p>
      )}
    </div>
  )
}
