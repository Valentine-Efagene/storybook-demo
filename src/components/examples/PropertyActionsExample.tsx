'use client'

import { Can } from '@casl/react'
import { useAbility } from '@/lib/ability/AbilityContext'
import { Action } from '@/types/common'
import { Button } from '@/components/ui/button'

interface PropertyActionsExampleProps {
    property: {
        id: number
        title: string
        poster_id: number
        status: 'available' | 'pending' | 'allocated' | 'sold'
        __type: 'Property' // Required for CASL subject detection
    }
}

/**
 * Example component demonstrating role-based UI rendering with CASL abilities using @casl/react.
 * 
 * Shows/hides buttons based on:
 * - Admin: Can see all actions
 * - Property owner: Can edit their own properties  
 * - Others: Can only view
 * - No one: Cannot delete allocated properties (global rule)
 * 
 * Uses both:
 * - `Can` component for declarative permission rendering
 * - `useAbility().can()` for imperative permission checks
 */
export function PropertyActionsExample({ property }: PropertyActionsExampleProps) {
    const ability = useAbility()

    // Imperative check for early return
    if (!ability.can(Action.Read, property)) {
        return <div className="text-gray-500">No access to view this property</div>
    }

    return (
        <div className="p-4 border rounded-lg space-y-3">
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-sm text-gray-600">
                Status: {property.status} | Posted by: {property.poster_id}
            </p>

            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    View Details
                </Button>

                {/* Declarative permission rendering with Can component */}
                <Can I={Action.Update} this={property} ability={ability}>
                    <Button variant="default" size="sm">
                        Edit Property
                    </Button>
                </Can>

                <Can I={Action.Delete} this={property} ability={ability}>
                    <Button variant="destructive" size="sm">
                        Delete Property
                    </Button>
                </Can>
            </div>

            {/* Debug info using imperative checks */}
            <div className="text-xs text-gray-400 mt-2">
                Can Update: {ability.can(Action.Update, property) ? 'Yes' : 'No'} |
                Can Delete: {ability.can(Action.Delete, property) ? 'Yes' : 'No'}
            </div>
        </div>
    )
}