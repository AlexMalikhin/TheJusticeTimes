import axios from 'axios'
import { getMostPopularArticleAction } from '../reducers/articleReducer'

export const fetchPopularArticle = () => {
  return function (dispatch) {
    axios
      .get('http://localhost:5001/article/getPopularArticle')
      .then((res) => dispatch(getMostPopularArticleAction(res.data.message)))
  }
}
