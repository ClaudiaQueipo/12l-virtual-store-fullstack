import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'The name must have at least 2 characters' }),
  password: z
    .string()
    .min(4, { message: 'Password has to be at least 4 characters' })
})

export default loginSchema
