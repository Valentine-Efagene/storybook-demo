// Example usage for other forms

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerAction } from '@/hooks/useServerAction'
import * as z from 'zod'

// Example: Password Reset Form
const resetPasswordSchema = z.object({
    email: z.string().email(),
})

export function usePasswordResetForm() {
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { email: '' },
    })

    const { formError, isLoading, executeAction } = useServerAction({
        setError: form.setError,
        onSuccess: (message) => {
            // Custom success logic for password reset
            console.log('Password reset email sent:', message)
        },
    })

    const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        await executeAction(resetPasswordAction, data)
    }

    return { form, formError, isLoading, onSubmit }
}

// Example: User Registration Form
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
})

export function useRegistrationForm() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '', name: '' },
    })

    const { formError, isLoading, executeAction } = useServerAction({
        setError: form.setError,
        onSuccess: (message) => {
            // Redirect to dashboard after successful registration
        },
        redirectTo: '/dashboard',
    })

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        await executeAction(registerAction, data)
    }

    return { form, formError, isLoading, onSubmit }
}

// Example: Update Profile Form
const updateProfileSchema = z.object({
    name: z.string().min(2),
    bio: z.string().optional(),
})

export function useUpdateProfileForm() {
    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
    })

    const { formError, isLoading, executeAction } = useServerAction({
        setError: form.setError,
        onSuccess: (message) => {
            // Custom success logic for profile update
            form.reset() // Reset form after successful update
        },
        onError: (error) => {
            // Custom error handling
            console.error('Profile update failed:', error)
        },
    })

    const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
        await executeAction(updateProfileAction, data)
    }

    return { form, formError, isLoading, onSubmit }
}

// Mock server actions (you would import these from your actions files)
async function resetPasswordAction(data: any) {
    // Implementation here
    return { success: 'Reset email sent!' }
}

async function registerAction(data: any) {
    // Implementation here
    return { success: 'Account created successfully!' }
}

async function updateProfileAction(data: any) {
    // Implementation here
    return { success: 'Profile updated!' }
}