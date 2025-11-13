import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("accessToken")?.value

        if (!accessToken) {
            return NextResponse.json({
                isExpired: true,
                timeUntilExpiry: 0,
                shouldRefresh: false
            })
        }

        // Parse JWT to get expiry
        const payload = jose.decodeJwt(accessToken)
        if (!payload || !payload.exp) {
            return NextResponse.json({
                isExpired: true,
                timeUntilExpiry: 0,
                shouldRefresh: false
            })
        }

        const now = Math.floor(Date.now() / 1000)
        const timeUntilExpiry = Math.max(payload.exp - now, 0)
        const isExpired = now >= payload.exp
        const shouldRefresh = timeUntilExpiry <= 5 * 60 // Refresh if less than 5 minutes left

        return NextResponse.json({
            isExpired,
            timeUntilExpiry,
            shouldRefresh
        })

    } catch (error) {
        console.error("Token status check error:", error)
        return NextResponse.json({
            isExpired: true,
            timeUntilExpiry: 0,
            shouldRefresh: false
        })
    }
}