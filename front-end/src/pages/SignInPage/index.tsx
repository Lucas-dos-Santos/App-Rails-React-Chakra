import { useContext, useEffect } from 'react'
import FormSignin from './components/FormSignin'
import { UserContext } from '../../contexts/userContext'
import { useNavigate } from 'react-router-dom'

function SignInPage() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])
  return <FormSignin />
}

export default SignInPage
