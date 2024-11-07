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
import { createAccountSchema } from '../schema/createAccountSchema'

export default function CreateAccount() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(createAccountSchema)
  })
  const navigate = useNavigate()

  const handleRegisterUser = async (data) => {
    try {
      setLoading(true)
      const response = await authService.register(data)

      if (response.error) return toast.error(response.error)

      if (response === 200) {
        return navigate('/')
      }
    } catch (error) {
      toast.error(`Error creating the account: ${error.response.data.error}`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
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
        <Typography variant="h4">Create Account</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label="First Name"
          {...register('firstname')}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          label="Last Name"
          {...register('lastname')}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
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
        <TextField
          label="Repeat password"
          type="password"
          {...register('repeatPassword')}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />

        <Button type="submit" variant="contained" color="primary">
          Create Account
        </Button>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          {loading ? <CircularProgress /> : null}
        </Box>
      </Box>
      <Toaster duration={3000} richColors position="bottom-center" />
    </form>
  )
}
