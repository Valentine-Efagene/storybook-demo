import { useEffect } from 'react'
import useIsAuthorized from './useIsAuthorized';
import AuthorizationHelper from '@/helpers/AuthorizationHelper';
import { toast } from 'sonner';

interface IProps {
    isError?: boolean;
    error?: any;
}

export default function useToastRawError({ isError, error }: IProps) {
    const canSeeRawErrors = useIsAuthorized({
        allowedRoles: AuthorizationHelper.ACL.see_raw_errors
    })

    useEffect(() => {
        if (canSeeRawErrors && isError) {
            toast("API Error", {
                duration: 5000,
                style: { width: "fit-content", maxWidth: "90vw" },
                description: (
                    <pre className="mt-2 w-[280px] sm:w-[400px] overflow-x-auto rounded-md bg-neutral-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                ),
            })
        }
    }, [canSeeRawErrors, error, isError])
}
