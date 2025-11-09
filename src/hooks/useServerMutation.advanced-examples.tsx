import { useServerMutation } from "@/hooks/useServerMutation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

// Example: Password Change Form with React Query
export function usePasswordChange() {
    const queryClient = useQueryClient()

    // Check password strength in real-time
    const { data: passwordStrength, isLoading: checkingStrength } = useQuery({
        queryKey: ['password', 'strength'],
        queryFn: async () => {
            // This could call your server to check password strength
            return { score: 0, feedback: [] }
        },
        enabled: false, // Only run when manually triggered
    })

    // Password change mutation with optimistic updates
    const changePasswordMutation = useServerMutation(changePassword, {
        mutationKey: ['changePassword'],
        invalidateQueries: [
            ['user', 'security'], // Refresh security settings
            ['user', 'sessions'], // Refresh active sessions
        ],
        onSuccess: () => {
            // Update password change timestamp
            queryClient.setQueryData(['user', 'profile'], (oldData: any) => ({
                ...oldData,
                lastPasswordChange: new Date().toISOString(),
            }))

            // Clear any cached password strength data
            queryClient.removeQueries({ queryKey: ['password', 'strength'] })
        },
        showSuccessToast: true,
    })

    const checkPasswordStrength = (password: string) => {
        queryClient.setQueryData(['password', 'strength'], null)
        queryClient.prefetchQuery({
            queryKey: ['password', 'strength', password],
            queryFn: () => checkPasswordStrengthAPI(password),
        })
    }

    return {
        changePassword: changePasswordMutation.mutateAsync,
        isChanging: changePasswordMutation.isLoading,
        passwordStrength,
        checkingStrength,
        checkPasswordStrength,
    }
}

// Example: Form with dependent data loading
export function useUserProfileForm(userId: string) {
    const queryClient = useQueryClient()

    // Load user data
    const { data: user, isLoading: loadingUser } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
    })

    // Load user preferences
    const { data: preferences } = useQuery({
        queryKey: ['user', userId, 'preferences'],
        queryFn: () => fetchUserPreferences(userId),
        enabled: !!user, // Only load after user is loaded
    })

    // Update user profile
    const updateProfileMutation = useServerMutation(updateUserProfile, {
        mutationKey: ['updateProfile', userId],
        optimisticUpdate: {
            queryKey: ['user', userId],
            updater: (oldUser: any, newData: any) => ({
                ...oldUser,
                ...newData,
            })
        },
        invalidateQueries: [
            ['user', userId],
            ['users'], // Refresh user lists
        ],
        onSuccess: (response) => {
            // Update related cache entries
            queryClient.setQueryData(['user', userId, 'profile'], response.user)
        },
    })

    return {
        user,
        preferences,
        loadingUser,
        updateProfile: updateProfileMutation.mutateAsync,
        isUpdating: updateProfileMutation.isLoading,
    }
}

// Example: Real-time validation with debounced queries
export function useEmailValidation() {
    const [email, setEmail] = useState('')
    const [debouncedEmail, setDebouncedEmail] = useState('')

    // Debounce email input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedEmail(email)
        }, 500)

        return () => clearTimeout(timer)
    }, [email])

    // Validate email availability
    const { data: emailValidation, isLoading: validatingEmail } = useQuery({
        queryKey: ['email', 'validation', debouncedEmail],
        queryFn: () => validateEmailAPI(debouncedEmail),
        enabled: !!debouncedEmail && debouncedEmail.includes('@'),
        staleTime: 30000, // Cache for 30 seconds
    })

    return {
        email,
        setEmail,
        emailValidation,
        validatingEmail,
    }
}

// Mock API functions for examples
async function changePassword(data: { currentPassword: string; newPassword: string }) {
    return { success: "Password changed successfully" }
}

async function checkPasswordStrengthAPI(password: string) {
    return {
        score: Math.floor(Math.random() * 5),
        feedback: ["Use a longer password", "Add special characters"]
    }
}

async function fetchUser(userId: string) {
    return {
        id: userId,
        email: "user@example.com",
        name: "John Doe",
    }
}

async function fetchUserPreferences(userId: string) {
    return {
        theme: "light",
        notifications: true,
    }
}

async function updateUserProfile(data: any) {
    return {
        success: "Profile updated successfully",
        user: data,
    }
}

async function validateEmailAPI(email: string) {
    return {
        available: Math.random() > 0.5,
        suggestions: ["user123@example.com"]
    }
}