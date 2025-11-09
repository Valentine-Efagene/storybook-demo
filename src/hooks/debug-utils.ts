// Debug utility for server mutations
export function createDebugWrapper<T>(name: string, fn: T): T {
    if (typeof fn !== 'function') return fn

    return ((...args: any[]) => {
        console.log(`🚀 [${name}] Called with:`, args)

        try {
            const result = (fn as any)(...args)

            if (result && typeof result.then === 'function') {
                return result
                    .then((value: any) => {
                        console.log(`✅ [${name}] Resolved:`, value)
                        return value
                    })
                    .catch((error: any) => {
                        console.log(`❌ [${name}] Rejected:`, error)
                        throw error
                    })
            }

            console.log(`✅ [${name}] Returned:`, result)
            return result
        } catch (error) {
            console.log(`❌ [${name}] Threw:`, error)
            throw error
        }
    }) as any
}

// Add this to your component for debugging
export function useDebugMutation(mutation: any, name = 'mutation') {
    return {
        ...mutation,
        mutate: createDebugWrapper(`${name}.mutate`, mutation.mutate),
        mutateAsync: createDebugWrapper(`${name}.mutateAsync`, mutation.mutateAsync),
    }
}