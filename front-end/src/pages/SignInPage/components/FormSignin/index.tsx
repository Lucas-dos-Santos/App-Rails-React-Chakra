import {
  Flex,
  Box,
  Stack,
  Link,
  Text,
  Button,
  Heading,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Link as LinkRouter } from 'react-router-dom'
import { useContext, useState } from 'react'
import InputGeneric from '../../../../components/InputGeneric'
import { UserContext } from '../../../../contexts/userContext'

const FormSigninValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: zod.string().min(1, { message: 'This field has to be filled.' }),
})

type FormSigninData = zod.infer<typeof FormSigninValidationSchema>

const FormSignin = () => {
  const { onSignInUser } = useContext(UserContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSigninData>({
    resolver: zodResolver(FormSigninValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function handleSigninUser(data: FormSigninData) {
    setIsSubmitting(true)
    try {
      onSignInUser(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minW={'md'}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          p={8}
          rounded={'lg'}
          boxShadow={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
        >
          <form onSubmit={handleSubmit(handleSigninUser)}>
            <Stack spacing={4}>
              <InputGeneric
                type="email"
                name="email"
                label="Email address"
                error={errors.email?.message}
                register={register}
              />
              <InputGeneric
                type="password"
                name="password"
                label="Password"
                error={errors.password?.message}
                register={register}
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  bg={'blue.400'}
                  loadingText="Submitting"
                  isLoading={isSubmitting}
                  color={'white'}
                  type="submit"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  {"Don't have an account? "}
                  <Link color={'blue.400'} as={LinkRouter} to="/signup">
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default FormSignin
