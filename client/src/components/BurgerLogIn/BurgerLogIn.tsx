import styles from './BurgerLogIn.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import React, { useContext } from 'react'
import { AppContext } from '../AppContext/AppContext'
import { userLogOut } from '../../store/asyncActions/authActions/userLogOut'
import { useDispatch } from 'react-redux'
import App from '../../App'

export const BurgerLogIn = () => {
  const { setIsBurgerMenu } = useContext(AppContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut = () => {
    setIsBurgerMenu(false)
    dispatch(userLogOut())
    navigate('/AllArticles')
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.burger_list}>
          <li className={styles.container_li}>
            <NavLink
              className={(nav) => (nav.isActive ? styles.active : styles.link)}
              to="./AllArticles"
            >
              All articles
            </NavLink>
          </li>
          <li className={styles.container_li}>
            <NavLink
              className={(nav) => (nav.isActive ? styles.active : styles.link)}
              to="./MyArticles"
            >
              My articles
            </NavLink>
          </li>
          <li className={styles.container_li}>
            <NavLink
              className={(nav) => (nav.isActive ? styles.active : styles.link)}
              to="./AddArticle"
            >
              Add article
            </NavLink>
          </li>
          <li className={styles.container_li}>
            <NavLink
              className={(nav) => (nav.isActive ? styles.active : styles.link)}
              to="./Profile"
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <Button
          click={logOut}
          type={'burger_menu_logout'}
          title="LogOut"
          disable={false}
        />
      </nav>
    </div>
  )
}
