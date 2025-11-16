import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";
import { fetchPropertyById } from "@/lib/api";
import { Property } from "./Property";
import { ReactNode } from "react";

export default async function Layout({ params, tabs, children }: { params: Promise<{ id: string }>, tabs: ReactNode, children: ReactNode }) {
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
            {tabs ?? children}
        </HydrationBoundary>
    );
}
