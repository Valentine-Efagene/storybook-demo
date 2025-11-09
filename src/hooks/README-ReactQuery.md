# React Query + Server Actions Integration

This document explains how React Query (TanStack Query) enhances our server action patterns with better state management, caching, and optimistic updates.

## Benefits of React Query Integration

### 1. **Automatic Cache Management**

- Invalidate related queries after mutations
- Update cache immediately with new data
- Remove stale data automatically

### 2. **Optimistic Updates**

- Update UI immediately before server response
- Rollback changes if mutation fails
- Better perceived performance

### 3. **Better Loading States**

- Global loading state management
- Prevent duplicate requests
- Cancel in-flight requests

### 4. **Enhanced Error Handling**

- Retry failed mutations
- Better error recovery
- Centralized error boundaries

## Migration Guide

### Before (Original useServerAction)

```tsx
const { formError, isLoading, executeAction } = useServerAction({
  setError: form.setError,
  onSuccess: (message) => {
    // Manual cache management needed
    mutate(); // Revalidate SWR or similar
  },
});

const onSubmit = async (data) => {
  await executeAction(signIn, data);
};
```

### After (useServerMutation)

```tsx
const signInMutation = useServerMutation(signIn, {
  setError: form.setError,
  mutationKey: ["signin"],
  invalidateQueries: [
    ["user"], // Automatic cache invalidation
    ["auth"],
  ],
  optimisticUpdate: {
    queryKey: ["user"],
    updater: (oldData, newData) => ({ ...oldData, ...newData }),
  },
  onSuccess: (data) => {
    queryClient.setQueryData(["user"], data);
  },
  redirectTo: "/dashboard",
});

const onSubmit = async (data) => {
  await signInMutation.mutateAsync(data);
};
```

## Key Features

### Optimistic Updates

Update the UI immediately, before the server responds:

```tsx
const updateProfileMutation = useServerMutation(updateProfile, {
  optimisticUpdate: {
    queryKey: ["user", "profile"],
    updater: (oldProfile, newData) => ({
      ...oldProfile,
      ...newData,
    }),
  },
});
```

### Cache Invalidation

Automatically refresh related data:

```tsx
const createPostMutation = useServerMutation(createPost, {
  invalidateQueries: [
    ["posts"], // All posts
    ["posts", "recent"], // Recent posts
    ["user", "posts"], // User's posts
  ],
});
```

### Manual Cache Updates

Directly update cache data:

```tsx
const deleteMutation = useServerMutation(deletePost, {
  onSuccess: (response, variables) => {
    queryClient.setQueryData(["posts"], (oldData) => ({
      ...oldData,
      posts: oldData.posts.filter((p) => p.id !== variables.id),
    }));
  },
});
```

## Common Patterns

### 1. List Management (CRUD)

```tsx
// Create: Add to list + invalidate
const create = useServerMutation(createItem, {
  invalidateQueries: [["items"]],
  onSuccess: (response) => {
    queryClient.setQueryData(["items"], (old) => ({
      ...old,
      items: [response.item, ...old.items],
    }));
  },
});

// Update: Optimistic update + invalidate
const update = useServerMutation(updateItem, {
  optimisticUpdate: {
    queryKey: ["items"],
    updater: (old, variables) => ({
      ...old,
      items: old.items.map((item) =>
        item.id === variables.id ? { ...item, ...variables } : item
      ),
    }),
  },
});

// Delete: Optimistic removal + invalidate
const deleteItem = useServerMutation(deleteItem, {
  optimisticUpdate: {
    queryKey: ["items"],
    updater: (old, variables) => ({
      ...old,
      items: old.items.filter((item) => item.id !== variables.id),
    }),
  },
});
```

### 2. Related Data Updates

```tsx
const assignUserToProject = useServerMutation(assignUser, {
  onSuccess: (response, variables) => {
    // Update project data
    queryClient.setQueryData(["project", variables.projectId], (old) => ({
      ...old,
      members: [...old.members, response.user],
    }));

    // Update user data
    queryClient.setQueryData(["user", variables.userId], (old) => ({
      ...old,
      projects: [...old.projects, response.project],
    }));

    // Invalidate lists
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});
```

### 3. Search with Caching

```tsx
const searchMutation = useServerMutation(searchAPI, {
  mutationKey: ["search"],
  onSuccess: (response, variables) => {
    // Cache search results
    queryClient.setQueryData(["search", variables.query], response);
  },
  showSuccessToast: false, // No toast for search
});
```

## Performance Benefits

1. **Reduced Server Requests**: Cached data prevents unnecessary refetching
2. **Instant UI Updates**: Optimistic updates provide immediate feedback
3. **Smart Invalidation**: Only refresh data that actually changed
4. **Background Refetching**: Keep data fresh without blocking UI

## Error Handling

React Query provides enhanced error handling:

```tsx
const mutation = useServerMutation(action, {
  onError: (error, variables, context) => {
    // Rollback optimistic updates
    if (context?.previousData) {
      queryClient.setQueryData(queryKey, context.previousData);
    }

    // Custom error handling
    toast.error(error.message);
  },
  retry: 3, // Automatic retries
});
```

## Best Practices

### 1. Query Key Conventions

```tsx
// Use consistent naming
["users"][("user", userId)][("user", userId, "posts")][ // All users // Specific user // User's posts
  ("posts", { status: "published" })
]; // Filtered posts
```

### 2. Mutation Keys

```tsx
// Use descriptive mutation keys
mutationKey: ["signin"];
mutationKey: ["updateProfile", userId];
mutationKey: ["createPost"];
```

### 3. Invalidation Strategy

```tsx
// Be specific about what to invalidate
invalidateQueries: [
  ["posts"], // All posts queries
  ["user", userId, "posts"], // Specific user's posts
];

// Or use partial matching
queryClient.invalidateQueries({
  queryKey: ["posts"],
  exact: false, // Invalidates all queries starting with ['posts']
});
```

### 4. Optimistic Updates

Only use optimistic updates for:

- Fast, reliable operations
- Operations with high success rates
- UI that benefits from immediate feedback

Avoid for:

- Complex validations
- File uploads
- Operations with side effects

## Integration with Existing Hooks

The `useServerActionWithQuery` hook provides backward compatibility:

```tsx
// Drop-in replacement for useServerAction
const { executeAction, formError, isLoading } = useServerActionWithQuery(
  action,
  {
    setError: form.setError,
    invalidateQueries: [["users"]],
  }
);
```

This allows gradual migration while gaining React Query benefits.
