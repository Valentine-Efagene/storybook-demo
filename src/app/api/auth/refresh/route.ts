import { NextRequest, NextResponse } from "next/server"
import { SESSION_CONFIG, createSessionMetadata } from "@/lib/session-config"
import * as jose from "jose"
import EnvironmentHelper from "@/lib/helpers/EnvironmentHelper"
import { ApiResponse } from "@/types/common"

export async function POST(req: NextRequest) {
    try {
        // Get refresh token from HTTP-only cookie
        const refreshToken = req.cookies.get("refreshToken")?.value
        const accessToken = req.cookies.get("accessToken")?.value

        if (!refreshToken) {
            return NextResponse.json(
                { error: "No refresh token found" },
                { status: 401 }
            )
        }

        if (!accessToken) {
            return NextResponse.json(
                { error: "No access token found" },
                { status: 401 }
            )
        }

        // Decode the access token to extract user ID
        const decoded = jose.decodeJwt(accessToken);
        const userId = decoded.sub || decoded.user_id || decoded.id;

        if (!userId) {
            return NextResponse.json(
                { error: "No user ID found in access token" },
                { status: 401 }
            )
        }

        // Call the backend refresh endpoint
        const apiUrl = `${EnvironmentHelper.API_BASE_URL}/auth/refresh`
        const resp = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "user_id": userId.toString()
            },
        })

        if (!resp.ok) {
            return NextResponse.json(
                { error: "Failed to refresh token" },
                { status: resp.status }
            )
        }

        const data: ApiResponse<{ token: string }> = await resp.json()
        const newAccessToken = data.body.token
        const newRefreshToken = data.body.token

        // Parse new token to get expiry
        const parsed = jose.decodeJwt(newAccessToken)
        const now = Math.floor(Date.now() / 1000)
        const accessTokenExp = parsed.exp || (now + SESSION_CONFIG.ACCESS_TOKEN_EXPIRY)
        const refreshTokenExp = now + SESSION_CONFIG.REFRESH_TOKEN_EXPIRY

        // Create session metadata
        const sessionMetadata = createSessionMetadata(accessTokenExp, refreshTokenExp)

        // Create response with new tokens in cookies
        const response = NextResponse.json({
            success: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })

        // Set new tokens as HTTP-only cookies
        response.cookies.set('accessToken', newAccessToken, {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.ACCESS_TOKEN_EXPIRY,
        })

        response.cookies.set('refreshToken', newRefreshToken, {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.REFRESH_TOKEN_EXPIRY,
        })

        response.cookies.set('sessionMetadata', JSON.stringify(sessionMetadata), {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.REFRESH_TOKEN_EXPIRY,
        })

        return response

    } catch (error) {
        console.error("Client refresh error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}