import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import FormSignup from './components/FormSignup'
import { UserContext } from '../../contexts/userContext'

function SignUpPage() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [user, navigate])
  return <FormSignup />
}

export default SignUpPage
