import React, { useContext, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LogInMenu } from '../LogInMenu/LogInMenu'
import { LogOutMenu } from '../LogOutMenu/LogOutMenu'
import { AppContext } from '../AppContext/AppContext'
// @ts-ignore
import logoBlack from '../../img/logo_black.png'
import styles from './Header.module.css'
import { userLogOut } from '../../store/asyncActions/userLogOut'

export const Header: React.FC = () => {
  const { logIn, setLogIn } = useContext(AppContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.authReducer.isAuthenticated)

  const toggleLogIn = useCallback((): void => {
    dispatch(userLogOut())
    navigate('/AllArticles')
  }, [logIn])

  useEffect(() => {
    if (isAuth) {
      setLogIn(true)
    }
  }, [isAuth])

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
        {logIn && isAuth ? (
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
