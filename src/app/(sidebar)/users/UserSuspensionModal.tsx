import { FormGroup } from '@/components/form/FormGroup';
import { FormLabel } from '@/components/form/FormLabel';
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useServerMutation } from '@/hooks/useServerMutation';
import { userSuspensionSchema } from '@/lib/validation/user-schema';
import { User } from '@/types/user';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { suspend } from './actions';
import { useQueryClient } from '@tanstack/react-query';
import FormError from '@/components/form/FormError';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    user: User
}

const REASON_OPTIONS = [
    { value: 'violation_of_terms', label: 'Violation of Terms of Service' },
    { value: 'spam_or_abuse', label: 'Spam or Abuse' },
    { value: 'fraudulent_activity', label: 'Fraudulent Activity' },
    { value: 'other', label: 'Other' },
];

export default function UserSuspensionModal({ open, setOpen, user }: Props) {
    const queryClient = useQueryClient()
    const { control, handleSubmit, setError, reset, formState: { errors } } = useForm<z.infer<typeof userSuspensionSchema>>({
        defaultValues: {
            suspend_reason: '',
            userId: user.id,
        }
    })

    const suspensionMutation = useServerMutation(suspend, {
        setError: setError,
        mutationKey: ['users'],
        invalidateQueries: [
            ['user'],
        ],
        onSuccess: (data) => {
            // Update user data in cache immediately
            queryClient.setQueryData(['users'], data)
            reset()
            setOpen(false)
        },
        showSuccessToast: true,
    })

    const onSubmit = (data: z.infer<typeof userSuspensionSchema>) => {
        // Use mutate instead of mutateAsync to avoid promise handling
        suspensionMutation.mutate(data)
    }

    return (
        <ResponsiveDialog
            dialogContentClassName='px-0'
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h3 className='px-6 font-medium text-primary-text text-lg'>Suspend {user.first_name}</h3>
                <Separator />
                <div className='px-6 flex flex-col gap-4'>
                    <p className='text-primary-text text-[13px]'>Suspending this account would immediately prevent the user from logging in and would block any pending contributions.</p>
                    <FormGroup>
                        <FormLabel>Reason</FormLabel>
                        <Controller
                            name="suspend_reason"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {REASON_OPTIONS.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.suspend_reason && (
                            <FormError formError={errors.suspend_reason.message}></FormError>
                        )}
                    </FormGroup>
                    {suspensionMutation.isError && (
                        <FormError formError={suspensionMutation.error?.message} />
                    )}
                </div>
                <Separator />

                <div className="flex justify-end gap-2 px-6">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit"
                        loading={suspensionMutation.isLoading} variant="destructive"
                        disabled={suspensionMutation.isLoading}
                    >
                        Suspend Account
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    )
}
