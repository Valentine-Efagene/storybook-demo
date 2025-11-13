import { z } from 'zod'

export const planUpdateSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    downpaymentPercentage: z.number().min(0).max(100),
    allowMortgage: z.boolean(),
    allowDownpayment: z.boolean(),
})