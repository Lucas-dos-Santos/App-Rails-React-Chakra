import { onSignUserType } from '../../contexts/userContext'
import httpClient from '../../utils/http-client'

const signInUser = (data: onSignUserType) => {
  return httpClient.post({
    url: '/signin',
    data: { user: { ...data } },
  })
}

const signUpUser = (data: onSignUserType) => {
  return httpClient.post({
    url: '/signup',
    data: { user: { ...data } },
  })
}
/* const register = (data: any) => {
  return axios.post('/register', data)
}

const profile = () => {
  return axios.get('/user')
}

const logout = () => {
  return axios.get('/logout').then((data: any) => {
    localStorage.removeItem('authUser')
    return JSON.parse(data)
  })
} */

const getAuthUser = () => {
  const authUser = localStorage.getItem('authUser')
  return authUser ? JSON.parse(authUser) : authUser
}

export { signInUser, signUpUser, getAuthUser }
