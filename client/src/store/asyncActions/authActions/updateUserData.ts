import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig } from 'axios'
import { loadingUserAction } from '../../reducers/authReducer/actions'
import { getAllArticlesAction } from '../../reducers/articleReducer/actions'
import { getUserDataAction } from '../../reducers/authReducer/actions'
import { Dispatch } from 'redux'
import { authAction } from '../../reducers/authReducer/types'
import { ArticleAction } from '../../reducers/articleReducer/types'
import { AuthType } from '../../../types/types'

export const updateUserData = (
  firstname: string,
  lastname: string,
  avatar: string | ArrayBuffer | null,
  description: string
) => {
  return function (dispatch: Dispatch<authAction | ArticleAction>) {
    dispatch(<authAction>loadingUserAction())
    axios
      .post(
        'http://localhost:5001/user/updateUser',
        { firstname, lastname, avatar, description },
        { headers: { Authorization: <AuthType>Cookies.get('token') } }
      )
      .then(() =>
        dispatch(
          <authAction>(
            getUserDataAction(firstname, lastname, avatar, description)
          )
        )
      )
      .then(() => dispatch(<ArticleAction>getAllArticlesAction()))
  }
}
