import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LogInMenu } from '../LogInMenu/LogInMenu'
import { LogOutMenu } from '../LogOutMenu/LogOutMenu'
import { AppContext } from '../AppContext/AppContext'
// @ts-ignore
import logoWhite from '../../img/logo_white.png'
import styles from './Footer.module.scss'
// @ts-ignore
import burger from '../../img/burger_menu_icon.png'

export const Footer: React.FC = () => {
  const { logIn, setLogIn, isMobileDevice, setIsBurgerMenu } =
    useContext(AppContext)
  const toggleLogIn = () => setLogIn((logIn: boolean) => !logIn)

  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_nav}>
        <Link className={styles.logo_container} to={'AllArticles'}>
          <img
            className={styles.logo}
            src={logoWhite}
            alt={'logotype of footer'}
          />
        </Link>
        {isMobileDevice ? (
          <img
            src={burger}
            alt={'burger'}
            className={styles.burger_icon}
            onClick={() =>
              setIsBurgerMenu((isBurgerMen: boolean) => !isBurgerMen)
            }
          />
        ) : logIn ? (
          <LogInMenu login={toggleLogIn} style={'footer_logout'} />
        ) : (
          <LogOutMenu
            stylesSignIn={'footer_signIn'}
            stylesLogIn={'footer_logIn'}
          />
        )}
      </div>
      <div className={styles.rights}>
        <span>© 2021 Justice-it. All rights reserved.</span>
        <span>© 2021 Justice-team. All rights reserved.</span>
      </div>
    </footer>
  )
}
