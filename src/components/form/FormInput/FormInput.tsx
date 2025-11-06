import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";

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
            <div className={cn("space-y-2", containerClassName)}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-900"
                    >
                        {label}
                        {isRequired && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

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
                    <p
                        id={`${inputId}-error`}
                        className="text-sm text-[#C6190D] flex items-start gap-1"
                        role="alert"
                        aria-live="polite"
                    >
                        <span className="text-xs mt-0.5"><CircleAlert className="w-4 h-4" /></span>
                        {error}
                    </p>
                )}

                {/* Helper text (only show if no error) */}
                {!error && helperText && (
                    <p
                        id={`${inputId}-helper`}
                        className="text-sm text-gray-600"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";

export { FormInput };