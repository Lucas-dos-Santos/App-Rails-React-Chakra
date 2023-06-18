import axios from 'axios'
import { getAuthUser } from '../services/auth/auth-service'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

instance.interceptors.request.use(
  (config) => {
    const authUser = getAuthUser()
    if (authUser) {
      config.headers.authorization = authUser.accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    if (error?.response?.status === 401) {
      localStorage.removeItem('authUser')
    } else {
      return Promise.reject(error.response)
    }
  },
)

interface httpProps {
  url: string
  config?: Object
}
interface getProps extends httpProps {
  params: Object
}

const get = ({ url, params, config = {} }: getProps) => {
  return instance.get(url, { params, ...config })
}

interface postProps extends httpProps {
  data: Object
}

const post = ({ url, data, config = {} }: postProps) => {
  return instance.post(url, data, config)
}

const destroy = ({ url }: httpProps) => {
  const authUser = getAuthUser()
  const headers = {
    authorization: authUser.accessToken,
  }
  return instance.delete(url, { headers })
}

const httpClient = { get, post, destroy }

export default httpClient
