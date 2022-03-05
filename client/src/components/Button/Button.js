import buttonStyles from './Button.module.css'

export const Button = ({ title, type, click, disable }) => {
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
