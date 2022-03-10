import axios from 'axios'
import Cookies from 'js-cookie'
import { getUserDataAction } from '../reducers/userReducer'
import { loadingUserAction } from '../reducers/userReducer'

export const getCurrentUser = () => {
  return function (dispatch) {
    dispatch(loadingUserAction())
    axios
      .get('http://localhost:5001/user/getUserData', {
        headers: { Authorization: Cookies.get('token') },
      })
      .then((response) =>
        dispatch(
          getUserDataAction(
            response.data.firstname,
            response.data.lastname,
            response.data.avatar,
            response.data.description
          )
        )
      )
  }
}
