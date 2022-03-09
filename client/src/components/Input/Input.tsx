import inputStyles from './Input.module.css'
import React from 'react'

interface InputProps {
  readonly name?: string
  readonly placeholder?: string
  readonly label?: string
  readonly type?: string
  inputValue: string | number
  changeValue: any
  isRenderError?: boolean
  blurHandle?: () => void
  errorText?: string
  focusEvent?: () => void
}

export const Input: React.FC<InputProps> = ({
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
        className={inputStyles.input}
        type={type}
        onFocus={focusEvent}
      />
      {isRenderError && <p className={inputStyles.error}>{errorText}</p>}
    </div>
  )
}
