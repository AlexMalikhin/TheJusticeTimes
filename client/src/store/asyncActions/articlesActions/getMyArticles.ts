import Cookies from 'js-cookie'
import axios from 'axios'
import { getMyArticlesAction } from '../../reducers/articleReducer/actions'
import { ArticleAction } from '../../reducers/articleReducer/types'
import { Dispatch } from 'redux'
import { AuthType } from '../../../types/types'

export const getMyArticles = () => {
  return function (dispatch: Dispatch<ArticleAction>) {
    axios
      .get('http://localhost:5001/article/getMyArticles', {
        headers: { Authorization: <AuthType>Cookies.get('token') },
      })
      .then((res) =>
        dispatch(<ArticleAction>getMyArticlesAction(res.data.myArticles))
      )
  }
}
