"use client"

import { CustomFilePicker } from "@/components/form/CustomFilePicker"
import { DatePicker } from "@/components/form/DatePicker"
import FormError from "@/components/form/FormError"
import { FormGroup } from "@/components/form/FormGroup"
import { FormLabel } from "@/components/form/FormLabel"
import StatusTag from "@/components/StatusTag"
import StyledIconChip from "@/components/StyledIconChip"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet"
import { milestoneUpdateSchema } from "@/lib/schemas/property"
import { Property } from "@/types/property"
import { format } from "date-fns"
import { CheckCircle, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    property: Property
}

export function MilestoneSheet({ open, setOpen, property }: Props) {
    const { control, formState: { errors, isValid, isLoading }, handleSubmit } = useForm<z.infer<typeof milestoneUpdateSchema>>({
        defaultValues: {

        }
    })

    const onSubmit = (data: z.infer<typeof milestoneUpdateSchema>) => {
        console.log(data)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="w-full sm:w-[560px] sm:max-w-[560px] p-0 gap-4 [&>button]:hidden max-h-full overflow-auto">
                <SheetTitle className="py-2 border-b px-6 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(false)}
                        className="ml-auto"
                        icon={<X className="h-4 w-4" />}
                        iconPosition="left"
                    >
                        Close
                    </Button>
                </SheetTitle>
                <div className="flex flex-col gap-8 px-6">
                    <div className="grid gap-4 border rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h3>Milestone</h3>
                            </div>
                            <StyledIconChip icon={<CheckCircle className="text-warning w-4 h-4" />} label="Not Started" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                            <FormGroup>
                                <FormLabel>Completion Date</FormLabel>
                                <Controller
                                    name="completion_date"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            className="justify-between"
                                            iconPosition="right"
                                            date={field.value ? new Date(field.value) : undefined}
                                            onChange={(date) =>
                                                field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                            }
                                        />
                                    )}
                                />
                                <FormError formError={errors.completion_date?.message} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Proof of Completion</FormLabel>
                                <Controller
                                    name="proof"
                                    control={control}
                                    render={({ field }) => (
                                        <CustomFilePicker
                                            files={field.value || []}
                                            onFilesChange={field.onChange}
                                            allowMultiple={true}
                                            maxFiles={10}
                                            maxFileSize={10}
                                            allowedTypes={['image/*']}
                                            showPreview={true}
                                            showFileSize={true}
                                            accept="image/*"
                                        />
                                    )}
                                />
                                <FormError formError={errors.proof?.message} />
                            </FormGroup>
                            <FormError formError={errors.root?.message} />
                        </form>
                    </div>
                    <div className="grid gap-2">
                        <div className="text-sm text-secondary-text">Next</div>
                        <div className="flex justify-between items-center border rounded-lg p-5">
                            <div className="flex items-center gap-4">
                                <h3>Milestone</h3>
                            </div>
                            <StyledIconChip icon={<CheckCircle className="text-warning w-4 h-4" />} label="Not Started" />
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-start gap-4 p-5">
                    <Button className="w-full" disabled={!isValid || isLoading} variant='subtle'>
                        Update Milestone
                    </Button>
                </div>
            </SheetContent>
        </Sheet >
    )
}
