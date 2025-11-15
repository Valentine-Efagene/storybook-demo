import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";
import { fetchPropertyById } from "@/lib/api";
import { Property } from "./Property";

export default async function PropertyPage({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient();
    const id = (await params).id

    // Prefetch with the EXACT same query key as Properties uses
    await queryClient.prefetchQuery({
        queryKey: [id],
        queryFn: () => fetchPropertyById(id),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <Property id={parseInt(id)} />
        </HydrationBoundary>
    );
}
