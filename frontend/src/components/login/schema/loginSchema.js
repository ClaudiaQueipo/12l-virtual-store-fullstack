import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'El nombre tiene que ser al menos de 2 caracteres' }),
  password: z
    .string()
    .min(4, { message: 'Password has to be at least 4 characters' })
})

export default loginSchema
