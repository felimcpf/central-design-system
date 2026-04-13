// Central Design System — Public API
// Import this package in your product repo to access all components and the ThemeProvider.

// ─── Theme ────────────────────────────────────────────────────────────────────
export { ThemeProvider } from './themes/ThemeProvider'
export type { ProductTheme } from './themes/ThemeProvider'

// ─── Accordion ────────────────────────────────────────────────────────────────
export { Accordion } from './components/Accordion/Accordion'
export type { AccordionProps, AccordionItem } from './components/Accordion/Accordion'

// ─── Attachment ───────────────────────────────────────────────────────────────
export { Attachment } from './components/Attachment/Attachment'
export type { AttachmentProps, AttachmentFile, AttachmentState } from './components/Attachment/Attachment'

// ─── Avatar ───────────────────────────────────────────────────────────────────
export { Avatar, AvatarGroup } from './components/Avatar/Avatar'
export type { AvatarProps, AvatarGroupProps, AvatarColor, AvatarSize } from './components/Avatar/Avatar'

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export { Breadcrumb } from './components/Breadcrumb/Breadcrumb'
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb/Breadcrumb'

// ─── Button ───────────────────────────────────────────────────────────────────
export { Button } from './components/Button/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button/Button'

// ─── ButtonsAndLinks (multiple components in one file) ───────────────────────
export {
  Checkbox,
  RadioGroup,
  ToggleButton,
  LinkButton,
  IconButton,
  DropdownButton,
} from './components/ButtonsAndLinks/ButtonsAndLinks'
export type {
  CheckboxProps,
  CheckboxState,
  RadioGroupProps,
  RadioOption,
  ToggleButtonProps,
  ToggleButtonOption,
  LinkButtonProps,
  LinkButtonSize,
  LinkButtonState,
  LinkButtonStyle,
  IconButtonProps,
  IconButtonSize,
  IconButtonState,
  IconButtonStyle,
  DropdownButtonProps,
  DropdownButtonItem,
  DropdownButtonSize,
  DropdownButtonStyle,
} from './components/ButtonsAndLinks/ButtonsAndLinks'

// ─── Divider ──────────────────────────────────────────────────────────────────
export { Divider } from './components/Divider/Divider'
export type { DividerProps, DividerEndStyle } from './components/Divider/Divider'

// ─── DropdownMenu ─────────────────────────────────────────────────────────────
export { DropdownMenu } from './components/DropdownMenu/DropdownMenu'
export type { DropdownMenuProps, DropdownMenuItem } from './components/DropdownMenu/DropdownMenu'

// ─── DropdownSelector ─────────────────────────────────────────────────────────
export { DropdownSelector } from './components/DropdownSelector/DropdownSelector'
export type { DropdownSelectorProps, DSOption, DSInputType, DSState } from './components/DropdownSelector/DropdownSelector'

// ─── GlobalNavigation ─────────────────────────────────────────────────────────
export { GlobalNavigation } from './components/GlobalNavigation/GlobalNavigation'
export type { GlobalNavigationProps, GNavLinkItem, GNavVariant } from './components/GlobalNavigation/GlobalNavigation'

// ─── InputField ───────────────────────────────────────────────────────────────
export { InputField } from './components/InputField/InputField'
export type { InputFieldProps, InputVariant, InputState } from './components/InputField/InputField'

// ─── LinkCard ─────────────────────────────────────────────────────────────────
export { LinkCard, LinkCardGrid } from './components/LinkCard/LinkCard'
export type { LinkCardProps, LinkCardGridProps } from './components/LinkCard/LinkCard'

// ─── Loader ───────────────────────────────────────────────────────────────────
export { Loader } from './components/Loader/Loader'
export type { LoaderProps, LoaderVariant, LoaderSize } from './components/Loader/Loader'

// ─── Modal ────────────────────────────────────────────────────────────────────
export { Modal } from './components/Modal/Modal'
export type { ModalProps, ModalSize } from './components/Modal/Modal'

// ─── ProgressBar ──────────────────────────────────────────────────────────────
export { ProgressBar } from './components/ProgressBar/ProgressBar'
export type { ProgressBarProps, ProgressBarVariant } from './components/ProgressBar/ProgressBar'

// ─── SearchBar ────────────────────────────────────────────────────────────────
export { SearchBar } from './components/SearchBar/SearchBar'
export type { SearchBarProps } from './components/SearchBar/SearchBar'

// ─── SideMenu ─────────────────────────────────────────────────────────────────
export { SideMenu } from './components/SideMenu/SideMenu'
export type { SideMenuProps, SideMenuGroup, SideMenuItemBase } from './components/SideMenu/SideMenu'

// ─── Snackbar ─────────────────────────────────────────────────────────────────
export { Snackbar } from './components/Snackbar/Snackbar'
export type { SnackbarProps, SnackbarVariant } from './components/Snackbar/Snackbar'

// ─── Stepper ──────────────────────────────────────────────────────────────────
export { Stepper } from './components/Stepper/Stepper'
export type { StepperProps, Step, StepStatus } from './components/Stepper/Stepper'

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export { Tabs } from './components/Tabs/Tabs'
export type { TabsProps, TabItem } from './components/Tabs/Tabs'

// ─── Tags ─────────────────────────────────────────────────────────────────────
export { Tag } from './components/Tags/Tags'
export type { TagProps, TagSize, TagState } from './components/Tags/Tags'

// ─── Tooltip ──────────────────────────────────────────────────────────────────
export { Tooltip } from './components/Tooltip/Tooltip'
export type { TooltipProps, TooltipDirection } from './components/Tooltip/Tooltip'

// ─── Typography ───────────────────────────────────────────────────────────────
export { Typography } from './components/Typography/Typography'
export type { TypographyProps, TypographyVariant, TypographyAs } from './components/Typography/Typography'
