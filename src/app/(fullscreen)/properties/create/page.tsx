import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"
import { fetchPlans } from "@/lib/api"
import { getPlansQueryKey } from "@/lib/query-keys"
import { PropertyCreationForm } from "./PropertyCreationForm"

export default async function CreatePropertyPage() {
    const queryClient = new QueryClient()

    // Prefetch plans data using the same pattern as users page
    await queryClient.prefetchQuery({
        queryKey: getPlansQueryKey(),
        queryFn: () => fetchPlans(),
    })

    const dehydratedState = dehydrate(queryClient)

    return (
        <HydrationBoundary state={dehydratedState}>
            <PropertyCreationForm />
        </HydrationBoundary>
    )
}