import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";
import { Properties } from "./Properties";
import { PropertyQueryParams } from "@/types/property";
import { fetchProperties } from "@/lib/api";
import EnvironmentHelper from "@/lib/helpers/EnvironmentHelper";
import { getPropertiesQueryKey } from "@/lib/query-keys";

export default async function Users() {
    const queryClient = new QueryClient();

    // Initial values for keys - should match Properties exactly
    const initialQparams: PropertyQueryParams = {
        offset: "0",
        search: null,
        limit: EnvironmentHelper.PAGINATION_LIMIT.toString(),
        from: null,
        to: null,
        status: null
    }

    // Prefetch with the EXACT same query key as Properties uses
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
