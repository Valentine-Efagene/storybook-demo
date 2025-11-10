# Pagination Component

A generic, reusable pagination component that provides page navigation and page size selection functionality.

## Features

- **Page Size Selector**: Dropdown to select number of items per page (left side)
- **Item Count Display**: Shows current range and total count (e.g., "1-20 of 100")
- **Navigation Buttons**: Previous/Next buttons with proper disabled states
- **Responsive Design**: Works well on different screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Type Safe**: Full TypeScript support

## Usage

### Basic Usage

```tsx
import { Pagination } from "@/components/ui/pagination";

function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const totalItems = 100;

  return (
    <Pagination
      currentPage={currentPage}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onPageSizeChange={setItemsPerPage}
    />
  );
}
```

### With URL State Management

```tsx
function UserTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const totalUsers = 1250; // From API

  const currentPage = Math.floor(offset / limit) + 1;

  const updateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalItems={totalUsers}
      itemsPerPage={limit}
      onPageChange={(page) => {
        const newOffset = (page - 1) * limit;
        updateParams({ offset: newOffset.toString() });
      }}
      onPageSizeChange={(pageSize) => {
        updateParams({
          limit: pageSize.toString(),
          offset: "0",
        });
      }}
    />
  );
}
```

## Props

| Prop                   | Type                         | Default             | Description                            |
| ---------------------- | ---------------------------- | ------------------- | -------------------------------------- |
| `currentPage`          | `number`                     | -                   | Current page number (1-indexed)        |
| `totalItems`           | `number`                     | -                   | Total number of items across all pages |
| `itemsPerPage`         | `number`                     | -                   | Number of items per page               |
| `onPageChange`         | `(page: number) => void`     | -                   | Callback when page changes             |
| `onPageSizeChange`     | `(pageSize: number) => void` | -                   | Callback when page size changes        |
| `pageSizeOptions`      | `number[]`                   | `[10, 20, 50, 100]` | Available page size options            |
| `showPageSizeSelector` | `boolean`                    | `true`              | Whether to show the page size selector |
| `className`            | `string`                     | -                   | Additional CSS classes                 |

## Behavior

### Page Size Changes

- When page size changes, the component automatically adjusts the current page if necessary
- If the current page would exceed the new total pages, it resets to the last valid page

### Edge Cases

- **No items**: Shows "No items" message and disables navigation
- **Single page**: Disables both navigation buttons
- **Last page**: Disables "Next" button
- **First page**: Disables "Previous" button

### Calculations

- **Start item**: `(currentPage - 1) * itemsPerPage + 1`
- **End item**: `min(currentPage * itemsPerPage, totalItems)`
- **Total pages**: `ceil(totalItems / itemsPerPage)`

## Examples

### Different Scenarios

```tsx
// Large dataset
<Pagination
  currentPage={5}
  totalItems={1250}
  itemsPerPage={25}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
// Shows: "101-125 of 1250"

// Small dataset
<Pagination
  currentPage={1}
  totalItems={8}
  itemsPerPage={10}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
// Shows: "1-8 of 8" (single page)

// No items
<Pagination
  currentPage={1}
  totalItems={0}
  itemsPerPage={10}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
// Shows: "No items"
```

### Custom Page Sizes

```tsx
<Pagination
  currentPage={1}
  totalItems={100}
  itemsPerPage={15}
  pageSizeOptions={[5, 15, 25, 50]}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
```

### Without Page Size Selector

```tsx
<Pagination
  currentPage={3}
  totalItems={100}
  itemsPerPage={10}
  showPageSizeSelector={false}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
/>
```

## Styling

The component uses Tailwind classes and can be customized via the `className` prop:

```tsx
<Pagination
  className="border-t pt-4"
  // ... other props
/>
```

## Accessibility

- Navigation buttons have proper `aria-label` attributes
- Disabled states are properly conveyed to screen readers
- Keyboard navigation works out of the box
- Select dropdown is fully accessible

## Integration with Data Tables

The component is designed to work seamlessly with data tables and API pagination:

1. Use the `onPageChange` callback to update your API query offset
2. Use the `onPageSizeChange` callback to update your API query limit
3. The component handles all the math for you (calculating ranges, page counts, etc.)
