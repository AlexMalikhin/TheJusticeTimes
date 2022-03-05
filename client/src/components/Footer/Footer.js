import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LogInMenu } from '../LogInMenu/LogInMenu'
import { LogOutMenu } from '../LogOutMenu/LogOutMenu'
import { AppContext } from '../AppContext/AppContext'
import logoWhite from '../../img/logo_white.png'
import styles from './Footer.module.css'

export const Footer = () => {
  const { logIn, setLogIn } = useContext(AppContext)
  const toggleLogIn = () => setLogIn((logIn) => !logIn)

  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_nav}>
        <Link to={'AllArticles'}>
          <img
            className={styles.logo}
            src={logoWhite}
            alt={'logotype of footer'}
          />
        </Link>
        {logIn ? (
          <LogInMenu login={toggleLogIn} style={'footer_logout'} />
        ) : (
          <LogOutMenu
            login={toggleLogIn}
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
