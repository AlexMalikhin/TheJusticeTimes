import { useContext, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LogInMenu } from '../LogInMenu/LogInMenu'
import { LogOutMenu } from '../LogOutMenu/LogOutMenu'
import { AppContext } from '../AppContext/AppContext'
import logoBlack from '../../img/logo_black.png'
import styles from './Header.module.css'

export const Header = () => {
  const { logIn, setLogIn, authKey } = useContext(AppContext)
  const navigate = useNavigate()
  const token = useSelector((state) => state.authReducer.token)
  const toggleLogIn = useCallback(() => {
    // setLogIn(false)

    Cookies.remove('token')
    navigate('/AllArticles')
  }, [logIn])

  useEffect(() => {
    if (token !== 0) {
      setLogIn(true)
    }
  }, [token])

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
        {logIn && token ? (
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
