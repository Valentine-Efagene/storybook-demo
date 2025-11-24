"use server"

import { userSuspensionSchema } from '@/lib/validation/user-schema'
import { User } from '@/types/user'
import EnvironmentHelper from '@/lib/helpers/EnvironmentHelper'
import { ApiResponse } from '@/types/common'
import { invalidateUserCache } from '@/lib/cache-utils'
import { getServerToken } from '@/lib/server'

export async function suspend(formData: unknown) {
    const parsed = userSuspensionSchema.safeParse(formData)

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors }
    }

    const { suspend_reason, userId } = parsed.data

    try {
        const accessToken = await getServerToken()
        const res = await fetch(`${EnvironmentHelper.API_BASE_URL}/auth/users/suspend/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                suspend_reason,
            }),
            cache: 'no-store',
        })

        const data: ApiResponse<{ user: User }> = await res.json()
        console.log({ url: `${EnvironmentHelper.API_BASE_URL}/auth/users/suspend/${userId}`, data, res })

        if (!res.ok) {
            return {
                error: {
                    form: [data?.message || 'Suspension failed.'],
                },
            }
        }


        await invalidateUserCache()
        return { success: data?.message || 'Suspension successful!' }
    } catch (err: any) {
        return {
            error: {
                form: [err.message || 'Unexpected error occurred.'],
            },
        }
    }
}