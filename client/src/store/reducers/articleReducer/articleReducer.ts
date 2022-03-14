import { ArticleReducerState } from './types'
import { ArticleInterface } from '../../../types/types'
import { ArticlesActionsTypes } from './types'
import { ArticleAction } from './types'

const articleStore: ArticleReducerState = {
  allArticles: [],
  myArticles: [],
  mostPopularArticle: undefined,
}

export const articleReducer = (state = articleStore, action: ArticleAction) => {
  switch (action.type) {
    case ArticlesActionsTypes.GET_ALL_ARTICLES:
      if (action.payload?.length) {
        return { ...state, allArticles: [...action.payload] }
      }
      return state
    case ArticlesActionsTypes.GET_MY_ARTICLES:
      return { ...state, myArticles: [...action.payload] }
    case ArticlesActionsTypes.GET_MOST_POPULAR_ARTICLE:
      return { ...state, mostPopularArticle: { ...action.payload } }
    case ArticlesActionsTypes.VIEW_ARTICLE:
      return {
        ...state,
        allArticles: state?.allArticles?.length
          ? state.allArticles.map((item: ArticleInterface) => {
              if (item._id === action.payload) {
                return { ...item, views: item?.views + 1 }
              }
              return item
            })
          : [],
        myArticles: state?.myArticles?.length
          ? state.myArticles.map((item: ArticleInterface) => {
              if (item._id === action.payload) {
                return { ...item, views: item.views + 1 }
              }
              return item
            })
          : [],
      }
    default:
      return state
  }
}
