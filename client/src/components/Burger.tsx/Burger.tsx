import { useContext } from 'react'
import { AppContext } from '../AppContext/AppContext'
import { BurgerLogOut } from '../BurgerLogOut/BurgerLogOut'
import { BurgerLogIn } from '../BurgerLogIn/BurgerLogIn'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const Burger = () => {
  const isAuth = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  )
  const { logIn } = useContext(AppContext)
  return <> {isAuth ? <BurgerLogIn /> : <BurgerLogOut />}</>
}
