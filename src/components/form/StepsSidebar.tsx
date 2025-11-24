import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Step {
    id: number
    name: string
    description: string
    fields: string[]
}

interface StepsSidebarProps {
    steps: Step[]
    currentStep: number
    stepValidation: Record<number, boolean>
    errors: Record<string, any>
    onStepClick: (stepId: number) => void
    canNavigateToStep: (stepId: number) => boolean
}

export function StepsSidebar({
    steps,
    currentStep,
    stepValidation,
    errors,
    onStepClick,
    canNavigateToStep
}: StepsSidebarProps) {
    const getStepStatus = (step: number) => {
        if (currentStep === step) return 'current'
        if (stepValidation[step as keyof typeof stepValidation]) return 'completed'
        if (canNavigateToStep(step)) return 'accessible'
        return 'disabled'
    }

    const hasStepErrors = (step: number) => {
        const stepData = steps.find(s => s.id === step)
        if (!stepData) return false

        return stepData.fields.some(field => {
            return errors[field as keyof typeof errors]
        })
    }

    return (
        <div className="hidden sm:flex w-80 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
            <div className="flex-1 p-6 overflow-y-auto">
                <nav className="">
                    {steps.map((step) => {
                        const status = getStepStatus(step.id)
                        const isClickable = canNavigateToStep(step.id)
                        const hasErrors = hasStepErrors(step.id)

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex items-start gap-3 p-3 transition-colors border-l border-primary-border border-l-2 ",
                                    {
                                        "cursor-pointer": isClickable,
                                        "cursor-not-allowed": !isClickable,
                                        "border-brand-border": status === 'current' || status === 'completed',
                                        "hover:bg-green-100": status === 'completed',
                                        "hover:bg-gray-50": status === 'accessible',
                                        "opacity-50": status === 'disabled',
                                    }
                                )}
                                onClick={() => isClickable && onStepClick(step.id)}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                                    {
                                        "bg-red-600 text-white": status === 'current' && hasErrors,
                                        "bg-primary-text text-white": status === 'current' && !hasErrors,
                                        "bg-green-600 text-white": status === 'completed',
                                        "bg-gray-300 text-gray-600": status === 'accessible',
                                        "bg-gray-200 text-gray-400": status === 'disabled',
                                    }
                                )}>
                                    {status === 'completed' ? (
                                        <Check className="w-3 h-3" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        "text-sm font-medium",
                                        {
                                            "text-red-900": status === 'current' && hasErrors,
                                            "text-primary-text": status === 'current' && !hasErrors,
                                            "text-green-900": status === 'completed',
                                            "text-gray-900": status === 'accessible',
                                            "text-gray-400": status === 'disabled',
                                        }
                                    )}>
                                        {step.name}
                                    </p>
                                    <p className={cn(
                                        "text-xs",
                                        {
                                            "text-gray-400": status === 'disabled',
                                            "text-gray-600": status !== 'disabled',
                                        }
                                    )}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}