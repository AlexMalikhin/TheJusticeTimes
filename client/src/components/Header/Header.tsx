import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LogInMenu } from '../LogInMenu/LogInMenu'
import { LogOutMenu } from '../LogOutMenu/LogOutMenu'
import { AppContext } from '../AppContext/AppContext'
import { userLogOut } from '../../store/asyncActions/authActions/userLogOut'
import { RootState } from '../../store'
// @ts-ignore
import logoBlack from '../../img/logo_black.png'
// @ts-ignore
import burger from '../../img/burger_menu_icon.png'
import styles from './Header.module.scss'
// @ts-ignore
import close from '../../img/pngwing.com.png'

export const Header: React.FC = () => {
  const {
    logIn,
    setLogIn,
    isMobileDevice,
    setIsMobileDevice,
    setIsBurgerMenu,
    isBurgerMenu,
  } = useContext(AppContext)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  useEffect(() => {
    if (width > 850) {
      setIsMobileDevice(false)
      setIsBurgerMenu(false)
    } else if (width < 850) {
      setIsMobileDevice(true)
    }
  }, [width])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  )

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
        {isMobileDevice ? (
          <img
            src={isBurgerMenu ? close : burger}
            alt={'burger'}
            className={styles.burger_icon}
            onClick={() =>
              setIsBurgerMenu((isBurgerMen: boolean) => !isBurgerMen)
            }
          />
        ) : logIn && isAuth ? (
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
