import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { Field, FieldContent } from "@/components/ui/field";
import { FormLabel } from "@/components/form/FormLabel";
import { ValidationMessage } from "@/components/form/ValidationMessage";
import { HelperText } from "@/components/form/HelperText";

export interface FormPasswordInputProps
    extends Omit<React.ComponentProps<typeof InputGroupInput>, 'type'> {
    label?: string;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
    containerClassName?: string;
    showToggle?: boolean;
    placeholder?: string;
}

const FormPasswordInput = React.forwardRef<
    React.ElementRef<typeof InputGroupInput>,
    FormPasswordInputProps
>(({
    label,
    error,
    helperText,
    isRequired = false,
    className,
    containerClassName,
    showToggle = true,
    placeholder = "Enter your password",
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const passwordId = props.id || React.useId();

    return (
        <Field className={cn("", containerClassName)} data-invalid={!!error}>
            {label && (
                <FormLabel htmlFor={passwordId} isRequired={isRequired}>
                    {label}
                </FormLabel>
            )}

            <InputGroup
                className={cn("overflow-hidden",
                    // Error state styling
                    error && [
                        "border-[#C6190D]",
                        "focus-within:ring-red-500/20",
                        "focus-within:border-[#C6190D]",
                    ]
                )}
            >
                {/* Password Input */}
                <InputGroupInput
                    id={passwordId}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${passwordId}-error` :
                            helperText ? `${passwordId}-helper` : undefined
                    }
                    className={cn(
                        "placeholder:text-gray-500",
                        className
                    )}
                    {...props}
                />

                {/* Toggle Button */}
                {showToggle && (
                    <InputGroupAddon align="inline-end" className="pr-3">
                        <Toggle
                            pressed={showPassword}
                            onPressedChange={setShowPassword}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            variant="default"
                            size="sm"
                            className={cn(
                                "h-7 w-7 p-0 border-0 bg-transparent hover:bg-gray-100 rounded",
                                "data-[state=on]:bg-gray-100 data-[state=on]:text-gray-700",
                                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
                            )}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Toggle>
                    </InputGroupAddon>
                )}
            </InputGroup>

            <FieldContent>
                {/* Error message */}
                {error && (
                    <ValidationMessage id={`${passwordId}-error`} type="error">
                        {error}
                    </ValidationMessage>
                )}

                {/* Helper text (only show if no error) */}
                {!error && helperText && (
                    <HelperText id={`${passwordId}-helper`}>
                        {helperText}
                    </HelperText>
                )}
            </FieldContent>
        </Field>
    );
});

FormPasswordInput.displayName = "FormPasswordInput";

export { FormPasswordInput };