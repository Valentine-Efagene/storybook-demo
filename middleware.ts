import { updateSession } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
    '/signin',
]

function isPublicRoute(pathname: string): boolean {
    return PUBLIC_ROUTES.some((route) => {
        if (route === "/") return pathname === "/"; // only match home
        return pathname === route || pathname.startsWith(`${route}/`);
    });
}

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Skip middleware for public/auth routes
    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    // For protected routes, handle authentication and session management
    return await updateSession(req);
}

export const config = {
    matcher: [
        // More specific matcher to exclude common static assets and API routes
        "/((?!_next/static|_next/image|favicon.ico|public|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)",
    ],
};