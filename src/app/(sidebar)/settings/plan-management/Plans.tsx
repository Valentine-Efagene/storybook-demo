"use client";

import { Button } from "@/components/ui/button";
import { AnchorPlan } from "./icons/AnchorPlan";
import { ReactNode, useState } from "react";
import { IgnitePlan } from "./icons/IgnitePlan";
import { Plan } from "@/types/plan";
import PlanEditModal from "./PlanEditModal";
import PlanCard from "./PlanCard";

export default function Plans() {
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
                    <PlanCard key={plan.name} plan={plan} />
                ))}
            </div>
        </div>
    )
}
