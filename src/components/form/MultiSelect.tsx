"use client"

import * as React from "react"
import { X, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "../ui/separator"

export interface MultiSelectOption {
    label: string
    value: string
    disabled?: boolean
}

export interface MultiSelectProps {
    /** Array of options to display */
    options: MultiSelectOption[]
    /** Array of selected values */
    selected: string[]
    /** Callback when selection changes */
    onSelectionChange: (selected: string[]) => void
    /** Whether to allow multiple selection (default: true) */
    multiple?: boolean
    /** Placeholder text when nothing is selected */
    placeholder?: string
    /** Enable search functionality */
    searchable?: boolean
    /** Search placeholder text */
    searchPlaceholder?: string
    /** Maximum number of items to display before showing count */
    maxDisplay?: number
    /** Whether to show selected items as badges below */
    showSelectedBadges?: boolean
    /** Whether the select is disabled */
    disabled?: boolean
    /** Custom className for the trigger */
    className?: string
    /** Maximum height for the dropdown content */
    maxHeight?: string
    /** Custom empty state message */
    emptyMessage?: string
    showSummary?: boolean
}

export function MultiSelect({
    options,
    selected,
    showSummary = false,
    onSelectionChange,
    multiple = true,
    placeholder = "Select items...",
    searchable = false,
    searchPlaceholder = "Search options...",
    maxDisplay = 3,
    showSelectedBadges = false,
    disabled = false,
    className,
    maxHeight = "300px",
    emptyMessage = "No options found"
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
        if (!searchable || !searchQuery) return options
        return options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [options, searchQuery, searchable])

    // Get selected options for display
    const selectedOptions = React.useMemo(() => {
        return options.filter(option => selected.includes(option.value))
    }, [options, selected])

    // Toggle selection of an option
    const toggleOption = React.useCallback((value: string) => {
        if (multiple) {
            // Multiple selection mode
            const newSelected = selected.includes(value)
                ? selected.filter(v => v !== value)
                : [...selected, value]
            onSelectionChange(newSelected)
        } else {
            // Single selection mode
            const newSelected = selected.includes(value) ? [] : [value]
            onSelectionChange(newSelected)
            // Close dropdown after selection in single mode
            setOpen(false)
        }
    }, [selected, onSelectionChange, multiple])

    // Remove a specific option
    const removeOption = React.useCallback((value: string) => {
        const newSelected = selected.filter(v => v !== value)
        onSelectionChange(newSelected)
    }, [selected, onSelectionChange])

    // Clear all selections
    const clearAll = React.useCallback(() => {
        onSelectionChange([])
    }, [onSelectionChange])

    // Generate display text for the trigger
    const getDisplayText = () => {
        if (selected.length === 0) return placeholder

        if (!multiple && selected.length === 1) {
            // Single selection mode - show the selected item
            return selectedOptions[0]?.label || placeholder
        }

        if (selected.length <= maxDisplay) {
            return selectedOptions.map(opt => opt.label).join(", ")
        }

        return `${selected.length} items selected`
    }

    return (
        <div className="w-full space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="subtle"
                        role="combobox"
                        aria-expanded={open}
                        aria-label={
                            multiple
                                ? `Select multiple items. ${selected.length} items currently selected.`
                                : `Select an item. ${selected.length > 0 ? '1 item' : 'No items'} currently selected.`
                        }
                        className={cn(
                            "w-full justify-between font-normal",
                            !selected.length && "text-muted-foreground",
                            className
                        )}
                        disabled={disabled}
                    >
                        <span className="truncate">{getDisplayText()}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0"
                    align="end"
                    sideOffset={4}
                    style={{
                        width: 'var(--radix-popover-trigger-width)',
                        maxHeight: 'var(--radix-popover-content-available-height)',
                        minWidth: '200px',
                    }}
                >
                    <div className="flex flex-col">
                        {/* Search Input */}
                        {searchable && (
                            <div className="p-3 border-b">
                                <Input
                                    placeholder={searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-9"
                                    autoFocus
                                />
                            </div>
                        )}

                        {/* Header with select all / clear all */}
                        {filteredOptions.length > 0 && showSummary && multiple && (
                            <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                                <span className="text-sm text-muted-foreground">
                                    {selected.length} of {options.length} selected
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onSelectionChange(options.map(opt => opt.value))}
                                        disabled={selected.length === options.length}
                                        className="h-6 px-2 text-xs"
                                    >
                                        Select All
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearAll}
                                        disabled={selected.length === 0}
                                        className="h-6 px-2 text-xs"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Options List */}
                        <ScrollArea className="max-h-[300px]">
                            <div className="w-full">
                                {filteredOptions.length === 0 ? (
                                    <div className="py-6 text-center text-sm text-muted-foreground">
                                        {emptyMessage}
                                    </div>
                                ) : (
                                    filteredOptions.map((option, index) => (
                                        <div key={option.value}>
                                            <div
                                                key={option.value}
                                                className={cn(
                                                    "flex items-center space-x-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                    option.disabled && "opacity-50 cursor-not-allowed"
                                                )}
                                                onClick={() => !option.disabled && toggleOption(option.value)}
                                            >
                                                {multiple ? (
                                                    <Checkbox
                                                        checked={selected.includes(option.value)}
                                                        disabled={option.disabled}
                                                        aria-label={`Select ${option.label}`}
                                                        className="pointer-events-none"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center w-4 h-4">
                                                        {selected.includes(option.value) && (
                                                            <Check className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                )}
                                                <span className="flex-1 truncate">{option.label}</span>
                                            </div>
                                            {index < filteredOptions.length - 1 && <Separator />}
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Selected Items as Badges */}
            {showSelectedBadges && multiple && selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {selectedOptions.map((option) => (
                        <Badge key={option.value} variant="secondary" className="gap-1">
                            <span>{option.label}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => removeOption(option.value)}
                                aria-label={`Remove ${option.label}`}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
