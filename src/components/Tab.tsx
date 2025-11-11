"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type TabItem = {
    value: string
    label: string
    count?: number
    disabled?: boolean
}

interface TabProps {
    items: TabItem[]
    value: string
    onValueChange: (value: string) => void
    className?: string
    showCounts?: boolean
    size?: "sm" | "md" | "lg"
    variant?: "default" | "outline" | "pills"
}

export default function Tab({
    items,
    value,
    onValueChange,
    className,
    showCounts = false,
    size = "md",
    variant = "default"
}: TabProps) {
    const sizeClasses = {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-base"
    }

    const variantClasses = {
        default: "bg-transparent",
        outline: "bg-transparent border border-border",
        pills: "bg-transparent gap-2"
    }

    const triggerVariantClasses = {
        default: "border-0 pb-5 text-secondary-text data-[state=active]:text-primary-text data-[state=active]:border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        outline: "border border-transparent data-[state=active]:border-border data-[state=active]:bg-background",
        pills: "rounded-full border border-transparent data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-sm"
    }

    return (
        <Tabs
            value={value}
            onValueChange={onValueChange}
            className={`${className}`}
        >
            <TabsList
                className={cn('pb-0',
                    sizeClasses[size],
                    variantClasses[variant],
                    variant === "pills" && "p-1"
                )}
            >
                {items.map((item) => (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        className={cn(
                            triggerVariantClasses[variant],
                            variant === "pills" && "rounded-full"
                        )}
                    >
                        <span>{item.label}</span>
                        {showCounts && typeof item.count !== 'undefined' && (
                            <span className={cn(
                                "ml-1.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
                                "bg-muted-foreground/20 text-muted-foreground",
                                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            )}>
                                {item.count}
                            </span>
                        )}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

// Property Status specific component
export interface PropertyStatusTabProps {
    value: string
    onValueChange: (value: string) => void
    className?: string
    counts?: Record<string, number>
}

export function PropertyStatusTab({
    value,
    onValueChange,
    className,
    counts = {}
}: PropertyStatusTabProps) {
    const statusItems: TabItem[] = [
        {
            value: "all",
            label: "All Properties",
            count: counts.all
        },
        {
            value: "available",
            label: "Available",
            count: counts.available
        },
        {
            value: "rented",
            label: "Rented",
            count: counts.rented
        },
        {
            value: "maintenance",
            label: "Maintenance",
            count: counts.maintenance
        },
        {
            value: "draft",
            label: "Draft",
            count: counts.draft
        }
    ]

    return (
        <Tab
            items={statusItems}
            value={value}
            onValueChange={onValueChange}
            className={className}
            showCounts={Object.keys(counts).length > 0}
            variant="default"
        />
    )
}
