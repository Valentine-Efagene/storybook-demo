# Button Component Documentation

A comprehensive, full-featured button component with multiple variants, sizes, states, and custom styling options.

## Features

- **Multiple Variants**: Default, custom gradient, destructive, outline, secondary, ghost, and link styles
- **Flexible Sizing**: Small, default, large, custom, and icon-specific sizes
- **Loading States**: Built-in loading spinner with automatic disable
- **Icon Support**: Icons on left or right side with proper spacing
- **Full Width Option**: Expandable to container width
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Custom Gradient**: Featured blue gradient design with shadow effects
- **Disabled States**: Visual and functional disable support
- **TypeScript**: Fully typed with comprehensive prop interfaces

## Installation

The button component is built using:

- React
- Tailwind CSS
- Radix UI Slot (for polymorphic components)
- Class Variance Authority (CVA) for variant management

```bash
npm install @radix-ui/react-slot class-variance-authority
```

## Usage

### Basic Usage

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Click me</Button>;
}
```

### Custom Gradient Button (Featured)

The custom gradient button implements the specified design with:

- Linear gradient from #049DC8 to #0082B5
- Box shadow with blue tint
- 12px border radius
- Custom dimensions and spacing

```tsx
<Button variant="custom" size="custom">
  Custom Gradient Button
</Button>
```

### Custom Outline Button (Featured)

The outline button implements the specified design with:

- White background (#FFFFFF)
- Blue border (#026993)
- Light blue shadow (#B0D0FD)
- 12px border radius
- Custom dimensions

```tsx
<Button variant="outline" size="outline-lg">
  Outline Button
</Button>
```

### Custom Subtle Button (Featured)

The subtle button implements the specified design with:

- White background (#FFFFFF)
- Light gray border (#DAE6E7)
- Minimal shadow (rgba(8, 140, 193, 0.03))
- 12px border radius
- Custom dimensions

```tsx
<Button variant="subtle" size="subtle-lg">
  Subtle Button
</Button>
```

### With Icons```tsx

// Icon on the left
<Button icon={<HeartIcon />} iconPosition="left">
Like
</Button>

// Icon on the right
<Button icon={<DownloadIcon />} iconPosition="right">
Download
</Button>

````

### Loading State

```tsx
<Button loading>Loading...</Button>
````

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

### Icon Only

```tsx
<Button size="icon">
  <HeartIcon />
</Button>
```

### As Different Element

```tsx
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

## API Reference

### Props

| Prop           | Type                                                                                                       | Default     | Description                           |
| -------------- | ---------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------- |
| `variant`      | `'default' \| 'custom' \| 'destructive' \| 'outline' \| 'subtle' \| 'secondary' \| 'ghost' \| 'link'`      | `'default'` | Visual style variant                  |
| `size`         | `'default' \| 'sm' \| 'lg' \| 'custom' \| 'outline-lg' \| 'subtle-lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Size variant                          |
| `asChild`      | `boolean`                                                                                                  | `false`     | Render as child element (polymorphic) |
| `loading`      | `boolean`                                                                                                  | `false`     | Show loading spinner and disable      |
| `icon`         | `React.ReactNode`                                                                                          | `undefined` | Icon to display                       |
| `iconPosition` | `'left' \| 'right'`                                                                                        | `'left'`    | Position of icon relative to text     |
| `fullWidth`    | `boolean`                                                                                                  | `false`     | Expand to full container width        |
| `disabled`     | `boolean`                                                                                                  | `false`     | Disable the button                    |
| `className`    | `string`                                                                                                   | `undefined` | Additional CSS classes                |

Plus all standard HTML button attributes.

## Variants

### default

Standard button with primary styling

### custom (Featured)

Custom gradient button with:

- Background: `linear-gradient(180deg, #049DC8 0%, #0082B5 100%)`
- Shadow: `0px 2px 6px rgba(8, 140, 193, 0.32)`
- Border radius: `12px`
- Custom dimensions and spacing

### destructive

Red styling for dangerous actions

### outline

Custom styled outline button with:

- Background: `#FFFFFF` (white)
- Border: `1px solid #026993` (blue)
- Text color: `#026993` (blue)
- Shadow: `0px 1px 2px #B0D0FD` (light blue)
- Border radius: `12px`
- Enhanced hover and active states

### subtle

Minimal styled button with:

- Background: `#FFFFFF` (white)
- Border: `1px solid #DAE6E7` (light gray)
- Text color: `#374151` (gray-700)
- Shadow: `0px 2px 2px rgba(8, 140, 193, 0.03)` (very light blue)
- Border radius: `12px`
- Subtle hover effects

### secondary

Muted styling for secondary actions

### ghost

Minimal styling with hover effects

### link

Text-only styling with underline on hover

## Sizes

### default

Standard height (36px) with balanced padding

### sm

Small height (32px) for compact interfaces

### lg

Large height (40px) for prominent actions

### custom (Featured)

Custom dimensions matching the specified design:

- Height: 36px
- Padding: 8px 20px
- Gap: 8px
- Min-width: 82px
- Max-width: 400px

### outline-lg

Custom outline button dimensions:

- Height: 36px
- Padding: 8px 20px
- Gap: 8px
- Width: 82px (fixed)
- Min-width: 82px

### subtle-lg

Custom subtle button dimensions:

- Height: 36px
- Padding: 8px 20px
- Gap: 8px
- Width: 82px (fixed)
- Min-width: 82px

### icon variants

Square buttons optimized for icons only:

- `icon`: 36x36px
- `icon-sm`: 32x32px
- `icon-lg`: 40x40px

## Styling

The button uses Tailwind CSS classes with CSS custom properties for theming. The custom gradient variant implements the exact specifications:

```css
/* Custom variant styling */
background: linear-gradient(180deg, #049dc8 0%, #0082b5 100%);
box-shadow: 0px 2px 6px rgba(8, 140, 193, 0.32);
border-radius: 12px;
```

## Examples

### Form Actions

```tsx
<div className="flex gap-2">
  <Button variant="custom" size="custom">
    Submit
  </Button>
  <Button variant="outline">Cancel</Button>
</div>
```

### Loading Demo

```tsx
const [loading, setLoading] = useState(false);

<Button loading={loading} onClick={() => setLoading(true)}>
  {loading ? "Processing..." : "Submit"}
</Button>;
```

### Icon Combinations

```tsx
<div className="space-y-2">
  <Button icon={<CheckIcon />}>Success</Button>
  <Button icon={<XIcon />} variant="destructive">
    Error
  </Button>
  <Button icon={<LoaderIcon />} loading>
    Loading
  </Button>
</div>
```

## Accessibility

The button component includes:

- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Disabled state handling

## Browser Support

Works in all modern browsers that support:

- CSS Grid
- CSS Custom Properties
- ES2017+ JavaScript features

## Contributing

When adding new variants or sizes:

1. Update the `buttonVariants` CVA configuration
2. Add TypeScript types to `ButtonProps`
3. Update this documentation
4. Add Storybook stories for new features
5. Test accessibility compliance
