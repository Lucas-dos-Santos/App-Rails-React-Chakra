import { Navigate, Outlet } from 'react-router-dom'
import { getAuthUser } from './auth-service'

const AuthGuard = () => {
  const authUser = getAuthUser()

  return authUser ? <Outlet /> : <Navigate to="/signin" replace />
}

export default AuthGuard
