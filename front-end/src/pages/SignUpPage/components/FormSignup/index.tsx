import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Link as LinkRouter } from 'react-router-dom'
import InputGeneric from '../../../../components/InputGeneric'
import { UserContext } from '../../../../contexts/userContext'
import { useContext, useState } from 'react'

const FormSignupValidationSchema = zod.object({
  fullName: zod.string().min(1, 'This field has to be filled'),
  email: zod
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: zod.string().min(1, { message: 'This field has to be filled.' }),
})

type FormSignupData = zod.infer<typeof FormSignupValidationSchema>

const FormSignup = () => {
  const { onSignUpUser } = useContext(UserContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupData>({
    resolver: zodResolver(FormSignupValidationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  function handleSignupUser(data: FormSignupData) {
    setIsSubmitting(true)
    try {
      onSignUpUser(data)
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
          <Heading fontSize={'3xl'}>Sign up</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit(handleSignupUser)}>
            <Stack spacing={4}>
              <InputGeneric
                type="text"
                name="fullName"
                label="Full Name"
                error={errors.fullName?.message}
                register={register}
              />
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
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  isLoading={isSubmitting}
                  bg={'blue.400'}
                  type="submit"
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link color={'blue.400'} as={LinkRouter} to="/signin">
                    Sign In
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

export default FormSignup
