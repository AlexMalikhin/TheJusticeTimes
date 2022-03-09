import Cookies from 'js-cookie'
import { userLogouting } from '../reducers/authReducer'

export const userLogOut = () => {
  return function (dispatch) {
    Cookies.remove('token')
    dispatch(userLogouting())
  }
}
