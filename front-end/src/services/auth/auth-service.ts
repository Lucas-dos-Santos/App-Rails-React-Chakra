import { onSignUserType } from '../../contexts/userContext'
import httpClient from '../../utils/http-client'

function signInUser(data: onSignUserType) {
  return httpClient.post({
    url: '/signin',
    data: { user: { ...data } },
  })
}

function signUpUser(data: onSignUserType) {
  return httpClient.post({
    url: '/signup',
    data: { user: { ...data } },
  })
}

function signOutUser() {
  return httpClient.destroy({
    url: '/signout',
  })
}

function getAuthUser() {
  const authUser = localStorage.getItem('authUser')
  return authUser ? JSON.parse(authUser) : authUser
}

export { signInUser, signUpUser, getAuthUser, signOutUser }
