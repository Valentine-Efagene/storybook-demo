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

    const mutation = useMutation({
        mutationKey,
        mutationFn: action,
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
            if (response?.error) {
                // Rollback optimistic update on error
                if (optimisticUpdate && context?.previousData !== undefined) {
                    queryClient.setQueryData(optimisticUpdate.queryKey, context.previousData)
                }

                // Handle form-level errors
                if ('form' in response.error && response.error.form) {
                    const errorMessage = response.error.form[0]
                    onError?.(errorMessage, variables)
                }

                // Handle field-level errors
                if (setError) {
                    Object.entries(response.error).forEach(([key, value]) => {
                        if (key !== 'form' && key in ({} as TData)) {
                            setError(key as Path<TData>, {
                                type: 'server',
                                message: value?.[0] ?? 'Invalid',
                            })
                        } else if (key === 'form') {
                            setError('root' as Path<TData>, {
                                type: 'server',
                                message: value?.[0] ?? 'Invalid',
                            })
                        }
                    })
                }

                return
            }

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
        onError: (error: any, variables) => {
            console.log("Error")
            // Rollback optimistic update on error
            if (optimisticUpdate) {
                queryClient.invalidateQueries({ queryKey: optimisticUpdate.queryKey })
            }

            const errorMessage = error?.message || 'An unexpected error occurred'
            onError?.(errorMessage, variables)
            toast.error(errorMessage)
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

    // Legacy formError for backward compatibility
    const formError = mutation.isError && mutation.error
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