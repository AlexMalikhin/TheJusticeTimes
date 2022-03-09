import Cookies from 'js-cookie'

const USER_LOADING = 'USER_LOADING'
const USER_LOADED = 'USER_LOADED'
const USER_LOG_OUT = 'USER_LOG_OUT'
const USER_LOG_IN = 'USER_LOG_IN'
const GET_USER_DATA = 'GET_USER_DATA'

const authStore = {
  token: Cookies.get('token') || null,
  isAuthenticated: Boolean(Cookies.get('token')),
  // isLoading: false,
  user: null,
}

export const authReducer = (state = authStore, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }
    case USER_LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      }
    case USER_LOG_OUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      }
    case GET_USER_DATA:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
      }
    default:
      return state
  }
}

export const userLogin = (payload) => ({
  type: USER_LOG_IN,
  payload: { token: payload },
})
export const getUserDataAction = (payload) => ({ type: GET_USER_DATA, payload })
export const userLoading = () => ({ type: USER_LOADING })
export const userLogouting = () => ({ type: USER_LOG_OUT })
