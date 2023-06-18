import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme, toastOptions } from './assets/themes/defaultTheme'
import Router from './Router'
import { UserContextProvider } from './contexts/userContext'

const App = () => {
  return (
    <ChakraProvider theme={defaultTheme} toastOptions={toastOptions}>
      <BrowserRouter>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
export default App
