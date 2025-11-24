import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/ui/input-group";
import { Field, FieldContent } from "@/components/ui/field";
import { FormLabel } from "@/components/form/FormLabel";
import { ValidationMessage } from "@/components/form/ValidationMessage";
import { HelperText } from "@/components/form/HelperText";
import { useDebounce } from "@/hooks/useDebounce";

export interface FormSearchInputProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, 'type' | 'onChange' | 'defaultValue'> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  containerClassName?: string;
  onClear?: () => void;
  showClearButton?: boolean;
  searchIconPosition?: "left" | "right";
  placeholder?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  debounceMs?: number;
  defaultValue?: string;
}

const FormSearchInput = React.forwardRef<
  React.ElementRef<typeof InputGroupInput>,
  FormSearchInputProps
>(({
  label,
  error,
  helperText,
  isRequired = false,
  className,
  containerClassName,
  onClear,
  showClearButton = true,
  searchIconPosition = "left",
  placeholder = "Search...",
  value,
  defaultValue,
  onChange,
  onDebouncedChange,
  debounceMs = 300,
  ...props
}, ref) => {
  const searchId = props.id || React.useId();

  // Internal state for immediate UI updates
  const [internalValue, setInternalValue] = React.useState<string>(() => {
    // Initialize with value prop, defaultValue prop, or empty string
    if (value !== undefined) {
      return typeof value === 'string' ? value : String(value || '')
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'string' ? defaultValue : String(defaultValue || '')
    }
    return ''
  });

  const hasValue = internalValue && String(internalValue).length > 0;

  // Debounced value for API calls
  const debouncedValue = useDebounce(internalValue, debounceMs);

  // Only update internal value when external value changes if this is a controlled component
  React.useEffect(() => {
    if (value !== undefined) {
      const stringValue = typeof value === 'string' ? value : String(value || '');
      setInternalValue(stringValue);
    }
  }, [value]);

  // Call onDebouncedChange when debounced value changes
  const prevDebouncedValueRef = React.useRef(debouncedValue);
  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    // Skip the initial render to avoid calling onDebouncedChange with the initial value
    if (isInitialRender.current) {
      isInitialRender.current = false;
      prevDebouncedValueRef.current = debouncedValue;
      return;
    }

    // Only call onDebouncedChange if the value actually changed
    if (onDebouncedChange && debouncedValue !== prevDebouncedValueRef.current) {
      prevDebouncedValueRef.current = debouncedValue;
      onDebouncedChange(debouncedValue);
    }
  }, [debouncedValue, onDebouncedChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    // Call immediate onChange if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) {
      onChange('');
    }
    if (onDebouncedChange) {
      onDebouncedChange('');
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <Field className={cn("space-y-2", containerClassName)} data-invalid={!!error}>
      {label && (
        <FormLabel htmlFor={searchId} isRequired={isRequired}>
          {label}
        </FormLabel>
      )}

      <InputGroup
        className={cn(
          // Error state styling
          error && [
            "border-[#C6190D]",
            "focus-within:ring-red-500/20",
            "focus-within:border-[#C6190D]",
          ]
        )}
      >
        {/* Search Icon - Left Position */}
        {searchIconPosition === "left" && (
          <InputGroupAddon align="inline-start">
            <Search className="h-4 w-4 text-gray-500" />
          </InputGroupAddon>
        )}

        {/* Search Input */}
        <InputGroupInput
          id={searchId}
          ref={ref}
          type="search"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleInputChange}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${searchId}-error` :
              helperText ? `${searchId}-helper` : undefined
          }
          className={cn(
            "placeholder:text-gray-500",
            className
          )}
          {...props}
        />

        {/* Clear Button */}
        {showClearButton && hasValue && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              onClick={handleClear}
              aria-label="Clear search"
              tabIndex={-1}
            >
              <X className="h-3.5 w-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        )}

        {/* Search Icon - Right Position */}
        {searchIconPosition === "right" && !showClearButton && (
          <InputGroupAddon align="inline-end">
            <Search className="h-4 w-4 text-gray-500" />
          </InputGroupAddon>
        )}

        {/* Search Icon - Right Position with Clear Button */}
        {searchIconPosition === "right" && showClearButton && !hasValue && (
          <InputGroupAddon align="inline-end">
            <Search className="h-4 w-4 text-gray-500" />
          </InputGroupAddon>
        )}
      </InputGroup>

      {error ? <FieldContent>
        {/* Error message */}
        {error && (
          <ValidationMessage id={`${searchId}-error`} type="error">
            {error}
          </ValidationMessage>
        )}

        {/* Helper text (only show if no error) */}
        {!error && helperText && (
          <HelperText id={`${searchId}-helper`}>
            {helperText}
          </HelperText>
        )}
      </FieldContent> : null}
    </Field>
  );
});

FormSearchInput.displayName = "FormSearchInput";

export { FormSearchInput };