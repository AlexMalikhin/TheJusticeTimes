import Cookies from 'js-cookie'
import { authActionTypes } from './types'
import { authAction } from './types'
import { authInterface } from './types'

const initialState: authInterface = {
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

export const authReducer = (state = initialState, action: authAction) => {
  switch (action.type) {
    case authActionTypes.USER_LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      }
    case authActionTypes.USER_LOG_OUT:
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
    case authActionTypes.LOADING_USER_DATA:
      return { ...state, isLoading: true }
    case authActionTypes.GET_USER_DATA:
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
