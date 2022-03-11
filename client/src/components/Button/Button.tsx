import buttonStyles from './Button.module.css'
import React from 'react'

interface ButtonProps {
  title: string
  disable?: boolean
  click?: any
  type: keyof typeof buttonStyles
}

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
