# Next.js React Query Caching & Hydration Fix

## Problems

### 1. Caching Issue

When navigating away from the users page and returning, the page would reload from scratch instead of using cached data, providing a poor user experience.

### 2. Hydration Error

"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties" due to server/client mismatches.

## Root Causes

### 1. Nested QueryProviders

The issue was caused by **nested QueryProviders**:

1. **Global QueryProvider** in root layout (good for client-side caching)
2. **Page-specific QueryProvider** with dehydrated state (causing cache isolation)

This created separate cache instances, preventing proper cache persistence across navigation.

### 2. Hydration Mismatches

- **useSearchParams()** returns different values on server vs client during SSR
- **new Date()** calls create different timestamps on server vs client
- Components using these need proper Suspense boundaries

## Solutions

### 1. Remove Nested QueryProvider & Add Suspense

**Before:**

```tsx
// In users/page.tsx
return (
  <QueryProvider dehydratedState={dehydratedState}>
    <UserTable initialQparams={initialQparams} />
  </QueryProvider>
);
```

**After:**

```tsx
// In users/page.tsx
return (
  <HydrationBoundary state={dehydratedState}>
    <Suspense fallback={<CenteredLoader size="lg" />}>
      <UserTable initialQparams={initialQparams} />
    </Suspense>
  </HydrationBoundary>
);
```

### 2. Fix Date Consistency for Hydration

**Before:**

```tsx
<DatePicker maxDate={new Date()} /> // Different on server vs client!
```

**After:**

````tsx
const today = useMemo(() => new Date(), [])  // Consistent across renders
<DatePicker maxDate={today} />
```### 2. Improved Cache Settings

Enhanced the cache configuration in `useUsers` hook:

```typescript
// Increased staleTime and gcTime for better navigation experience
staleTime: 5 * 60 * 1000, // 5 minutes (was 2 minutes)
gcTime: 10 * 60 * 1000,   // 10 minutes (was 5 minutes)
````

### 3. Architecture Overview

```
Root Layout
├── QueryProvider (global, singleton)
    ├── Page 1
    │   ├── HydrationBoundary (server-prefetched data)
    │   └── Components using useQuery
    ├── Page 2
    │   ├── HydrationBoundary (server-prefetched data)
    │   └── Components using useQuery
    └── ... (all pages share the same QueryClient cache)
```

## Benefits

1. **Better UX**: Pages load instantly when returning from navigation
2. **Reduced API calls**: Cached data is reused effectively
3. **Memory efficiency**: Single QueryClient manages all cache
4. **Consistent behavior**: All pages follow the same caching pattern

## Key Principles

1. **One QueryClient per app**: Use global QueryProvider in root layout
2. **HydrationBoundary for SSR**: Use for server-prefetched data, not separate QueryProviders
3. **Appropriate cache times**: Longer staleTime for better navigation UX
4. **Consistent query keys**: Ensure server and client use identical keys

## Testing

To verify the fix works:

1. Visit the users page
2. Navigate to another page using side nav
3. Return to users page
4. The page should load instantly without API calls (check Network tab)
