import {
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { UserTable } from "./UserTable";
import { UserQueryParams } from "@/types/user";
import { fetchUsers } from "@/lib/api";
import { QueryProvider } from "@/providers/query-provider";
import EnvironmentHelper from "@/lib/helpers/EnvironmentHelper";

export default async function Users() {
    const queryClient = new QueryClient();

    // Initial values for keys
    const initialQparams: UserQueryParams = {
        offset: "0",
        search: null,
        limit: EnvironmentHelper.PAGINATION_LIMIT.toString(),
        from: null,
        to: null
    }

    // preload into query cache
    await queryClient.prefetchQuery({
        queryKey: ['users', initialQparams.page, initialQparams.search],
        queryFn: () => fetchUsers(initialQparams),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <QueryProvider dehydratedState={dehydratedState}>
            <UserTable initialQparams={initialQparams} />
        </QueryProvider>
    );
}
