"use server";

import { ApiResponse } from "@/types/common";
import { IAuthData } from "@/types/user";
import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_CONFIG, SessionMetadata, isSessionExpired, updateLastActivity, createSessionMetadata } from "./session-config";

// Cache for JWT parsing to avoid repeated parsing
const jwtCache = new Map<string, { parsed: any; expiry: number }>();

// Cache for session metadata to avoid repeated JSON parsing
const sessionCache = new Map<string, { metadata: SessionMetadata; expiry: number }>();

// Throttle session updates - only update every 5 minutes
const ACTIVITY_UPDATE_THROTTLE = 5 * 60 * 1000; // 5 minutes in milliseconds

// Clean up expired cache entries periodically to prevent memory leaks
setInterval(() => {
    const now = Date.now();

    // Clean JWT cache
    for (const [key, value] of jwtCache.entries()) {
        if (value.expiry <= now) {
            jwtCache.delete(key);
        }
    }

    // Clean session cache
    for (const [key, value] of sessionCache.entries()) {
        if (value.expiry <= now) {
            sessionCache.delete(key);
        }
    }
}, 60000); // Clean every minute

export async function updateSession(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value ?? "";
    const refreshToken = req.cookies.get("refreshToken")?.value ?? "";
    const sessionMetadataStr = req.cookies.get("sessionMetadata")?.value ?? "";

    const pathname = req.nextUrl.pathname;

    // Define protected route patterns with required roles
    const protectedRoutes: { pattern: RegExp; roles: string[] }[] = [
        { pattern: /^\/staff-dashboard/, roles: ["staff", "admin"] },
        { pattern: /^\/admin-dashboard/, roles: ["admin"] },
        { pattern: /^\/user-dashboard/, roles: ["user"] },
    ];

    // No tokens → clear session and redirect to sign in
    if (!accessToken && !refreshToken) {
        return clearSession(req, 'Clearing session: No tokens');
    }

    const res = NextResponse.next();

    // Parse session metadata with caching
    let sessionMetadata: SessionMetadata | null = null;
    if (sessionMetadataStr) {
        const cached = sessionCache.get(sessionMetadataStr);
        if (cached && cached.expiry > Date.now()) {
            sessionMetadata = cached.metadata;
        } else {
            try {
                sessionMetadata = JSON.parse(sessionMetadataStr);
                // Cache for 5 minutes
                if (sessionMetadata) {
                    sessionCache.set(sessionMetadataStr, {
                        metadata: sessionMetadata,
                        expiry: Date.now() + 5 * 60 * 1000
                    });
                }
            } catch {
                return clearSession(req, 'Invalid session metadata');
            }
        }
    }

    const setTokenCookie = (name: string, token: string, maxAge?: number) => {
        res.cookies.set(name, token, {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            ...(maxAge ? { maxAge } : {}),
        });
    };

    const setSessionMetadata = (metadata: SessionMetadata) => {
        res.cookies.set("sessionMetadata", JSON.stringify(metadata), {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: SESSION_CONFIG.REFRESH_TOKEN_EXPIRY,
        });
    };

    try {
        // Parse JWT with caching
        let parsed;
        const cached = jwtCache.get(accessToken);
        if (cached && cached.expiry > Date.now()) {
            parsed = cached.parsed;
        } else {
            parsed = jose.decodeJwt(accessToken);
            // Cache for 30 seconds to avoid repeated parsing
            jwtCache.set(accessToken, {
                parsed,
                expiry: Date.now() + 30 * 1000
            });
        }

        const now = Math.floor(Date.now() / 1000);

        // Check session metadata for timeouts
        if (sessionMetadata) {
            const sessionCheck = isSessionExpired(sessionMetadata);
            if (sessionCheck.expired) {
                return clearSession(req, `Session expired: ${sessionCheck.reason}`);
            }
        }

        let needsRefresh = false;
        let newTokens: { accessToken: string; refreshToken?: string } | null = null;

        // Token expired → refresh
        if (parsed.exp && now >= parsed.exp) {
            if (!refreshToken) return clearSession(req, 'Expired with no refresh token');

            newTokens = await tokens(refreshToken);
            if (!newTokens) return clearSession(req, 'Token refresh failed');

            // Parse new token (no caching for fresh tokens)
            parsed = jose.decodeJwt(newTokens.accessToken);
            needsRefresh = true;
        }

        // Update session with consistent expiry
        const accessTokenMaxAge = parsed.exp ? Math.max(parsed.exp - now, 0) : SESSION_CONFIG.ACCESS_TOKEN_EXPIRY;

        if (needsRefresh && newTokens) {
            setTokenCookie("accessToken", newTokens.accessToken, accessTokenMaxAge);
            setTokenCookie("refreshToken", newTokens.refreshToken ?? refreshToken, SESSION_CONFIG.REFRESH_TOKEN_EXPIRY);

            // Update session metadata with new token expiry
            const updatedMetadata = sessionMetadata
                ? { ...updateLastActivity(sessionMetadata), accessTokenExp: parsed.exp || (now + SESSION_CONFIG.ACCESS_TOKEN_EXPIRY) }
                : createSessionMetadata(parsed.exp || (now + SESSION_CONFIG.ACCESS_TOKEN_EXPIRY), now + SESSION_CONFIG.REFRESH_TOKEN_EXPIRY);
            setSessionMetadata(updatedMetadata);
        } else {
            // Only update session activity if it's been more than 5 minutes since last update
            const shouldUpdateActivity = !sessionMetadata ||
                (Date.now() - (sessionMetadata.lastActivity * 1000)) > ACTIVITY_UPDATE_THROTTLE;

            if (shouldUpdateActivity) {
                setTokenCookie("accessToken", accessToken, accessTokenMaxAge);
                setTokenCookie("refreshToken", refreshToken, SESSION_CONFIG.REFRESH_TOKEN_EXPIRY);

                // Update last activity
                const updatedMetadata = sessionMetadata
                    ? updateLastActivity(sessionMetadata)
                    : createSessionMetadata(parsed.exp || (now + SESSION_CONFIG.ACCESS_TOKEN_EXPIRY), now + SESSION_CONFIG.REFRESH_TOKEN_EXPIRY);
                setSessionMetadata(updatedMetadata);
            }
            // If not updating activity, just continue without cookie operations
        }

        // Role check - optimized to exit early
        for (const route of protectedRoutes) {
            if (route.pattern.test(pathname)) {
                const roles = (parsed.roles as string[]) ?? [];
                const hasAccess = route.roles.some(r => roles.includes(r));

                if (!hasAccess) {
                    return NextResponse.redirect(new URL("/events", req.url));
                }
                // Exit early once we find a matching route
                break;
            }
        }
    } catch (err) {
        console.error("Failed to parse JWT:", err);
        return clearSession(req, 'Failed to parse JWT');
    }

    return res;
}

async function tokens(refreshToken: string) {
    try {
        const apiUrl = `${process.env.API_BASE_URL}/auth/refresh`;
        const resp = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!resp.ok) return null;

        const data: ApiResponse<IAuthData> = await resp.json();
        return {
            accessToken: data.payload.token.authToken,
            refreshToken: data.payload.token.authToken,
        };
    } catch (err) {
        console.error("Error refreshing tokens:", err);
        return null;
    }
}

export async function clearSession(req: NextRequest, reason?: string) {
    // Log only in development for debugging
    if (reason && process.env.NODE_ENV === 'development') {
        console.log(`[Clearing session]: ${reason}`)
    }

    // If we have a refresh token, attempt to invalidate it on the server
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (refreshToken) {
        try {
            await invalidateRefreshToken(refreshToken);
        } catch (error) {
            console.error('Failed to invalidate refresh token:', error);
        }
    }

    const res = NextResponse.redirect(new URL("/signin", req.url));

    // Clear all session-related cookies
    const cookiesToClear = ["accessToken", "refreshToken", "sessionMetadata"];
    cookiesToClear.forEach(cookieName => {
        res.cookies.set(cookieName, "", {
            ...SESSION_CONFIG.COOKIE_OPTIONS,
            maxAge: 0,
        });
    });

    return res;
}

async function invalidateRefreshToken(refreshToken: string) {
    try {
        const apiUrl = `${process.env.API_BASE_URL}/auth/invalidate`;
        const resp = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!resp.ok) {
            console.error('Failed to invalidate refresh token on server');
        }
    } catch (err) {
        console.error("Error invalidating refresh token:", err);
    }
}
