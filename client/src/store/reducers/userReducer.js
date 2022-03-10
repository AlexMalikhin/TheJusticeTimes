import Cookies from 'js-cookie'

const USER_LOG_OUT = 'USER_LOG_OUT'
const USER_LOG_IN = 'USER_LOG_IN'
const GET_USER_DATA = 'GET_USER_DATA'
const LOADING_USER_DATA = 'LOADING_USER_DATA'

const userStore = {
  token: Cookies.get('token') || null,
  isAuthenticated: Boolean(Cookies.get('token')),
  currentUser: {
    firstname: null,
    lastname: null,
    avatar: null,
    description: null,
  },
  isLoading: false,
}

export const userReducer = (state = userStore, action) => {
  switch (action.type) {
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
        currentUser: {
          firstname: null,
          lastname: null,
          avatar: null,
          description: null,
        },
      }
    case LOADING_USER_DATA:
      return { ...state, isLoading: true }
    case GET_USER_DATA:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          avatar: action.payload.avatar,
          description: action.payload.description,
        },
        isLoading: false,
      }
    default:
      return state
  }
}

export const userLoginAction = (token) => ({
  type: 'USER_LOG_IN',
  payload: { token },
})

export const getUserDataAction = (
  firstname,
  lastname,
  avatar,
  description
) => ({
  type: 'GET_USER_DATA',
  payload: { firstname, lastname, avatar, description },
})

export const userLogOutAction = () => ({ type: 'USER_LOG_OUT' })
export const loadingUserAction = () => ({ type: 'LOADING_USER_DATA' })
