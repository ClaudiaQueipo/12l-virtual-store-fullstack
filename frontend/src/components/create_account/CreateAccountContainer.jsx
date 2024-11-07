import CreateAccount from './components/CreateAccount'
import { Box, Stack } from '@mui/material'
import { useSelector } from 'react-redux'

export default function CreateAccountContainer() {
  const currentTheme = useSelector((state) => state.theme.theme)

  const backgroundColor =
    currentTheme === 'dark' ? '' : currentTheme === 'light' ? '#fff' : ''

  return (
    <Stack
      display={'flex'}
      sx={{ width: '100vw', height: '100vh', background: backgroundColor }}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        p={5}
        borderRadius={2}
        sx={{ width: { xs: '70%', sm: '60%', md: '40%' } }}
      >
        <CreateAccount />
      </Box>
    </Stack>
  )
}
