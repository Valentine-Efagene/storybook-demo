import { useEffect } from "react"
import { toast } from "sonner"

interface UseApiErrorHandlerOptions {
    isError: boolean
    error: unknown
}

export function useApiErrorHandler({ isError, error }: UseApiErrorHandlerOptions) {
    useEffect(() => {
        if (!isError || !error) return

        const err = error as any
        const errorCode = err?.code || err?.status || err?.response?.status

        if (errorCode === 401) {
            toast.error("Session expired. Redirecting to sign in...")
            setTimeout(() => {
                window.location.href = "/auth/signin"
            }, 300)
        } else {
            toast.error("Something went wrong.")
        }
    }, [isError, error])
}
