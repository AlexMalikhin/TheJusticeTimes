import axios from 'axios'
import { viewArticleAction } from '../reducers/articleReducer/articleReducer'

export const viewArticleUpdate = (id) => {
  return function (dispatch) {
    axios
      .post('http://localhost:5001/article/viewArticle', { id: id })
      .then(() => dispatch(viewArticleAction(id)))
  }
}
