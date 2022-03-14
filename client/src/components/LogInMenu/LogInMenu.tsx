import { NavLink } from 'react-router-dom'
import React from 'react'
import { Button } from '../Button/Button'
import styles from './LogInMenu.module.css'
import { ButtonStylesType } from '../../types/types'

interface LogInMenuProps {
  login: () => void
  style: ButtonStylesType
}

export const LogInMenu: React.FC<LogInMenuProps> = ({ login, style }) => {
  return (
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
  )
}
