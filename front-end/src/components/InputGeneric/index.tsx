import {
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'

interface InputGenericType {
  type: string
  name: string
  label: string
  error: string | undefined
  register: Function
}

const InputGeneric = ({
  type,
  name,
  label,
  error,
  register,
}: InputGenericType) => {
  return (
    <FormControl isRequired isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} {...register(name)} required />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default InputGeneric
