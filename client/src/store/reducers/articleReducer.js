const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_MY_ARTICLES = 'GET_MY_ARTICLES';
const GET_MOST_POPULAR_ARTICLE = ''

const articleStore = {
    allArticles: [],
    myArticles: [],
    mostPopularArticle: {}
}

export const articleReducer = (state = articleStore, action) =>{
    switch (action.type){
        case GET_ALL_ARTICLES:
            return {...state, allArticles: [...state.allArticles, ...action.payload]}
        case GET_MY_ARTICLES:
            return {...state, myArticles: [...state.myArticles, ...action.payload]}
        case GET_MOST_POPULAR_ARTICLE:
            return {...state, mostPopularArticle: {...action.payload}}
        default:
            return state
    }
}

export const getAllArticlesAction = (payload) =>({type: GET_ALL_ARTICLES, payload})
export const getMostPopularArticleAction = (payload) =>({type: GET_MOST_POPULAR_ARTICLE, payload})