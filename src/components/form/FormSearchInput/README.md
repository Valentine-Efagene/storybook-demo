# FormSearchInput with Debouncing

## Overview

The `FormSearchInput` component now includes built-in debouncing functionality to optimize API calls when users type in search queries. This prevents excessive API requests while maintaining a responsive user experience.

## Key Features

### ✅ Debounced API Calls

- **Default delay**: 300ms (customizable)
- **Immediate UI updates**: Input value updates instantly
- **Optimized requests**: API calls only triggered after user stops typing

### ✅ Flexible Event Handling

- `onChange`: Called immediately on every keystroke (for UI updates)
- `onDebouncedChange`: Called after debounce delay (for API calls)

### ✅ Built-in Clear Functionality

- Clear button resets both immediate and debounced values
- Calls both `onChange` and `onDebouncedChange` with empty string

## Props

```typescript
interface FormSearchInputProps {
  // Standard form input props
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  placeholder?: string;
  value?: string;

  // Debouncing props
  onChange?: (value: string) => void; // Immediate callback
  onDebouncedChange?: (value: string) => void; // Debounced callback
  debounceMs?: number; // Delay in milliseconds (default: 300)

  // UI customization
  onClear?: () => void;
  showClearButton?: boolean;
  searchIconPosition?: "left" | "right";
  containerClassName?: string;
}
```

## Usage Examples

### Basic Usage

```tsx
import { FormSearchInput } from "@/components/form/FormSearchInput/FormSearchInput";

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      // This will only be called after user stops typing for 300ms
      const results = await searchAPI(query);
      setSearchResults(results);
    }
  };

  return (
    <FormSearchInput
      label="Search Users"
      placeholder="Type to search..."
      value={searchQuery}
      onChange={setSearchQuery} // Updates immediately
      onDebouncedChange={handleSearch} // Debounced API call
      debounceMs={300} // Custom delay
    />
  );
}
```

### With Loading States

```tsx
function SearchWithLoading() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDebouncedSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchAPI(searchQuery);
      setResults(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    // Show loading immediately when user types
    if (value.trim() && !isLoading) {
      setIsLoading(true);
    }
  };

  return (
    <FormSearchInput
      value={query}
      onChange={handleInputChange}
      onDebouncedChange={handleDebouncedSearch}
      helperText={isLoading ? "Searching..." : "Type to search"}
    />
  );
}
```

### Using the useDebouncedSearch Hook

```tsx
import { useDebouncedSearch } from "@/hooks/useDebounce";

function SearchWithHook() {
  const { searchValue, setSearchValue, isDebouncing, clearSearch } =
    useDebouncedSearch(
      "",
      (query) => {
        // This function is automatically debounced
        searchAPI(query);
      },
      300 // debounce delay
    );

  return (
    <FormSearchInput
      value={searchValue}
      onChange={setSearchValue}
      onClear={clearSearch}
      helperText={isDebouncing ? "Searching..." : "Type to search"}
    />
  );
}
```

## Best Practices

### 1. Choose Appropriate Debounce Delays

- **Fast searches**: 100-200ms for instant feedback
- **API searches**: 300-500ms to reduce server load
- **Heavy operations**: 500-1000ms for expensive queries

### 2. Provide User Feedback

- Show loading states during debounce period
- Update helper text to indicate search status
- Clear results when search is cleared

### 3. Handle Edge Cases

- Empty queries should clear results
- Handle API errors gracefully
- Provide fallback states for no results

### 4. Optimize Performance

- Use React.memo for search result components
- Implement result virtualization for large lists
- Cache recent search results when appropriate

## API Integration Example

```tsx
// With your existing API structure
import { fetchUsers } from "@/lib/api";

function UserSearchPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetchUsers({ search: query });
      setUsers(response.body?.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormSearchInput
      label="Search Users"
      placeholder="Search by name or email..."
      onDebouncedChange={searchUsers}
      debounceMs={300}
      helperText="Start typing to search users"
    />
  );
}
```

## Benefits

1. **Reduced API Calls**: Prevents excessive requests during fast typing
2. **Better Performance**: Debouncing reduces server load and improves response time
3. **Improved UX**: Immediate visual feedback with optimized backend calls
4. **Flexible**: Customizable delays for different use cases
5. **Type Safe**: Full TypeScript support with proper event handling
