export interface userInterface {
  firstname: string | null
  lastname: string | null
  avatar: string | null
  description: string | null
}

export interface authInterface {
  token: string | null
  isAuthenticated: boolean
  currentUser: userInterface
  isLoading: boolean
}

export interface userLogOutActionInterface {
  type: authActionTypes.USER_LOG_OUT
}

export interface loadingUserActionInterface {
  type: authActionTypes.LOADING_USER_DATA
}

export interface getUserDataActionInterface {
  type: authActionTypes.GET_USER_DATA
  payload: any
}
export interface userLoginActionInterface {
  type: authActionTypes.USER_LOG_IN
  payload: any
}
export type authAction =
  | userLoginActionInterface
  | getUserDataActionInterface
  | loadingUserActionInterface
  | userLogOutActionInterface
export enum authActionTypes {
  USER_LOG_OUT = 'USER_LOG_OUT',
  GET_USER_DATA = 'GET_USER_DATA',
  LOADING_USER_DATA = 'LOADING_USER_DATA',
  USER_LOG_IN = 'USER_LOG_IN',
}
