export const SESSION_CONFIG = {
    // Token expiry times (in seconds)
    ACCESS_TOKEN_EXPIRY: 60 * 60, // 1 hour
    REFRESH_TOKEN_EXPIRY: 60 * 60 * 24 * 30, // 30 days

    // Session timeout settings
    IDLE_TIMEOUT: 60 * 60 * 2, // 2 hours of inactivity
    ABSOLUTE_TIMEOUT: 60 * 60 * 24, // 24 hours maximum session duration

    // Session management
    MAX_CONCURRENT_SESSIONS: 5,

    // Cookie settings
    COOKIE_OPTIONS: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax' as const,
        path: "/",
    }
} as const;

export interface SessionMetadata {
    createdAt: number; // Unix timestamp
    lastActivity: number; // Unix timestamp
    accessTokenExp: number; // Unix timestamp
    refreshTokenExp: number; // Unix timestamp
}

export function isSessionExpired(metadata: SessionMetadata): {
    expired: boolean;
    reason?: 'idle' | 'absolute' | 'token';
} {
    const now = Math.floor(Date.now() / 1000);

    // Check if access token is expired
    if (now >= metadata.accessTokenExp) {
        return { expired: true, reason: 'token' };
    }

    // Check idle timeout
    if (now - metadata.lastActivity > SESSION_CONFIG.IDLE_TIMEOUT) {
        return { expired: true, reason: 'idle' };
    }

    // Check absolute timeout
    if (now - metadata.createdAt > SESSION_CONFIG.ABSOLUTE_TIMEOUT) {
        return { expired: true, reason: 'absolute' };
    }

    return { expired: false };
}

export function createSessionMetadata(accessTokenExp: number, refreshTokenExp: number): SessionMetadata {
    const now = Math.floor(Date.now() / 1000);
    return {
        createdAt: now,
        lastActivity: now,
        accessTokenExp,
        refreshTokenExp,
    };
}

export function updateLastActivity(metadata: SessionMetadata): SessionMetadata {
    return {
        ...metadata,
        lastActivity: Math.floor(Date.now() / 1000),
    };
}