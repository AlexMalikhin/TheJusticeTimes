import { useContext, useCallback, useEffect } from 'react'
import { LogInMenu } from '../LogInMenu/LogInMenu'
import { LogOutMenu } from '../LogOutMenu/LogOutMenu'
import { AppContext } from '../AppContext/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import logoBlack from '../../img/logo_black.png'
import styles from './Header.module.css'
import Cookies from 'js-cookie'

export const Header = () => {
  const { logIn, setLogIn, authKey } = useContext(AppContext)
  const navigate = useNavigate()
  const toggleLogIn = useCallback(() => {
    setLogIn(false)
    Cookies.remove('token')
    navigate('/AllArticles')
  }, [logIn])

  useEffect(() => {
    if (!!authKey) {
      setLogIn(true)
    }
  }, [authKey])

  return (
    <header className={styles.header_container}>
      <div className={styles.app_header}>
        <Link to="AllArticles">
          <img
            className={styles.logo}
            src={logoBlack}
            alt={'logotype of header'}
          />
        </Link>
        {logIn && authKey ? (
          <LogInMenu login={toggleLogIn} style={'header_logout'} />
        ) : (
          <LogOutMenu
            stylesLogIn={'header_logIn'}
            stylesSignIn={'header_signIn'}
          />
        )}
      </div>
    </header>
  )
}
