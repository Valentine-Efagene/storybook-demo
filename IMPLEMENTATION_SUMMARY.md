# useGetCurrentUserFromSession Hook - Implementation Summary

## Overview

The `useGetCurrentUserFromSession` hook has been successfully implemented to fetch current user session data from the authentication system and provide it in formats suitable for different use cases.

## Features Implemented

### ✅ Core Hook (`useGetCurrentUserFromSession`)

- **Location**: `/src/hooks/useGetCurrentUserFromSession.ts`
- **Purpose**: Fetch and cache current user session data
- **Formats**: Support for both 'display' and 'full' user data formats
- **Caching**: Includes client-side localStorage cache for immediate UI response
- **Error Handling**: Proper error handling with fallback to cached data

### ✅ Display Format (default)

Returns simplified user object for UI components:

```typescript
{
    name?: string
    email?: string
    avatar?: string
    initials?: string
}
```

### ✅ Full Format

Returns complete `User` object for authorization purposes:

```typescript
User; // Full user object with roles, permissions, etc.
```

### ✅ Helper Hook (`useGetFullUserFromSession`)

- Convenience hook for getting full user object
- Used for authorization checking

### ✅ Integration with Existing Components

#### Header Component (`/src/components/Header.tsx`)

- **Before**: Used mock user data
- **After**: Uses `useGetCurrentUserFromSession()` with loading states
- **Features**: Loading skeleton, error fallback, real session data

#### ProfileDropdown Component (`/src/components/ProfileDropdown.tsx`)

- **Compatibility**: Fully compatible with simplified user format
- **Features**: Functional logout with ResponsiveDialog, error handling

#### Authorization Hook (`/src/hooks/useIsAuthorized.ts`)

- **Updated**: Now uses `useGetFullUserFromSession()`
- **Purpose**: Role-based authorization checking

### ✅ Storybook Integration

#### ProfileDropdown Stories

- **Enhanced**: Added session hook usage example
- **Location**: `/src/stories/ProfileDropdown.stories.tsx`
- **New Story**: `WithSessionHook` demonstrates hook integration

### ✅ Documentation

#### Comprehensive Examples (`/src/hooks/useGetCurrentUserFromSession.example.tsx`)

- **BasicUserProfile**: Simple usage with ProfileDropdown
- **HeaderWithUser**: Header component with session data
- **UserDashboard**: Conditional content based on auth state
- **PersonalizedContent**: Custom hook patterns
- **AdvancedUserProfile**: Hook with custom options

## Usage Examples

### 1. Basic UI Usage (ProfileDropdown)

```tsx
import { useGetCurrentUserFromSession } from "@/hooks/useGetCurrentUserFromSession";

function MyHeader() {
  const { data: user, isLoading, error } = useGetCurrentUserFromSession();

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />;
  }

  return <ProfileDropdown user={user} />;
}
```

### 2. Authorization Usage

```tsx
import { useGetFullUserFromSession } from "@/hooks/useGetCurrentUserFromSession";

function useAuth() {
  const { data: user } = useGetFullUserFromSession();

  return {
    user,
    isAdmin: user?.roles.includes("admin"),
    isSignedIn: !!user,
  };
}
```

### 3. Conditional Rendering

```tsx
function ProtectedContent() {
  const { data: user, isLoading } = useGetCurrentUserFromSession();

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <SignInPrompt />;

  return <Dashboard user={user} />;
}
```

## Configuration Options

```typescript
interface UseGetCurrentUserFromSessionOptions {
  enabled?: boolean; // Enable/disable automatic fetching
  refetchInterval?: number; // Auto-refetch interval (default: 5 minutes)
  format?: "display" | "full"; // Return format (default: 'display')
}
```

## Technical Architecture

### Data Flow

1. **Client Cache**: Check localStorage for immediate UI response
2. **Server Action**: Call `getCurrentUserFromSession()` action which:
   - Extracts user ID from JWT token in cookies
   - Calls `fetchUserById(userId)` API endpoint
3. **Data Transformation**: Convert full User object to display format
4. **Cache Update**: Update localStorage with fresh data
5. **Error Fallback**: Use cached data if server call fails

### Caching Strategy

- **React Query**: Primary caching with 5-minute default stale time
- **localStorage**: Immediate UI response cache
- **Query Keys**: Separate cache keys for 'display' vs 'full' formats

### Error Handling

- **Network Errors**: Fallback to cached client data
- **Auth Errors**: No retry attempts (401, authentication errors)
- **Other Errors**: Up to 2 retry attempts

## Integration Points

### ✅ Authentication System

- Uses existing `fetchUserProfile()` server action
- Compatible with current JWT token system
- Works with session middleware

### ✅ UI Components

- ProfileDropdown fully integrated
- Header component updated
- Loading states and error handling

### ✅ Authorization

- Compatible with existing UserHelper
- Role-based access control maintained

## Files Created/Modified

### New Files

- `/src/hooks/useGetCurrentUserFromSession.ts` - Main hook implementation
- `/src/hooks/useGetCurrentUserFromSession.example.tsx` - Usage examples
- `/src/actions/user-session.ts` - Server actions for user session management

### Modified Files

- `/src/components/Header.tsx` - Updated to use hook
- `/src/hooks/useIsAuthorized.ts` - Updated to use full user format
- `/src/stories/ProfileDropdown.stories.tsx` - Added session hook story

## Benefits

1. **Type Safety**: Proper TypeScript support with generics
2. **Performance**: Efficient caching with React Query + localStorage
3. **User Experience**: Immediate UI response with loading states
4. **Error Resilience**: Fallback strategies for network issues
5. **Flexibility**: Support for both UI display and authorization use cases
6. **Documentation**: Comprehensive examples and Storybook integration

## Recent Updates

### ✅ Refactoring (Latest)

- **Separated Client/Server Code**: Moved server logic to `/src/actions/user-session.ts`
- **JWT Token Integration**: Now extracts user ID from JWT token and uses `fetchUserById()`
- **Better Architecture**: Proper separation of concerns between client hooks and server actions
- **Improved Type Safety**: Cleaner type handling with dedicated server actions

## Next Steps

The hook is ready for production use. Consider:

1. **Testing**: Add unit tests for the hook and server actions
2. **Performance**: Monitor cache hit rates and adjust stale times if needed
3. **Enhancement**: Add user preference syncing if required
4. **Migration**: Gradually replace other user data fetching patterns

## Conclusion

The `useGetCurrentUserFromSession` hook successfully bridges the authentication system with the UI components, providing a clean, type-safe, and performant way to access current user data throughout the application.
