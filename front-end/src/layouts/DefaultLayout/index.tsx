import { Outlet } from 'react-router-dom'
import { Flex, useColorModeValue } from '@chakra-ui/react'

import Header from '../../components/Header'

function DefaultLayout() {
  return (
    <Flex
      h="100vh"
      display="block"
      bg={useColorModeValue('gray.50', 'gray.600')}
    >
      <Header>
        <Outlet />
      </Header>
    </Flex>
  )
}

export default DefaultLayout
