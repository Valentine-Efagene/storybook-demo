import { FormGroup } from '@/components/form/FormGroup';
import { FormLabel } from '@/components/form/FormLabel';
import ToggleCheckbox from '@/components/form/ToggleCheckbox';
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { planUpdateSchema } from '@/lib/validation/plan-schema';
import { Plan } from '@/types/plan';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    plan: Plan
}

export default function PlanEditModal({ open, setOpen, plan }: Props) {
    const { control, handleSubmit } = useForm<z.infer<typeof planUpdateSchema>>({
        defaultValues: {
            name: plan.name,
            description: plan.description,
            downpaymentPercentage: plan.downpaymentPercentage,
            allowMortgage: plan.allowMortgage,
            allowDownpayment: plan.allowDownpayment,
        }
    })

    const onSubmit = (data: z.infer<typeof planUpdateSchema>) => {
        console.log(data);
    }

    return (
        <ResponsiveDialog
            dialogContentClassName='px-0'
            open={open}
            setOpen={setOpen}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h3 className='px-6 font-medium text-primary-text text-lg'>Edit Plan</h3>
                <Separator />
                <div className='px-6 flex flex-col gap-4'>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} />
                            )}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea {...field} />
                            )}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Downpayment Percentage</FormLabel>
                        <Controller
                            name="downpaymentPercentage"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    min="0"
                                    max="100"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                    </FormGroup>

                    <FormGroup className='flex flex-row gap-4 items-center'>
                        <Controller
                            name="allowDownpayment"
                            control={control}
                            render={({ field: { value, onChange, ...field } }) => (
                                <Checkbox
                                    {...field}
                                    checked={value}
                                    onCheckedChange={onChange}
                                />
                            )}
                        />
                        <FormLabel>Allow Downpayment Contribution</FormLabel>
                    </FormGroup>

                    <FormGroup className='flex flex-row justify-between'>
                        <FormLabel className='flex flex-col items-start'>
                            <span className='text-primary-text text-sm'>Allow Mortgage</span>
                            <span className='text-secondary-text text-sm'>Homebuyers can complete payment with mortgage.</span>
                        </FormLabel>
                        <Controller
                            name="allowMortgage"
                            control={control}
                            render={({ field: { value, onChange, ...field } }) => (
                                <ToggleCheckbox
                                    {...field}
                                    checked={value}
                                    onChange={onChange}
                                />
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
                        Save Changes
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    )
}
