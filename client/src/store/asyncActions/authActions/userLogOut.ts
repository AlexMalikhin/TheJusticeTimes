import Cookies from 'js-cookie'
import { userLogOutAction } from '../../reducers/authReducer/actions'
import { Dispatch } from 'redux'
import { authAction } from '../../reducers/authReducer/types'

export const userLogOut = () => {
  return function (dispatch: Dispatch<authAction>) {
    Cookies.remove('token')
    dispatch(<authAction>userLogOutAction())
  }
}
