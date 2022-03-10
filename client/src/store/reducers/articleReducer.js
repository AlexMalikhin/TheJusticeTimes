const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES'
const GET_MY_ARTICLES = 'GET_MY_ARTICLES'
const GET_MOST_POPULAR_ARTICLE = 'GET_MOST_POPULAR_ARTICLE'
const VIEW_ARTICLE = 'VIEW_ARTICLE'

const articleStore = {
  allArticles: [],
  myArticles: [],
  mostPopularArticle: {},
}

export const articleReducer = (state = articleStore, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return { ...state, allArticles: [...action.payload] }
    case GET_MY_ARTICLES:
      return { ...state, myArticles: [...action.payload] }
    case GET_MOST_POPULAR_ARTICLE:
      return { ...state, mostPopularArticle: { ...action.payload } }
    case VIEW_ARTICLE:
      return {
        ...state,
        allArticles: state.allArticles.map((item) => {
          if (item._id === action.payload) {
            return { ...item, views: item.views + 1 }
          }
          return item
        }),
        myArticles: state.myArticles.map((item) => {
          if (item._id === action.payload) {
            return { ...item, views: item.views + 1 }
          }
          return item
        }),
      }
    default:
      return state
  }
}

export const getAllArticlesAction = (payload) => ({
  type: 'GET_ALL_ARTICLES',
  payload,
})
export const getMostPopularArticleAction = (payload) => ({
  type: 'GET_MOST_POPULAR_ARTICLE',
  payload,
})
export const getMyArticlesAction = (payload) => ({
  type: 'GET_MY_ARTICLES',
  payload,
})
export const viewArticleAction = (payload) => ({
  type: 'VIEW_ARTICLE',
  payload,
})
