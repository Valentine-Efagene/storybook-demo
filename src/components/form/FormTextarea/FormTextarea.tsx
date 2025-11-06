import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldContent } from "@/components/ui/field";
import { FormLabel } from "@/components/form/FormLabel";
import { ValidationMessage } from "@/components/form/ValidationMessage";
import { HelperText } from "@/components/form/HelperText";

export interface FormTextareaProps extends React.ComponentProps<"textarea"> {
    label?: string;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
    containerClassName?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
        const textareaId = id || React.useId();

        return (
            <Field className={cn("space-y-2", containerClassName)} data-invalid={!!error}>
                {label && (
                    <FormLabel htmlFor={textareaId} isRequired={isRequired}>
                        {label}
                    </FormLabel>
                )}

                <FieldContent>
                    <Textarea
                        id={textareaId}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${textareaId}-error` :
                                helperText ? `${textareaId}-helper` : undefined
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
                        <ValidationMessage id={`${textareaId}-error`} type="error">
                            {error}
                        </ValidationMessage>
                    )}

                    {/* Helper text (only show if no error) */}
                    {!error && helperText && (
                        <HelperText id={`${textareaId}-helper`}>
                            {helperText}
                        </HelperText>
                    )}
                </FieldContent>
            </Field>
        );
    }
);

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };