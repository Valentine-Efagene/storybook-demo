import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircleIcon } from 'lucide-react';

interface IProps {
    formError: string[] | null | undefined | string
}

function FormErrorBase(
    { className, children, ...rest }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
    return (
        <Alert {...rest} className={`${className}`} variant={"destructive"}>
            <AlertCircleIcon />
            <AlertDescription>
                {children}
            </AlertDescription>
        </Alert>
    );
}


export default function FormError({ formError }: IProps) {
    if (!formError) return null;

    return (
        <>
            {
                Array.isArray(formError) && formError.length > 1 && (
                    <FormErrorBase>
                        <ul className="list-disc list-inside space-y-1">
                            {formError.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </FormErrorBase>
                )
            }
            {
                typeof formError === 'string' ?
                    <FormErrorBase>{formError}</FormErrorBase>
                    : null
            }
            {
                Array.isArray(formError) && formError.length === 1 ?
                    <FormErrorBase>{formError[0]}</FormErrorBase>
                    : null
            }
        </>
    )
}
