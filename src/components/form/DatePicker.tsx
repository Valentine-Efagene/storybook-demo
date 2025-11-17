"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Matcher } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

interface IProps {
    date: Date | undefined
    placeholder?: string
    onChange: (date: Date | undefined) => void
    minDate?: Date
    maxDate?: Date
    className?: string
    availableDates?: Date[]
    iconPosition?: "left" | "right"
}

export function DatePicker({
    date,
    onChange,
    placeholder,
    minDate,
    maxDate,
    className,
    availableDates,
    iconPosition = "left",
}: IProps) {
    const [open, setOpen] = React.useState(false)

    const disabledMatchers: Matcher[] = []
    if (minDate) disabledMatchers.push({ before: minDate })
    if (maxDate) disabledMatchers.push({ after: maxDate })

    if (availableDates && availableDates.length > 0) {
        disabledMatchers.push((day: Date) => {
            // compare dates ignoring time
            return !availableDates.some(av =>
                av.getFullYear() === day.getFullYear() &&
                av.getMonth() === day.getMonth() &&
                av.getDate() === day.getDate()
            )
        })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="subtle"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className,
                    )}
                    icon={<CalendarIcon className="mr-2 h-4 w-4" />}
                    iconPosition={iconPosition}
                >
                    {date ? format(date, "PPP") : <span>{placeholder ?? "Pick a date"}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                        onChange(selectedDate)
                        setOpen(false)
                    }}
                    autoFocus
                    disabled={disabledMatchers}
                />
            </PopoverContent>
        </Popover>
    )
}
