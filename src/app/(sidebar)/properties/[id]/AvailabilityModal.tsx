"use client"

import FormError from '@/components/form/FormError'
import { FormGroup } from '@/components/form/FormGroup'
import { FormLabel } from '@/components/form/FormLabel'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { propertyAvailabilityStatusSchema } from '@/lib/schemas/property'
import { AvailabilityStatus, Property } from '@/types/property'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    property: Property
}

const AVAILABILITY_STATUS_OPTIONS: { value: AvailabilityStatus | ''; label: string }[] = [
    { value: 'available', label: 'Available' },
    { value: 'provisionally_available', label: 'Provisionally Available' },
    { value: 'sold_out', label: 'Sold Out' },
]

export function AvailabilityModal({ open, setOpen, property }: Props) {
    const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof propertyAvailabilityStatusSchema>>()

    const onSubmit = (data: z.infer<typeof propertyAvailabilityStatusSchema>) => {
        console.log(data)
    }

    return (
        <ResponsiveDialog
            open={open}
            setOpen={setOpen}
            dialogContentClassName='p-0 flex flex-col gap-0'
        >
            <h3 className='px-6 py-4 font-medium text-primary-text text-lg'>Update Availabilty</h3>
            <Separator />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className='px-5 py-4'>
                    <FormGroup>
                        <Controller
                            name="availability_status"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col"
                                >
                                    {AVAILABILITY_STATUS_OPTIONS.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2 mb-2">
                                            <RadioGroupItem
                                                value={option.value}
                                                id={`availability-status-${option.value}`}
                                            />
                                            <Label htmlFor={`availability-status-${option.value}`}>
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        <FormError formError={errors.availability_status?.message} />
                    </FormGroup>
                    <FormError formError={errors.root?.message} />
                </div>
                <Separator />

                <div className="flex justify-end gap-2 px-6 py-4">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Change Availability
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    )
}
