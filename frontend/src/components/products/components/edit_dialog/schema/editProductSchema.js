import { z } from 'zod'

export const editProductSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    downloadLink: z.string().url('The link must be a valid URL').optional(),
    shippingCost: z
      .number()
      .positive('Shipping cost must be a positive number')
      .optional()
  })
  .refine(
    (data) => {
      if (data.downloadLink && data.shippingCost !== undefined) {
        return false
      }
      return true
    },
    {
      message:
        'Only a download link or a shipping cost can be provided, not both.',
      path: ['downloadLink']
    }
  )
