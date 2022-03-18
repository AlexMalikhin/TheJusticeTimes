import inputStyles from './Input.module.scss'
import React from 'react'
import { InputStyleType } from '../../types/types'

interface InputProps {
  name?: string
  placeholder?: string
  label?: string
  type?: string
  classNam: InputStyleType
  inputValue: string | number
  changeValue: (value: string) => void
  isRenderError?: boolean
  blurHandle?: () => void
  errorText?: string
  focusEvent?: () => void
}

export const Input: React.FC<InputProps> = ({
  classNam,
  name,
  placeholder,
  label,
  type,
  inputValue,
  changeValue,
  isRenderError,
  blurHandle,
  errorText,
  focusEvent,
}) => {
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value)
  }

  return (
    <div className={inputStyles.input_block}>
      <label htmlFor={name} className={inputStyles.label}>
        {label}
      </label>
      <input
        onChange={setValue}
        value={inputValue}
        name={name}
        placeholder={placeholder}
        onBlur={blurHandle}
        className={inputStyles[`${classNam}`]}
        type={type}
        onFocus={focusEvent}
      />
      {isRenderError && <p className={inputStyles.error}>{errorText}</p>}
    </div>
  )
}
