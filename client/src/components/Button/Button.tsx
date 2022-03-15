import buttonStyles from './Button.module.scss'
import React from 'react'
import { ButtonProps } from './types'

export const Button: React.FC<ButtonProps> = ({
  title,
  type,
  click,
  disable,
}) => {
  return (
    <button
      onClick={click}
      className={buttonStyles[`${type}`]}
      disabled={disable}
    >
      {title}
    </button>
  )
}
