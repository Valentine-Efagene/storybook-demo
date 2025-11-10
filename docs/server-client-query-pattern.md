# Server-Side Rendering + React Query Best Practices

## Problem: Duplicate Queries & Client/Server Hook Conflicts

Previously, we had issues with:

- ❌ **Duplicate API calls** on initial load
- ❌ **Wasted prefetch data** due to mismatched query keys
- ❌ **Inconsistent caching** behavior
- ❌ **Code duplication** and maintenance overhead
- ❌ **useSearchParams in server components** causing build errors

## Solution: Proper Server/Client Separation with Shared Utilities

### 1. Query Key Utilities (`lib/query-keys.ts`) - Server & Client Safe

```typescript
// ✅ Pure utility functions - work in both server and client
export function getUsersQueryKey(params: UserQueryParams) {
  return [
    QUERY_KEYS.USERS,
    "admin",
    params.offset,
    params.search,
    params.from,
    params.limit,
  ];
}

export function createUsersQueryKey(
  offset: string | null,
  search: string | null,
  from: string | null,
  limit: string | null
) {
  return [QUERY_KEYS.USERS, "admin", offset, search, from, limit];
}
```

### 2. Custom Hook (`useUsers.ts`) - Client Only

```typescript
// ✅ Client-side hook with useSearchParams
export function useUsers(initialParams: UserQueryParams) {
  const searchParams = useSearchParams(); // Client hook - safe here

  const offset = searchParams.get("offset") ?? initialParams.offset ?? "0";
  const search = searchParams.get("search") ?? initialParams.search ?? null;
  const from = searchParams.get("from") ?? initialParams.from ?? null;
  const to = searchParams.get("to") ?? initialParams.to ?? null;
  const limit = searchParams.get("limit") ?? initialParams.limit ?? "20";

  // ✅ Uses pure utility function - consistent with server
  const queryKey = createUsersQueryKey(offset, search, from, limit);

  return useQuery({
    queryKey,
    queryFn: () => fetchUsers({ offset, search, from, to, limit }),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
```

```typescript
export default async function Users() {
  const queryClient = new QueryClient();

  const initialQparams = {
    offset: "0",
    search: null,
    limit: EnvironmentHelper.PAGINATION_LIMIT.toString(),
    from: null,
    to: null,
  };

  // ✅ Use helper to ensure matching query keys
  await queryClient.prefetchQuery({
    queryKey: getUsersQueryKey(initialQparams),
    queryFn: () => fetchUsers(initialQparams),
  });

  return (
    <QueryProvider dehydratedState={dehydrate(queryClient)}>
      <UserTable initialQparams={initialQparams} />
    </QueryProvider>
  );
}
```

### 3. Client Component (`UserTable.tsx`)

```typescript
export function UserTable({ initialQparams }: Props) {
  // ✅ Use the centralized hook
  const {
    data: paginatedData,
    isFetching: isLoading,
    isError,
    error,
  } = useUsers(initialQparams);

  // ... rest of component logic
}
```

## Benefits of This Approach

### ✅ **Single Source of Truth**

- All query logic is centralized in the custom hook
- Query keys are guaranteed to match between server and client
- Consistent caching behavior

### ✅ **Efficient Data Loading**

1. **Server-side**: Prefetches initial data during SSR
2. **Client-side**: Uses prefetched data immediately, no duplicate requests
3. **Navigation**: Subsequent queries use React Query cache

### ✅ **Maintainable Code**

- Changes to query logic only need to happen in one place
- Type safety across server and client
- Clear separation of concerns

### ✅ **Optimal Performance**

- No duplicate API calls
- Instant page loads with prefetched data
- Efficient cache invalidation and updates

## Data Flow Diagram

```
1. Server Component (page.tsx)
   ├── Creates QueryClient
   ├── Prefetches with getUsersQueryKey()
   └── Dehydrates state

2. Client Component (UserTable.tsx)
   ├── Uses useUsers() hook
   ├── Matches exact query key
   └── Uses prefetched data (no API call)

3. User Interaction (pagination/search)
   ├── Updates URL params
   ├── useUsers() detects change
   └── Fetches new data with updated key
```

## Query Key Strategy

```typescript
// ✅ CORRECT: Consistent across server and client
const queryKey = [QUERY_KEYS.USERS, "admin", offset, search, from, limit];

// ❌ WRONG: Different keys cause cache misses
// Server: ['users', page, search]
// Client:  [QUERY_KEYS.USERS, 'admin', offset, search, from, limit]
```

## Best Practices

1. **Always use the helper function** for server-side prefetching
2. **Extract query logic** into custom hooks for reusability
3. **Match query keys exactly** between server and client
4. **Include all relevant parameters** in the query key
5. **Use TypeScript** to ensure type safety across components

This pattern ensures optimal performance, maintainable code, and excellent user experience!
