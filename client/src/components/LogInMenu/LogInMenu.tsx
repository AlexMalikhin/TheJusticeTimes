import { NavLink } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import { Button } from '../Button/Button'
import { BurgerLogIn } from '../BurgerLogIn/BurgerLogIn'
import { AppContext } from '../AppContext/AppContext'
import { ButtonStylesType } from '../../types/types'
import styles from './LogInMenu.module.scss'

interface LogInMenuProps {
  login: () => void
  style: ButtonStylesType
}

export const LogInMenu: React.FC<LogInMenuProps> = ({ login, style }) => {
  const { isMobileDevice } = useContext(AppContext)

  return (
    <>
      {!isMobileDevice && (
        <nav className={styles.logout}>
          <ul className={styles.logout_list}>
            <li>
              <NavLink
                className={(nav) =>
                  nav.isActive ? styles.active : styles.logout_li
                }
                to="./AllArticles"
              >
                All articles
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(nav) =>
                  nav.isActive ? styles.active : styles.logout_li
                }
                to="./MyArticles"
              >
                My articles
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(nav) =>
                  nav.isActive ? styles.active : styles.logout_li
                }
                to="./AddArticle"
              >
                Add article
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(nav) =>
                  nav.isActive ? styles.active : styles.logout_li
                }
                to="./Profile"
              >
                Profile
              </NavLink>
            </li>
          </ul>
          <Button click={login} type={style} title="LogOut" disable={false} />
        </nav>
      )}
    </>
  )
}
