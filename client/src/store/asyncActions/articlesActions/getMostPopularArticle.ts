import axios from 'axios'
import { getMostPopularArticleAction } from '../../reducers/articleReducer/actions'
import { ArticleAction } from '../../reducers/articleReducer/types'
import { Dispatch } from 'redux'

export const getPopularArticle = () => {
  return function (dispatch: Dispatch<ArticleAction>) {
    axios
      .get('http://localhost:5001/article/getPopularArticle')
      .then((res) =>
        dispatch(
          <ArticleAction>getMostPopularArticleAction(res.data.popularArticle)
        )
      )
  }
}
