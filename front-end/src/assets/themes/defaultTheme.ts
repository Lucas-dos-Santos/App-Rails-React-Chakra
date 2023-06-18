import { extendTheme, ToastProviderProps } from '@chakra-ui/react'

export const defaultTheme = extendTheme({})

export const toastOptions: ToastProviderProps = {
  defaultOptions: { position: 'top-right', isClosable: true, duration: 3000 },
}
