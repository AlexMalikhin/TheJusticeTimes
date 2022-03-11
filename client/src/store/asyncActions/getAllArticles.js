import axios from 'axios'
import { getAllArticlesAction } from '../reducers/articleReducer/articleReducer'

export const fetchAllArticles = () => {
  return function (dispatch) {
    axios
      .get('http://localhost:5001/article/getAllArticles')
      .then((res) => dispatch(getAllArticlesAction(res.data.message)))
  }
}
