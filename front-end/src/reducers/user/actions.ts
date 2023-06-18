import { UserType } from '../../contexts/userContext'

/* eslint-disable no-unused-vars */
export enum ActionTypes {
  SIGN_IN_USER = 'SIGN_IN_USER',
}

export function signInUserAction(user: UserType) {
  return {
    type: ActionTypes.SIGN_IN_USER,
    payload: {
      user,
    },
  }
}
