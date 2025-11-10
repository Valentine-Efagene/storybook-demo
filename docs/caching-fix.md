# Next.js React Query Caching Fix

## Problem

When navigating away from the users page and returning, the page would reload from scratch instead of using cached data, providing a poor user experience.

## Root Cause

The issue was caused by **nested QueryProviders**:

1. **Global QueryProvider** in root layout (good for client-side caching)
2. **Page-specific QueryProvider** with dehydrated state (causing cache isolation)

This created separate cache instances, preventing proper cache persistence across navigation.

## Solution

### 1. Remove Nested QueryProvider

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
    <UserTable initialQparams={initialQparams} />
  </HydrationBoundary>
);
```

### 2. Improved Cache Settings

Enhanced the cache configuration in `useUsers` hook:

```typescript
// Increased staleTime and gcTime for better navigation experience
staleTime: 5 * 60 * 1000, // 5 minutes (was 2 minutes)
gcTime: 10 * 60 * 1000,   // 10 minutes (was 5 minutes)
```

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
