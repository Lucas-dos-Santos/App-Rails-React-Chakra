import axios from 'axios'
import { getAuthUser } from '../services/auth/auth-service'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

instance.interceptors.request.use(
  (config) => {
    const authUser = getAuthUser()
    if (authUser) {
      console.log('nao pode cair aki *************')
      console.log(authUser)
      config.headers.authorization = `Bearer ${authUser.access_token}`
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

interface getProps {
  url: string
  params: Object
  config?: Object
}

const get = ({ url, params, config = {} }: getProps) => {
  return instance.get(url, { params, ...config })
}

interface postProps {
  url: string
  data: Object
  config?: Object
}

const post = ({ url, data, config = {} }: postProps) => {
  return instance.post(url, data, config)
}

const httpClient = { get, post }

export default httpClient
