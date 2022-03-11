import Cookies from 'js-cookie'
import axios from 'axios'
import { getMyArticlesAction } from '../reducers/articleReducer/articleReducer'

export const getMyArticles = () => {
  return function (dispatch) {
    axios
      .get('http://localhost:5001/article/getMyArticles', {
        headers: { Authorization: Cookies.get('token') },
      })
      .then((res) => dispatch(getMyArticlesAction(res.data.message)))
  }
}
