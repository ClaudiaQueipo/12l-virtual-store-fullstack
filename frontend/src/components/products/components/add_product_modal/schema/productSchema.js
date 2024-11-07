import { z } from 'zod'

const digitalProductSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  downloadLink: z.string().url('The link must be a valid URL'),
  shippingCost: z.undefined()
})

const physicalProductSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  shippingCost: z.number().positive('Shipping cost must be a positive number'),
  downloadLink: z.undefined()
})

export const productSchema = z.union([
  digitalProductSchema,
  physicalProductSchema
])
