import Cookies from 'js-cookie'
import { userLogOutAction } from '../reducers/userReducer/authReducer'

export const userLogOut = () => {
  return function (dispatch) {
    Cookies.remove('token')
    dispatch(userLogOutAction())
  }
}
