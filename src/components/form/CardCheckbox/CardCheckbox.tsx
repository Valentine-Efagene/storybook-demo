"use client"

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
    id: string
    name: string
    description: string
}

export type { Option }

interface CardCheckboxProps {
    plan: Option
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    disabled?: boolean
    className?: string
}

export function CardCheckbox({
    plan,
    checked,
    onCheckedChange,
    disabled = false,
    className,
}: CardCheckboxProps) {
    const handleClick = () => {
        if (!disabled) {
            onCheckedChange(!checked)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            handleClick()
        }
    }

    return (
        <div
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={cn(
                "relative cursor-pointer rounded-lg border p-6 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-border focus:ring-offset-2",
                "hover:shadow-md",
                {
                    'border-[var(--primary-text)] border-2': checked && !disabled,
                    'border-gray-200 bg-white': !checked && !disabled,
                    'opacity-50 cursor-not-allowed': disabled,
                },
                className
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {/* Selected pill badge */}
            {checked && (
                <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-white text-xs font-medium rounded-full">
                        <Check className="w-3 h-3" />
                        Selected
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {/* Plan header */}
                <div className="space-y-2">
                    <h3 className={cn(
                        "text-lg font-semibold",
                        // checked ? "text-blue-900" : "text-gray-900"
                    )}>
                        {plan.name}
                    </h3>
                </div>

                {/* Description */}
                <p className={cn(
                    "text-sm",
                    // checked ? "text-blue-800" : "text-gray-600"
                )}>
                    {plan.description}
                </p>
            </div>
        </div>
    )
}

// Group component for multiple card checkboxes
interface CardCheckboxGroupProps {
    options: Option[]
    value: string[]
    onChange: (value: string[]) => void
    disabled?: boolean
    className?: string
    allowMultiple?: boolean
    orientation?: 'horizontal' | 'vertical'
}

export function CardCheckboxGroup({
    options,
    value = [],
    onChange,
    disabled = false,
    className,
    allowMultiple = true,
    orientation = 'vertical',
}: CardCheckboxGroupProps) {
    const handleCheckedChange = (optionId: string, checked: boolean) => {
        if (allowMultiple) {
            if (checked) {
                onChange([...value, optionId])
            } else {
                onChange(value.filter(id => id !== optionId))
            }
        } else {
            // Single selection mode
            onChange(checked ? [optionId] : [])
        }
    }

    return (
        <div className={cn(
            "gap-4",
            orientation === 'vertical' ? (
                // Horizontal layout - cards in a row
                "flex flex-col gap-2"
            ) : (
                cn("grid", {
                    'grid-cols-1': options.length === 1,
                    'grid-cols-1 md:grid-cols-2': options.length === 2,
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': options.length >= 3,
                })
            ),
            className
        )}>
            {options.map((plan) => (
                <CardCheckbox
                    key={plan.id}
                    plan={plan}
                    checked={value.includes(plan.id)}
                    onCheckedChange={(checked) => handleCheckedChange(plan.id, checked)}
                    disabled={disabled}
                    className={orientation === 'horizontal' ? 'flex-1 min-w-[280px]' : ''}
                />
            ))}
        </div>
    )
}