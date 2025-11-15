import { FormGroup } from '@/components/form/FormGroup';
import { FormLabel } from '@/components/form/FormLabel';
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { userSuspensionSchema } from '@/lib/validation/user-schema';
import { User } from '@/types/user';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

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
    const { control, handleSubmit } = useForm<z.infer<typeof userSuspensionSchema>>({
        defaultValues: {
            user_id: user.id,
            reason: '',
        }
    })

    const onSubmit = (data: z.infer<typeof userSuspensionSchema>) => {
        console.log(data);
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
                            name="reason"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select property type" />
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
                    </FormGroup>
                </div>

                <Separator />

                <div className="flex justify-end gap-2 px-6">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Suspend Account
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    )
}
