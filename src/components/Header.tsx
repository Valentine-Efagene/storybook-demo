import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";
import { Breadcrumbs } from "./Breadcrumbs"
import { ProfileDropdown } from "./ProfileDropdown"
import { SidebarTrigger } from "./ui/sidebar"
import { getCurrentUserFromSession } from "@/actions/user-session"
import { QUERY_KEYS } from "@/types/user"
// import { TokenStatus } from "./debug/TokenStatus";

export async function Header() {
    const queryClient = new QueryClient()

    // Prefetch the current user data on the server
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.USER, 'session', 'display'],
        queryFn: async () => {
            const { displayUser } = await getCurrentUserFromSession()
            return displayUser
        },
    })

    const dehydratedState = dehydrate(queryClient)

    return (
        <header className="flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumbs />
            </div>
            {/* <TokenStatus /> */}
            <div className="">
                <HydrationBoundary state={dehydratedState}>
                    <ProfileDropdown />
                </HydrationBoundary>
            </div>
        </header>
    )
}
