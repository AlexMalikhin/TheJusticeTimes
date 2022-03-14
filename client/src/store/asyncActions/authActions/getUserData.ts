import axios from 'axios'
import Cookies from 'js-cookie'
import { getUserDataAction } from '../../reducers/authReducer/actions'
import { loadingUserAction } from '../../reducers/authReducer/actions'
import { Dispatch } from 'redux'
import { authAction } from '../../reducers/authReducer/types'
import { AuthType } from '../../../types/types'

export const getCurrentUser = () => {
  return function (dispatch: Dispatch<authAction>) {
    dispatch(<authAction>loadingUserAction())
    axios
      .get('http://localhost:5001/user/getUserData', {
        headers: { Authorization: <AuthType>Cookies.get('token') },
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
