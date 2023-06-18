import { ReactNode, createContext, useReducer } from 'react'
import { userReducer } from '../reducers/user/reducer'
import { signInUserAction } from '../reducers/user/actions'
import {
  getAuthUser,
  signInUser,
  signUpUser,
} from '../services/auth/auth-service'
import { useToast } from '@chakra-ui/react'

export interface UserType {
  id: number
  name: string
  email: string
  accessToken: string
}

export interface onSignUserType {
  fullName?: string
  email: string
  password: string
}

interface UserContextType {
  user: UserType
  onSignInUser: (data: onSignUserType) => void
  onSignUpUser: (data: onSignUserType) => void
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast()
  const [userState, dispatch] = useReducer(
    userReducer,
    {
      user: null,
    },
    (initialState) => {
      const storedStateAsJson = getAuthUser()

      if (storedStateAsJson) {
        return { user: { ...storedStateAsJson } }
      }

      return initialState
    },
  )

  async function onSignInUser(data: onSignUserType) {
    const response = await signInUser(data)
    if (response) {
      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        accessToken: response.headers.authorization,
      }
      localStorage.setItem('authUser', JSON.stringify(user))
      dispatch(signInUserAction(user))
    } else {
      toast({
        description: 'Error when logging in',
        status: 'error',
      })
    }
  }

  async function onSignUpUser(data: onSignUserType) {
    const response = await signUpUser(data)
    if (response) {
      if (response.data?.id === null) {
        toast({
          description: 'A user with this email already exists',
          status: 'error',
        })
      } else {
        const user = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          accessToken: response.headers.authorization,
        }
        localStorage.setItem('authUser', JSON.stringify(user))
        dispatch(signInUserAction(user))
      }
    } else {
      toast({
        description: 'Error when signing up',
        status: 'error',
      })
    }
  }

  const { user } = userState

  return (
    <UserContext.Provider value={{ user, onSignInUser, onSignUpUser }}>
      {children}
    </UserContext.Provider>
  )
}
