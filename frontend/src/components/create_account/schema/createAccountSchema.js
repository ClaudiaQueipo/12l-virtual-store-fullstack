import { z } from 'zod'

export const createAccountSchema = z
  .object({
    firstname: z.string().min(1, { message: 'First name is required' }),
    lastname: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Email format must be correct' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    repeatPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' })
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  })
