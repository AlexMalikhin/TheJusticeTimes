import axios from 'axios'
import Cookies from 'js-cookie'
import { userLogin } from '../reducers/authReducer'

export const userLogIn = (email, password) => {
  return function (dispatch) {
    axios
      .post('http://localhost:5001/auth/login', { email, password })
      .then((data) => Cookies.set('token', data.data.token))
      .then(() => dispatch(userLogin(Cookies.get('token'))))
  }
}
