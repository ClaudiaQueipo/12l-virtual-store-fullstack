import { zodResolver } from '@hookform/resolvers/zod'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import authService from '../../../services/auth.service'
import { loginSchema } from '../schema/loginSchema'

export default function Login() {
  const [Loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const handleLoginUser = async (data) => {
    try {
      setLoading(true)

      const response = await authService.authenticate({
        email: data.email,
        password: data.password
      })

      if (response === 200) return navigate('/')

      toast.error('Invalid credentials')
    } catch (error) {
      toast.error(`Invalid credentials ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit(handleLoginUser)}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
        mb={2}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4">LOGIN</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => navigate('/create-account')}
        >
          Create Account
        </Button>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          {Loading ? <CircularProgress /> : null}
        </Box>
      </Box>
      <Toaster duration={3000} richColors position="bottom-center" />
    </form>
  )
}
