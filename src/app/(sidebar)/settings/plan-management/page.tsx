import { Button } from "@/components/ui/button";
import { AnchorPlan } from "./icons/AnchorPlan";
import { JSX, ReactNode } from "react";
import { IgnitePlan } from "./icons/IgnitePlan";

export default function page() {
    const plans: {
        name: string;
        description: string;
        icon: ReactNode
    }[] = [
            {
                name: 'Anchor Plan',
                description: 'Homebuyer would pay 20% upfront to secure the property, get a provisional allocation, and spread the remaining 80% over 24-36 months',
                icon: <AnchorPlan />,
            },
            {
                name: 'EquityBridge Plan',
                description: 'Homebuyer would pay 30% upfront to secure the property, get a provisional allocation, and spread the remaining 70% over 18-24 months',
                icon: <AnchorPlan />,
            },
            {
                name: 'Ignite Plan',
                description: 'Homebuyer would pay 50% upfront to secure the property, get a provisional allocation, and spread the remaining 50% over 12-18 months',
                icon: <IgnitePlan />,
            }
        ]

    return (
        <div className="w-full flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Plans</h1>
            <div className="grid grid-cols-2 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="p-4 border border-primary-border rounded-lg m-2"
                    >
                        <div className="flex flex-row items-center justify-between gap-2 mb-4">
                            <div className="text-8xl rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                                {plan.icon}
                            </div>
                            <Button variant='subtle' size='sm'>Edit</Button>
                        </div>
                        <h2 className="text-lg text-primary-text font-medium mb-2">
                            {plan.name}
                        </h2>
                        <p className="text-secondary-text text-sm">
                            {plan.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
