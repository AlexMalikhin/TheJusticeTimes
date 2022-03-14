import { ButtonStylesType } from '../../types/types'

export interface ButtonProps {
  title: string
  disable?: boolean
  click?: () => void
  type: ButtonStylesType
}
