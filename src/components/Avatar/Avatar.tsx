import React from 'react'
import './Avatar.css'

export type AvatarSize = 'sm' | 'md'
export type AvatarColor = 'navy' | 'orange' | 'purple' | 'green' | 'maroon' | 'aqua'

export interface AvatarProps {
  initials: string
  color?: AvatarColor
  size?: AvatarSize
  disabled?: boolean
  showStatus?: boolean
  stacked?: boolean
}

const colorMap: Record<AvatarColor, string> = {
  navy: '#19335B',
  orange: '#BF742E',
  purple: '#5B1941',
  green: '#195B43',
  maroon: '#79312D',
  aqua: '#0B7D8D',
}

export function Avatar({
  initials,
  color = 'navy',
  size = 'md',
  disabled = false,
  showStatus = false,
  stacked = false,
}: AvatarProps) {
  const bgColor = disabled ? '#7B7B7B' : colorMap[color]
  const sizeClass = `avatar--${size}`
  const stackClass = stacked ? 'avatar--stacked' : ''

  return (
    <div className={`avatar ${sizeClass} ${stackClass}`} aria-label={`Avatar: ${initials}`}>
      <div className="avatar__placeholder" style={{ backgroundColor: bgColor }}>
        <span className="avatar__initials">{initials.slice(0, 2).toUpperCase()}</span>
      </div>
      {showStatus && !disabled && <span className="avatar__status" />}
    </div>
  )
}

export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, 'initials' | 'color' | 'disabled'>[]
  size?: AvatarSize
  max?: number
}

export function AvatarGroup({ avatars, size = 'md', max = 5 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className="avatar-group">
      {visible.map((a, i) => (
        <Avatar key={i} {...a} size={size} stacked />
      ))}
      {overflow > 0 && (
        <div className={`avatar avatar--${size} avatar--stacked avatar__overflow`}>
          <div className="avatar__placeholder avatar__placeholder--neutral">
            <span className="avatar__initials">+{overflow}</span>
          </div>
        </div>
      )}
    </div>
  )
}
