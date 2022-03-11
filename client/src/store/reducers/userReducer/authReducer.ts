import Cookies from 'js-cookie'

interface userInterface {
  firstname: string | null
  lastname: string | null
  avatar: string | null
  description: string | null
}

interface authInterface {
  token: string | null
  isAuthenticated: boolean
  currentUser: userInterface
  isLoading: boolean
}

interface userLogOutActionInterface {
  type: authActionTypes.USER_LOG_OUT
}

interface loadingUserActionInterface {
  type: authActionTypes.LOADING_USER_DATA
}

interface getUserDataActionInterface {
  type: authActionTypes.GET_USER_DATA
  payload: any
}
interface userLoginActionInterface {
  type: authActionTypes.USER_LOG_IN
  payload: any
}
type authAction =
  | userLoginActionInterface
  | getUserDataActionInterface
  | loadingUserActionInterface
  | userLogOutActionInterface
enum authActionTypes {
  USER_LOG_OUT = 'USER_LOG_OUT',
  GET_USER_DATA = 'GET_USER_DATA',
  LOADING_USER_DATA = 'LOADING_USER_DATA',
  USER_LOG_IN = 'USER_LOG_IN',
}

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

export const userLoginAction = (token: string) => ({
  type: authActionTypes.USER_LOG_IN,
  payload: { token },
})

export const getUserDataAction = (
  firstname: userInterface,
  lastname: userInterface,
  avatar: userInterface,
  description: userInterface
): getUserDataActionInterface => ({
  type: authActionTypes.GET_USER_DATA,
  payload: { firstname, lastname, avatar, description },
})

export const userLogOutAction = () => ({ type: authActionTypes.USER_LOG_OUT })
export const loadingUserAction = () => ({
  type: authActionTypes.LOADING_USER_DATA,
})
