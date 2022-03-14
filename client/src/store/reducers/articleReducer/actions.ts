import { ArticleInterface } from '../../../types/types'
import { ArticlesActionsTypes } from './types'

export const getAllArticlesAction = (allArticles?: ArticleInterface[]) => ({
  type: ArticlesActionsTypes.GET_ALL_ARTICLES,
  payload: allArticles,
})
export const getMostPopularArticleAction = (
  popularArticle: ArticleInterface
) => ({
  type: ArticlesActionsTypes.GET_MOST_POPULAR_ARTICLE,
  payload: popularArticle,
})
export const getMyArticlesAction = (myArticles: ArticleInterface[]) => ({
  type: ArticlesActionsTypes.GET_MY_ARTICLES,
  payload: myArticles,
})
export const viewArticleAction = (id: string) => ({
  type: ArticlesActionsTypes.VIEW_ARTICLE,
  payload: id,
})
