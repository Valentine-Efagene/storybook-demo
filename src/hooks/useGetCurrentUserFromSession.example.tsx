/**
 * Example usage of useGetCurrentUserFromSession hook
 * 
 * This file demonstrates various ways to use the useGetCurrentUserFromSession hook
 * for fetching and managing current user session data.
 * 
 * The hook now uses fetchUserById with the user ID extracted from the JWT token,
 * providing better separation of concerns between client and server code.
 */

import { ProfileDropdown } from "@/components/ProfileDropdown"
import { useGetCurrentUserFromSession } from "./useGetCurrentUserFromSession"

// Example 1: Basic usage with ProfileDropdown
export function BasicUserProfile() {
    const { data: user, isLoading, error } = useGetCurrentUserFromSession()

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
                <div className="h-4 w-16 animate-pulse bg-muted rounded" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-sm text-muted-foreground">
                Error loading user
            </div>
        )
    }

    if (!user) {
        return (
            <div className="text-sm text-muted-foreground">
                Not signed in
            </div>
        )
    }

    return <ProfileDropdown user={user} />
}

// Example 2: Header component with user session
export function HeaderWithUser() {
    const { data: user, isLoading, error } = useGetCurrentUserFromSession({
        refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    })

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold">My App</h1>
            </div>

            <div className="flex items-center gap-4">
                {isLoading ? (
                    <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
                ) : error ? (
                    <div className="text-sm text-red-500">Error</div>
                ) : user ? (
                    <ProfileDropdown user={user} />
                ) : (
                    <div className="text-sm text-muted-foreground">
                        Not signed in
                    </div>
                )}
            </div>
        </header>
    )
}

// Example 3: Conditional content based on user session
export function UserDashboard() {
    const { data: user, isLoading, error } = useGetCurrentUserFromSession()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="text-center p-8">
                <h2 className="text-lg font-semibold mb-2">Please sign in</h2>
                <p className="text-muted-foreground">
                    You need to be signed in to access this content.
                </p>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold">
                    {user.initials}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your account settings and preferences.
                    </p>
                </div>

                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Activity</h3>
                    <p className="text-sm text-muted-foreground">
                        View your recent activity and history.
                    </p>
                </div>

                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Configure your application preferences.
                    </p>
                </div>
            </div>
        </div>
    )
}

// Example 4: Custom hook for user-specific data
export function useUserSpecificData() {
    const { data: user, isLoading: userLoading, error: userError } = useGetCurrentUserFromSession()

    // You could extend this to fetch user-specific data
    // const { data: userSettings } = useQuery({
    //     queryKey: ['userSettings', user?.email],
    //     queryFn: () => fetchUserSettings(user?.email),
    //     enabled: !!user?.email,
    // })

    return {
        user,
        isLoading: userLoading,
        error: userError,
        isSignedIn: !!user,
    }
}

// Example 5: Using the custom hook
export function PersonalizedContent() {
    const { user, isLoading, isSignedIn } = useUserSpecificData()

    if (isLoading) {
        return <div>Loading personalized content...</div>
    }

    if (!isSignedIn) {
        return (
            <div className="text-center p-8">
                <h2 className="text-lg font-semibold mb-2">Sign in for personalized experience</h2>
                <p className="text-muted-foreground">
                    Create an account or sign in to see content tailored to you.
                </p>
            </div>
        )
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
                Content for {user?.name}
            </h2>
            <p className="text-muted-foreground">
                This content is personalized based on your profile and preferences.
            </p>
        </div>
    )
}

// Example 6: Hook with different options
export function AdvancedUserProfile() {
    // Different configurations for different use cases
    const { data: user, isLoading, error, refetch } = useGetCurrentUserFromSession({
        enabled: true, // Enable automatic fetching
        refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    })

    const handleRefreshUser = () => {
        refetch()
    }

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">User Profile</h3>
                <button
                    onClick={handleRefreshUser}
                    disabled={isLoading}
                    className="text-sm text-primary hover:text-primary/80 disabled:opacity-50"
                >
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {error ? (
                <div className="text-sm text-red-500 mb-2">
                    Error: {error.message}
                </div>
            ) : null}

            {user ? (
                <div className="space-y-2">
                    <div className="text-sm">
                        <span className="font-medium">Name:</span> {user.name || 'N/A'}
                    </div>
                    <div className="text-sm">
                        <span className="font-medium">Email:</span> {user.email || 'N/A'}
                    </div>
                    <div className="text-sm">
                        <span className="font-medium">Initials:</span> {user.initials || 'N/A'}
                    </div>
                </div>
            ) : (
                <div className="text-sm text-muted-foreground">
                    No user data available
                </div>
            )}
        </div>
    )
}