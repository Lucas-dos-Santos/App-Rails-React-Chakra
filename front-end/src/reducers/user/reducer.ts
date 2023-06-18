import { ActionTypes } from './actions'

interface UserState {
  user: {
    id: number
    name: string
    email: string
  }
}

export function userReducer(state: UserState, action: any) {
  switch (action.type) {
    case ActionTypes.SIGN_IN_USER: {
      console.log(action)
      return {
        ...state,
        user: action.payload.user,
      }
    }
    default:
      return state
  }
}
