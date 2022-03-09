import axios from 'axios'
import Cookies from 'js-cookie'
import { getUserDataAction } from '../reducers/authReducer'

export const getCurrentUser = () => {
  return function (dispatch) {
    axios
      .get('http://localhost:5001/user/getUserData', {
        headers: { Authorization: Cookies.get('token') },
      })
      .then((res) => dispatch(getUserDataAction(res.data)))
  }
}
