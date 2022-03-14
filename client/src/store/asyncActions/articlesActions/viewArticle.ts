import axios from 'axios'
import { viewArticleAction } from '../../reducers/articleReducer/actions'
import { ArticleAction } from '../../reducers/articleReducer/types'
import { Dispatch } from 'redux'

export const viewArticleUpdate = (id: string) => {
  return function (dispatch: Dispatch<ArticleAction>) {
    axios
      .post('http://localhost:5001/article/viewArticle', { id: id })
      .then(() => dispatch(<ArticleAction>viewArticleAction(id)))
  }
}
