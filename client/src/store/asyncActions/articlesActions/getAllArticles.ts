import axios from 'axios'
import { getAllArticlesAction } from '../../reducers/articleReducer/actions'
import { Dispatch } from 'redux'
import { ArticleAction } from '../../reducers/articleReducer/types'

export const fetchAllArticles = () => {
  return function (dispatch: Dispatch<ArticleAction>) {
    axios
      .get('http://localhost:5001/article/getAllArticles')
      .then((res) =>
        dispatch(<ArticleAction>getAllArticlesAction(res.data.allArticles))
      )
  }
}
