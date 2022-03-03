import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'

export const LogOutMenu = ({ stylesLogIn, stylesSignIn }) => {
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
        disabled={false}
      />
      <Button
        title="Sign in"
        type={stylesSignIn}
        click={followSignInPage}
        disabled={false}
      />
    </div>
  )
}
