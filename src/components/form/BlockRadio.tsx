"use client"

import { cn } from "@/lib/utils"
import React from "react"

export interface BlockRadioOption {
    value: string
    label: string
    description?: string
    disabled?: boolean
}

interface BlockRadioProps {
    options: BlockRadioOption[]
    value?: string
    onChange?: (value: string) => void
    name: string
    disabled?: boolean
    className?: string
    size?: 'sm' | 'md' | 'lg'
    orientation?: 'horizontal' | 'vertical'
}

/**
 * BlockRadio component provides a radio group styled as button-like blocks
 * with round notches on the left side for visual selection indication.
 * 
 * Features:
 * - Button-like styling with rounded corners
 * - Round notch indicators on the left
 * - Support for descriptions under labels
 * - Horizontal and vertical orientations
 * - Multiple size variants
 * - Disabled states
 * 
 * @param props - Component props
 * @returns Styled radio group component
 */
export function BlockRadio({
    options,
    value,
    onChange,
    name,
    disabled = false,
    className,
    size = 'sm',
    orientation = 'vertical',
    ...props
}: BlockRadioProps) {
    const sizeClasses = {
        sm: "text-sm px-3 py-2",
        md: "text-base px-4 py-3",
        lg: "text-lg px-5 py-4"
    }

    const notchSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5"
    }

    const containerClass = cn(
        "flex gap-2",
        orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
        className
    )

    return (
        <div className={containerClass} role="radiogroup" {...props}>
            {options.map((option) => {
                const isSelected = value === option.value
                const isDisabled = disabled || option.disabled

                return (
                    <label
                        key={option.value}
                        className={cn(
                            // Base styling
                            "relative flex items-center gap-3 rounded-lg border transition-all cursor-pointer",
                            "hover:border-primary/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",

                            // Size classes
                            sizeClasses[size],

                            // State styling
                            isSelected
                                ? "border-sidebar-foreground bg-primary/5 text-primary-text"
                                : "border-border bg-background hover:bg-muted/50",

                            // Disabled styling  
                            isDisabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-background",

                            // Focus styling
                            "focus-within:outline-none"
                        )}
                    >
                        {/* Hidden radio input */}
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={isSelected}
                            onChange={() => !isDisabled && onChange?.(option.value)}
                            disabled={isDisabled}
                            className="sr-only"
                        />

                        {/* Round notch indicator */}
                        <div className={cn(
                            "rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                            notchSizes[size],
                            isSelected
                                ? "border-sidebar-foreground bg-sidebar-foreground"
                                : "border-muted-foreground/30 bg-transparent"
                        )}>
                            {isSelected && (
                                <div className={cn(
                                    "rounded-full bg-primary-foreground",
                                    size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'
                                )} />
                            )}
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className={cn(
                                "font-medium leading-none",
                                size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
                                isSelected ? "text-primary" : "text-foreground"
                            )}>
                                {option.label}
                            </div>
                            {option.description && (
                                <div className={cn(
                                    "mt-1 leading-tight",
                                    size === 'sm' ? 'text-xs' : 'text-sm',
                                    isSelected ? "text-primary/80" : "text-muted-foreground"
                                )}>
                                    {option.description}
                                </div>
                            )}
                        </div>
                    </label>
                )
            })}
        </div>
    )
}

export default BlockRadio