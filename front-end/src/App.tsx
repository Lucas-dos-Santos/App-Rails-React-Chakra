import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme, toastOptions } from './assets/themes/defaultTheme'
import Router from './Router'
import { UserContextProvider } from './contexts/userContext'

const App = () => {
  return (
    <ChakraProvider theme={defaultTheme} toastOptions={toastOptions}>
      <UserContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserContextProvider>
    </ChakraProvider>
  )
}
export default App
