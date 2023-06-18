import { Routes, Route } from 'react-router-dom'
import AuthGuard from './services/auth/auth-guard'
import DefaultLayout from './layouts/DefaultLayout'
import { HomePage, SignUpPage, SignInPage, NotFoundPage } from './pages'

const PrivateText = () => {
  return <div>private route</div>
}
function Router() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="*" element={<NotFoundPage />} />

      <Route element={<AuthGuard />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<PrivateText />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
