import Cookies from 'js-cookie'
import axios from 'axios'
import { loadingUserAction } from '../reducers/userReducer'
import { getAllArticlesAction } from '../reducers/articleReducer'
import { getUserDataAction } from '../reducers/userReducer'

export const updateUserData = (firstname, lastname, avatar, description) => {
  return function (dispatch) {
    dispatch(loadingUserAction())
    axios
      .post(
        'http://localhost:5001/user/updateUser',
        { firstname, lastname, avatar, description },
        { headers: { Authorization: Cookies.get('token') } }
      )
      .then(
        dispatch(getUserDataAction(firstname, lastname, avatar, description))
      )
      .then(() => dispatch(getAllArticlesAction()))
  }
}
