import { useState } from 'react'
import { UseFormSetError, FieldValues, Path } from 'react-hook-form'
import { toast } from 'sonner'

type ServerActionResponse = {
    error?: {
        form?: string[]
        [key: string]: string[] | undefined
    }
    success?: string
}

type UseServerActionOptions<T extends FieldValues> = {
    setError: UseFormSetError<T>
    onSuccess?: (message: string) => void
    onError?: (error: string) => void
    redirectTo?: string
}

export function useServerAction<T extends FieldValues>(
    options: UseServerActionOptions<T>
) {
    const { setError, onSuccess, onError, redirectTo } = options
    const [formError, setFormError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleResponse = (res: ServerActionResponse) => {
        if (res?.error) {
            // Handle form-level errors
            if ('form' in res.error && res.error.form) {
                const errorMessage = res.error.form[0]
                setFormError(errorMessage)
                onError?.(errorMessage)
            }

            // Handle field-level errors
            Object.entries(res.error).forEach(([key, value]) => {
                if (key !== 'form' && key in ({} as T)) {
                    setError(key as Path<T>, {
                        type: 'server',
                        message: value?.[0] ?? 'Invalid',
                    })
                }
            })

            return
        }

        if (res?.success) {
            setFormError(null)
            toast(res.success)
            onSuccess?.(res.success)

            // Handle redirect if provided
            if (redirectTo && typeof window !== 'undefined') {
                window.location.href = redirectTo
            }
        }
    }

    const executeAction = async (
        action: (data: T) => Promise<ServerActionResponse>,
        data: T
    ) => {
        setIsLoading(true)
        try {
            const res = await action(data)
            handleResponse(res)
        } catch (error) {
            setFormError('An unexpected error occurred')
            onError?.('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        formError,
        isLoading,
        executeAction,
        clearFormError: () => setFormError(null),
    }
}