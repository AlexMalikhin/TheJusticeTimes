import { ArticleInterface } from '../../../types/types'

export interface ArticleReducerState {
  allArticles: undefined | ArticleInterface[]
  myArticles: undefined | ArticleInterface[]
  mostPopularArticle: undefined | ArticleInterface
}

export enum ArticlesActionsTypes {
  GET_ALL_ARTICLES = 'GET_ALL_ARTICLES',
  GET_MOST_POPULAR_ARTICLE = 'GET_MOST_POPULAR_ARTICLE',
  GET_MY_ARTICLES = 'GET_MY_ARTICLES',
  VIEW_ARTICLE = 'VIEW_ARTICLE',
}

export interface getAllArticlesActionInterface {
  type: ArticlesActionsTypes.GET_ALL_ARTICLES
  payload?: ArticleInterface[] | []
}

interface getPopularArticleActionInterface {
  type: ArticlesActionsTypes.GET_MOST_POPULAR_ARTICLE
  payload: ArticleInterface
}

interface getMyArticlesActionInterface {
  type: ArticlesActionsTypes.GET_MY_ARTICLES
  payload: ArticleInterface[]
}

interface viewArticleActionInterface {
  type: ArticlesActionsTypes.VIEW_ARTICLE
  payload: string
}

export type ArticleAction =
  | getAllArticlesActionInterface
  | getPopularArticleActionInterface
  | getMyArticlesActionInterface
  | viewArticleActionInterface
