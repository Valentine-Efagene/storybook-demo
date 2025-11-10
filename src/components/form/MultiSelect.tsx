"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Button,
} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "../ui/separator"

interface Props {
    options: { label: string; value: string }[]
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    isSearchable?: boolean
    showSelected?: boolean
}

export function MultiSelectCombobox({ options, selected, setSelected, isSearchable = false, showSelected = false }: Props) {
    const [open, setOpen] = React.useState(false)

    const toggleOption = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="subtle"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                    >
                        {selected.length > 0
                            ? `${selected.length} selected`
                            : "Select..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        {isSearchable ? <CommandInput placeholder="Search..." /> : null}
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((item, index) => (
                                    <>
                                        <CommandItem
                                            className="py-2"
                                            key={item.value}
                                            onSelect={() => toggleOption(item.value)}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    selected.includes(item.value)
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50"
                                                )}
                                            >
                                                {selected.includes(item.value) && <Check className="h-3 w-3" />}
                                            </div>
                                            {item.label}
                                        </CommandItem>
                                        {index < options.length - 1 && <Separator />}
                                    </>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Show selected items as removable badges */}
            {selected.length > 0 && showSelected && <div className="flex flex-wrap gap-1">
                {selected.map((value) => {
                    const label = options.find((f) => f.value === value)?.label
                    return (
                        <Badge key={value} variant="secondary">
                            {label}
                            <X
                                className="ml-1 h-3 w-3 cursor-pointer"
                                onClick={() => toggleOption(value)}
                            />
                        </Badge>
                    )
                })}
            </div>}
        </div>
    )
}
