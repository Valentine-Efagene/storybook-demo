import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";
import { Properties } from "./Properties";
import { UserQueryParams } from "@/types/user";
import { fetchProperties, fetchUsers } from "@/lib/api";
import EnvironmentHelper from "@/lib/helpers/EnvironmentHelper";
import { getPropertiesQueryKey, getUsersQueryKey } from "@/lib/query-keys";

export default async function Users() {
    const queryClient = new QueryClient();

    // Initial values for keys - should match UserTable exactly
    const initialQparams: UserQueryParams = {
        offset: "0",
        search: null,
        limit: EnvironmentHelper.PAGINATION_LIMIT.toString(),
        from: null,
        to: null,
        contributionStatus: null
    }

    // Prefetch with the EXACT same query key as UserTable uses
    await queryClient.prefetchQuery({
        queryKey: getPropertiesQueryKey(initialQparams),
        queryFn: () => fetchProperties(initialQparams),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <Properties initialQparams={initialQparams} />
        </HydrationBoundary>
    );
}
