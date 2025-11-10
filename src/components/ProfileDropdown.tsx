"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ResponsiveDialog } from "./ResponsiveDialog"
import { User, Settings, LogOut, Shield, CreditCard, ChevronDown } from "lucide-react"
import { signOut } from "@/app/signin/actions"
import { toast } from "sonner"
import { useGetCurrentUserFromSession } from "@/hooks/useGetCurrentUserFromSession"
import ImageHelper from "@/lib/helpers/ImageHelper"

export function ProfileDropdown() {
    const { data: user, isLoading, error } = useGetCurrentUserFromSession()
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const router = useRouter()

    // Memoize the profile component to ensure consistent rendering
    const profileComponent = useMemo(() => {
        if (isLoading) {
            return <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
        }

        // Ensure consistent initials calculation
        const initials = user?.initials ||
            (user?.name ? user.name.split(' ').map(n => n[0]).join('') : null) ||
            'U'

        const url = ImageHelper.getCdnLink(user?.avatar, 'avatar') ?? ''
        const displayName = user?.name || "User"
        const displayEmail = user?.email || ""

        const handleLogout = async () => {
            setIsLoggingOut(true)
            try {
                const result = await signOut()

                if (result.error) {
                    toast.error(result.error.form?.[0] || 'Failed to sign out')
                    return
                }

                toast.success(result.success || 'Signed out successfully!')
                setLogoutDialogOpen(false)

                // Redirect to signin page
                router.push('/signin')

            } catch (error) {
                toast.error('An unexpected error occurred')
            } finally {
                setIsLoggingOut(false)
            }
        }

        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative flex items-center justify-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={url} alt={displayName} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <span>{displayName}</span>
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {displayName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {displayEmail}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Security</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setLogoutDialogOpen(true)}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <ResponsiveDialog
                    open={logoutDialogOpen}
                    setOpen={setLogoutDialogOpen}
                    title="Confirm Logout"
                    description="Are you sure you want to log out of your account?"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setLogoutDialogOpen(false)}
                                disabled={isLoggingOut}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? "Logging out..." : "Log Out"}
                            </Button>
                        </div>
                    </div>
                </ResponsiveDialog>
            </>
        )
    }, [user, isLoading, error, logoutDialogOpen, isLoggingOut, router])

    return profileComponent
}