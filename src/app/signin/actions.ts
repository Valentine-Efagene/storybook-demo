'use server'
import { signInSchema } from '@/lib/validation/user-schema'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { randomBytes } from 'crypto'
import { AuthResponse } from '@/types/user'
import { createSessionMetadata, SESSION_CONFIG } from '@/lib/session-config'

export async function signIn(formData: unknown) {
    const parsed = signInSchema.safeParse(formData)

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors }
    }

    const { email, password } = parsed.data

    try {
        const res = await fetch(`${process.env.VITE_API_BASE_URL}/onboarding/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
            cache: 'no-store',
        })

        const data: AuthResponse = await res.json()

        if (!res.ok) {
            return {
                error: {
                    form: [data?.message || 'Sign in failed.'],
                },
            }
        }

        const { accessToken, refreshToken } = data.payload

        // Decode access token to get expiry
        const parsed = jose.decodeJwt(accessToken);
        const now = Math.floor(Date.now() / 1000);
        const accessTokenExp = parsed.exp || (now + SESSION_CONFIG.ACCESS_TOKEN_EXPIRY);
        const refreshTokenExp = now + SESSION_CONFIG.REFRESH_TOKEN_EXPIRY;

        // Create session metadata and session ID
        const sessionMetadata = createSessionMetadata(accessTokenExp, refreshTokenExp);
        const sessionId = randomBytes(32).toString('hex');

        // ✅ Store tokens and session metadata in cookies
        const cookieStore = await cookies()

        cookieStore.set('accessToken', accessToken, {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.ACCESS_TOKEN_EXPIRY,
        })

        cookieStore.set('refreshToken', refreshToken, {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.REFRESH_TOKEN_EXPIRY,
        })

        cookieStore.set('sessionMetadata', JSON.stringify(sessionMetadata), {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.REFRESH_TOKEN_EXPIRY,
        })

        cookieStore.set('sessionId', sessionId, {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.REFRESH_TOKEN_EXPIRY,
        })

        return { success: data?.message || 'Sign in successful!' }
    } catch (err: any) {
        return {
            error: {
                form: [err.message || 'Unexpected error occurred.'],
            },
        }
    }
}