import { authActionTypes } from './types'
import { userInterface } from './types'
import { getUserDataActionInterface } from './types'

export const userLoginAction = (token: string | undefined) => ({
  type: authActionTypes.USER_LOG_IN,
  payload: { token },
})

export const getUserDataAction = (
  firstname: string,
  lastname: string,
  avatar: string | ArrayBuffer | null,
  description: string
): getUserDataActionInterface => ({
  type: authActionTypes.GET_USER_DATA,
  payload: { firstname, lastname, avatar, description },
})

export const userLogOutAction = () => ({ type: authActionTypes.USER_LOG_OUT })
export const loadingUserAction = () => ({
  type: authActionTypes.LOADING_USER_DATA,
})
