import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Props {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ToggleCheckbox component reimplemented using shadcn's Switch component.
 * 
 * This component provides a toggle switch interface that was previously
 * implemented as a custom checkbox but now uses the modern Switch primitive
 * for better accessibility and consistent styling.
 * 
 * @param props - Component props extending basic switch functionality
 * @returns Switch component with project styling
 */
export default function ToggleCheckbox({
  checked,
  onChange,
  disabled,
  required,
  id,
  className,
  name,
  value,
  size = 'md',
  ...rest
}: Props) {
  // Size variants with proper thumb positioning
  const sizeVariants = {
    sm: "h-4 w-7 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-3 [&>span]:data-[state=unchecked]:translate-x-0",
    md: "h-5 w-9 [&>span]:h-4 [&>span]:w-4 [&>span]:data-[state=checked]:translate-x-4 [&>span]:data-[state=unchecked]:translate-x-0",
    lg: "h-6 w-12 [&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-6 [&>span]:data-[state=unchecked]:translate-x-0"
  };

  return (
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      className={cn(
        // Custom styling to match project's design scheme
        "data-[state=checked]:bg-sidebar-foreground data-[state=unchecked]:bg-primary-border/70",
        "focus-visible:ring-ring/20",
        // Apply size variant
        sizeVariants[size],
        className
      )}
      {...rest}
    />
  );
}
