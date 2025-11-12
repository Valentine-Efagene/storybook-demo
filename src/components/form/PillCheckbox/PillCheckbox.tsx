"use client"

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PillCheckboxProps {
    id: string
    label: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    disabled?: boolean
    className?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'outline'
}

export function PillCheckbox({
    id,
    label,
    checked,
    onCheckedChange,
    disabled = false,
    className,
    size = 'md',
    variant = 'default'
}: PillCheckboxProps) {
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

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base'
    }

    const baseClasses = cn(
        "inline-flex items-center gap-2 rounded-full font-medium cursor-pointer",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "select-none border",
        sizeClasses[size],
        {
            // Default variant styles
            'bg-blue-600 text-white border-blue-600 hover:bg-blue-700':
                variant === 'default' && checked && !disabled,
            'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200':
                variant === 'default' && !checked && !disabled,

            // Outline variant styles
            'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100':
                variant === 'outline' && checked && !disabled,
            'bg-white text-gray-700 border-gray-300 hover:bg-gray-50':
                variant === 'outline' && !checked && !disabled,

            // Disabled styles
            'opacity-50 cursor-not-allowed': disabled,
        },
        className
    )

    return (
        <div
            id={id}
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={baseClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {/* Check icon - only show when checked */}
            {checked && (
                <Check
                    className={cn(
                        "flex-shrink-0",
                        {
                            'w-3 h-3': size === 'sm',
                            'w-4 h-4': size === 'md',
                            'w-5 h-5': size === 'lg'
                        }
                    )}
                />
            )}

            {/* Label */}
            <span className="whitespace-nowrap">
                {label}
            </span>
        </div>
    )
}

// Compound component for multiple pill checkboxes
interface PillCheckboxGroupProps {
    options: string[]
    value: string[]
    onChange: (value: string[]) => void
    disabled?: boolean
    className?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'outline'
    columns?: number
}

export function PillCheckboxGroup({
    options,
    value = [],
    onChange,
    disabled = false,
    className,
    size = 'md',
    variant = 'default',
    columns = 3
}: PillCheckboxGroupProps) {
    const handleCheckedChange = (option: string, checked: boolean) => {
        if (checked) {
            onChange([...value, option])
        } else {
            onChange(value.filter(item => item !== option))
        }
    }

    const gridClasses = cn(
        "flex flex-wrap gap-3",
        {
            'gap-2': size === 'sm',
            'gap-3': size === 'md',
            'gap-4': size === 'lg'
        }
    )

    return (
        <div className={cn(gridClasses, className)}>
            {options.map((option) => (
                <PillCheckbox
                    key={option}
                    id={`pill-${option.toLowerCase().replace(/\s+/g, '-')}`}
                    label={option}
                    checked={value.includes(option)}
                    onCheckedChange={(checked) => handleCheckedChange(option, checked)}
                    disabled={disabled}
                    size={size}
                    variant={variant}
                />
            ))}
        </div>
    )
}