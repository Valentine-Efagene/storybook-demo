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

export interface FormSearchInputProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  containerClassName?: string;
  onClear?: () => void;
  showClearButton?: boolean;
  searchIconPosition?: "left" | "right";
  placeholder?: string;
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
  ...props
}, ref) => {
  const searchId = props.id || React.useId();
  const hasValue = value && String(value).length > 0;

  const handleClear = () => {
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
          value={value}
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

      <FieldContent>
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
      </FieldContent>
    </Field>
  );
});

FormSearchInput.displayName = "FormSearchInput";

export { FormSearchInput };