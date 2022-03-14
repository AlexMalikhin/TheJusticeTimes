import axios from 'axios'
import Cookies from 'js-cookie'
import { userLoginAction } from '../../reducers/authReducer/actions'
import { Dispatch } from 'redux'
import { authAction } from '../../reducers/authReducer/types'

export const userLogIn = (email: string, password: string) => {
  return function (dispatch: Dispatch<authAction>) {
    axios
      .post('http://localhost:5001/auth/login', { email, password })
      .then((data) => Cookies.set('token', data.data.token))
      .then(() => dispatch(<authAction>userLoginAction(Cookies.get('token'))))
  }
}
