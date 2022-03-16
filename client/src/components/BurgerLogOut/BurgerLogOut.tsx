import styles from './BurgerLogOut.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import React, { useContext } from 'react'
import { AppContext } from '../AppContext/AppContext'
import { userLogOut } from '../../store/asyncActions/authActions/userLogOut'
import { useDispatch } from 'react-redux'

export const BurgerLogOut = () => {
  const { setIsBurgerMenu } = useContext(AppContext)
  const navigate = useNavigate()
  const followLogInPage = () => {
    navigate('/LogIn')
    setIsBurgerMenu(false)
  }
  const followSignInPage = () => {
    navigate('/SignIn')
    setIsBurgerMenu(false)
  }

  return (
    <div className={styles.container}>
      <Button
        click={followLogInPage}
        type={'burger_menu_logout'}
        title="Log in"
        disable={false}
      />
      <Button
        click={followSignInPage}
        type={'burger_menu_logout'}
        title="Sign in"
        disable={false}
      />
    </div>
  )
}
