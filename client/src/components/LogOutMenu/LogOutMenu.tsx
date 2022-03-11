import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import React from 'react'

interface LogOutMenuProps {
  stylesLogIn: string
  stylesSignIn: string
}

export const LogOutMenu: React.FC<LogOutMenuProps> = ({
  stylesLogIn,
  stylesSignIn,
}) => {
  const navigate = useNavigate()

  const followLogInPage = () => {
    navigate('/LogIn')
  }
  const followSignInPage = () => {
    navigate('/SignIn')
  }

  return (
    <div>
      <Button
        title="Log in"
        type={stylesLogIn}
        click={followLogInPage}
        disable={false}
      />
      <Button
        title="Sign in"
        type={stylesSignIn}
        click={followSignInPage}
        disable={false}
      />
    </div>
  )
}
