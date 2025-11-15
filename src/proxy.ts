import { getSession, updateSession } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
    '/signin',
]

function isAuthRoute(pathname: string): boolean {
    return AUTH_ROUTES.some((route) => {
        // Exact match for root
        if (route === "/") return pathname === "/";
        // Exact match or starts with route path + slash
        return pathname === route || pathname.startsWith(`${route}/`);
    });
}

// Named function export is recommended for clarity
export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Watch closely for stability: This handles only auth routes
    // Revert if problematic, to just return NextResponse.next()
    if (isAuthRoute(pathname)) {
        const session = await getSession(req);

        if (session) {
            return NextResponse.redirect(new URL('/', req.url));
        } else {
            return NextResponse.next();
        }
    }

    // For protected routes, handle authentication and session management
    return updateSession(req);
}

// Simplified and more reliable matcher configuration
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - Common static file extensions
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
    ],
    // Optional: Use Edge Runtime for better performance (default in proxy)
    // runtime: 'edge', // Uncomment if your updateSession function supports Edge Runtime
}