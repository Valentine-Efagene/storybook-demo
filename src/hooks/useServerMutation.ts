import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UseFormSetError, FieldValues, Path } from 'react-hook-form'
import { toast } from 'sonner'

type ServerActionResponse = {
    error?: {
        form?: string[]
        [key: string]: string[] | undefined
    }
    success?: string
}

type UseServerMutationOptions<TData extends FieldValues, TVariables = TData> = {
    setError?: UseFormSetError<TData>
    onSuccess?: (data: any, variables: TVariables) => void | Promise<void>
    onError?: (error: string, variables: TVariables) => void
    redirectTo?: string | ((data: any) => string)
    // React Query specific options
    mutationKey?: string[]
    invalidateQueries?: string[][] | string[]
    optimisticUpdate?: {
        queryKey: string[]
        updater: (oldData: any, variables: TVariables) => any
    }
    showSuccessToast?: boolean
}

// Custom error class for server action errors
class ServerActionError extends Error {
    constructor(
        message: string,
        public serverResponse: ServerActionResponse,
        public fieldErrors?: Record<string, string[]>
    ) {
        super(message)
        this.name = 'ServerActionError'
    }
}

export function useServerMutation<TData extends FieldValues, TVariables = TData>(
    action: (data: TVariables) => Promise<ServerActionResponse>,
    options: UseServerMutationOptions<TData, TVariables> = {} as UseServerMutationOptions<TData, TVariables>
) {
    const {
        setError,
        onSuccess,
        onError,
        redirectTo,
        mutationKey,
        invalidateQueries = [],
        optimisticUpdate,
        showSuccessToast = true,
    } = options

    const queryClient = useQueryClient()

    // Wrapper function that converts server errors to thrown errors
    const wrappedAction = async (data: TVariables): Promise<ServerActionResponse> => {
        try {
            const response = await action(data)

            if (response?.error) {
                // Extract form-level error message
                const formError = response.error.form?.[0] || 'An error occurred'

                // Extract field-level errors
                const fieldErrors = Object.entries(response.error).reduce((acc, [key, value]) => {
                    if (key !== 'form' && Array.isArray(value)) {
                        acc[key] = value
                    }
                    return acc
                }, {} as Record<string, string[]>)

                // Throw error to trigger React Query's error state
                const error = new ServerActionError(formError, response, fieldErrors)
                return Promise.reject(error)
            }

            return response
        } catch (error) {
            // Re-throw any errors from the server action itself
            if (error instanceof ServerActionError) {
                return Promise.reject(error)
            }
            // Wrap other errors
            return Promise.reject(new Error(error instanceof Error ? error.message : 'An unexpected error occurred'))
        }
    }

    const mutation = useMutation({
        mutationKey,
        mutationFn: wrappedAction,
        onMutate: async (variables) => {
            // Optimistic update
            if (optimisticUpdate) {
                await queryClient.cancelQueries({ queryKey: optimisticUpdate.queryKey })
                const previousData = queryClient.getQueryData(optimisticUpdate.queryKey)

                queryClient.setQueryData(
                    optimisticUpdate.queryKey,
                    optimisticUpdate.updater(previousData, variables)
                )

                return { previousData }
            }
        },
        onSuccess: async (response, variables, context) => {
            // Only success responses reach here now
            if (response?.success) {
                // Invalidate and refetch queries
                if (invalidateQueries.length > 0) {
                    const invalidatePromises = Array.isArray(invalidateQueries[0])
                        ? (invalidateQueries as string[][]).map(queryKey =>
                            queryClient.invalidateQueries({ queryKey })
                        )
                        : [queryClient.invalidateQueries({ queryKey: invalidateQueries as string[] })]

                    await Promise.all(invalidatePromises)
                }

                // Show success toast
                if (showSuccessToast) {
                    toast(response.success)
                }

                // Custom success callback
                await onSuccess?.(response, variables)

                // Handle redirect
                if (redirectTo && typeof window !== 'undefined') {
                    const url = typeof redirectTo === 'function' ? redirectTo(response) : redirectTo
                    window.location.href = url
                }
            }
        },
        onError: (error: any, variables, context) => {
            console.log('React Query onError triggered:', error)

            // Rollback optimistic update on error
            if (optimisticUpdate && context?.previousData !== undefined) {
                queryClient.setQueryData(optimisticUpdate.queryKey, context.previousData)
            }

            // Handle ServerActionError (from our server responses)
            if (error instanceof ServerActionError) {
                console.log('Handling ServerActionError:', error.message, error.fieldErrors)

                // Set field-level errors
                if (setError && error.fieldErrors) {
                    Object.entries(error.fieldErrors).forEach(([key, messages]) => {
                        setError(key as Path<TData>, {
                            type: 'server',
                            message: messages[0],
                        })
                    })
                }

                // Call custom error handler with the server error message
                onError?.(error.message, variables)

                // Show error toast
                if (showSuccessToast) { // Reuse this flag for error toasts too
                    toast.error(error.message)
                }
            } else {
                // Handle network errors, etc.
                console.log('Handling other error:', error)
                const errorMessage = error?.message || 'An unexpected error occurred'
                onError?.(errorMessage, variables)
                toast.error(errorMessage)
            }
        },
    })

    return {
        mutate: mutation.mutate,
        mutateAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        data: mutation.data,
        reset: mutation.reset,
    }
}

// Enhanced hook that combines the original useServerAction with React Query
export function useServerActionWithQuery<TData extends FieldValues, TVariables = TData>(
    action: (data: TVariables) => Promise<ServerActionResponse>,
    options: UseServerMutationOptions<TData, TVariables> = {} as UseServerMutationOptions<TData, TVariables>
) {
    const mutation = useServerMutation(action, options)

    // Now formError will be properly set when server returns errors
    const formError = mutation.isError && mutation.error instanceof ServerActionError
        ? mutation.error.message
        : mutation.isError && mutation.error
            ? (mutation.error as any).message || 'An error occurred'
            : null

    return {
        ...mutation,
        // Legacy API for backward compatibility
        executeAction: mutation.mutateAsync,
        formError,
        isLoading: mutation.isLoading,
    }
}