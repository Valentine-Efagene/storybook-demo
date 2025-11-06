import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Field, FieldContent } from "@/components/ui/field";
import { FormLabel } from "@/components/form/FormLabel";
import { ValidationMessage } from "@/components/form/ValidationMessage";
import { HelperText } from "@/components/form/HelperText";

export interface FormInputProps extends React.ComponentProps<"input"> {
    label?: string;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
    containerClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    ({
        label,
        error,
        helperText,
        isRequired = false,
        className,
        containerClassName,
        id,
        ...props
    }, ref) => {
        const inputId = id || React.useId();

        return (
            <Field className={cn("space-y-2", containerClassName)} data-invalid={!!error}>
                {label && (
                    <FormLabel htmlFor={inputId} isRequired={isRequired}>
                        {label}
                    </FormLabel>
                )}

                <FieldContent>
                    <Input
                        id={inputId}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${inputId}-error` :
                                helperText ? `${inputId}-helper` : undefined
                        }
                        className={cn(
                            // Base styles matching your specifications
                            "bg-white border border-[#DAE6E7] shadow-sm",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                            // Error state styles
                            error && [
                                "border-2 border-[#C6190D]",
                                "focus:border-[#C6190D] focus:ring-red-500/20",
                            ],
                            className
                        )}
                        style={{
                            boxShadow: error
                                ? '0px 2px 4px rgba(0, 0, 0, 0.04)'
                                : '0px 2px 4px rgba(0, 0, 0, 0.04)',
                            ...props.style,
                        }}
                        {...props}
                    />

                    {/* Error message */}
                    {error && (
                        <ValidationMessage id={`${inputId}-error`} type="error">
                            {error}
                        </ValidationMessage>
                    )}

                    {/* Helper text (only show if no error) */}
                    {!error && helperText && (
                        <HelperText id={`${inputId}-helper`}>
                            {helperText}
                        </HelperText>
                    )}
                </FieldContent>
            </Field>
        );
    }
);

FormInput.displayName = "FormInput";

export { FormInput };