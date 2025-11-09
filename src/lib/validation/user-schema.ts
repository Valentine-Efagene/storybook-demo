import { z } from 'zod'

export const signInSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const singleImageSchema = z
    .instanceof(File)
    .refine(file => file.size > 0, { message: 'File is required' })
    .refine(file => file.size < 5 * 1024 * 1024, { message: 'Max size is 5MB' })
    .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
        message: 'Only JPG, PNG, or WEBP files allowed',
    })

export const singleCsvSchema = z
    .instanceof(File)
    .refine(file => file.size > 0, { message: 'File is required' })
    .refine(file => file.size < 5 * 1024 * 1024, { message: 'Max size is 5MB' })
    .refine(file => ['text/csv'].includes(file.type), {
        message: 'Only CSV files allowed',
    })

export const bulkInvitationSchema = z.object({
    file: singleCsvSchema
})

export type SingleCsvDto = z.infer<typeof singleCsvSchema>
export type BulkInvitationDto = z.infer<typeof bulkInvitationSchema>

export const profileEditSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    file: z
        .array(singleImageSchema)
        .min(1, 'A file is required').max(1, 'Only one file').optional(),
    phone: z.string(),
})

export type ProfileEditDto = z.infer<typeof profileEditSchema>

export const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address")
})

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
    newPassword: z.string(),
    token: z.string(),
})

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export const roleUpdateSchema = z.object({
    roleIds: z.array(
        z.int(),
    ),
    userId: z.int()
})

export type RolesUpdateDto = z.infer<typeof roleUpdateSchema>

export const inviteUserSchema = z.object({
    email: z.email("Please enter a valid email"),
    role: z.string().min(1, "Please select a role"),
});

export type InviteUserSchema = z.infer<typeof inviteUserSchema>;