import { extendTheme, ToastProviderProps } from '@chakra-ui/react'

export const defaultTheme = extendTheme({
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
})

export const toastOptions: ToastProviderProps = {
  defaultOptions: { position: 'top-right', isClosable: true, duration: 3000 },
}
