"use client";

import { Button } from '@/components/ui/button';
import React, { ReactNode, useState } from 'react'
import PlanEditModal from './PlanEditModal';
import { Plan } from '@/types/plan';

interface Props {
    plan: {
        name: string;
        description: string;
        icon: ReactNode;
    }
}

const samplePlan: Plan = {
    id: 1,
    name: "Anchor Plan",
    description: "Homebuyer would pay 20% upfront to secure the property, get a provisional allocation, and spread the remaining 80% over 24-36 months",
    downpaymentPercentage: 20,
    allowMortgage: true,
    allowDownpayment: true,
}

export default function PlanCard({ plan }: Props) {
    const [openEditModal, setOpenEditModal] = useState(false)

    return (
        <div
            key={plan.name}
            className="p-4 border border-primary-border rounded-lg m-2"
        >
            <PlanEditModal open={openEditModal} setOpen={setOpenEditModal} plan={samplePlan} />
            <div className="flex flex-row items-center justify-between gap-2 mb-4">
                <div className="text-8xl rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                    {plan.icon}
                </div>
                <Button variant='subtle' size='sm' onClick={() => setOpenEditModal(true)}>Edit</Button>
            </div>
            <h2 className="text-lg text-primary-text font-medium mb-2">
                {plan.name}
            </h2>
            <p className="text-secondary-text text-sm">
                {plan.description}
            </p>
        </div>
    )
}
