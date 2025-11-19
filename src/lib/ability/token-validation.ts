import { z } from 'zod'
import { TokenMetadata, Role } from '@/types/user'

// Runtime validation schema for JWT tokens
export const TokenPayloadSchema = z.object({
    user_id: z.number(),
    roles: z.array(z.string()).transform(roles => roles as Role[]),
    exp: z.number(),
    iat: z.number(),
    sub: z.number().optional(),
    id: z.number().optional()
})

export type ValidatedTokenPayload = z.infer<typeof TokenPayloadSchema>

/**
 * Safely decode and validate JWT token structure
 */
export function decodeAndValidateToken(token: string): ValidatedTokenPayload {
    try {
        const decoded = jose.decodeJwt(token)
        const result = TokenPayloadSchema.safeParse(decoded)

        if (!result.success) {
            throw new Error(`Invalid token structure: ${result.error.message}`)
        }

        return result.data
    } catch (error) {
        throw new Error(`Token validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}