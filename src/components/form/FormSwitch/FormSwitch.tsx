import * as React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Field, FieldContent } from "@/components/ui/field";
import { FormLabel } from "@/components/form/FormLabel";
import { ValidationMessage } from "@/components/form/ValidationMessage";
import { HelperText } from "@/components/form/HelperText";

export interface FormSwitchProps extends React.ComponentProps<typeof Switch> {
    label?: string;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
    containerClassName?: string;
    labelPosition?: "left" | "right";
}

const FormSwitch = React.forwardRef<
    React.ElementRef<typeof Switch>,
    FormSwitchProps
>(({
    label,
    error,
    helperText,
    isRequired = false,
    className,
    containerClassName,
    labelPosition = "right",
    id,
    ...props
}, ref) => {
    const switchId = id || React.useId();

    return (
        <Field className={cn("space-y-2", containerClassName)} data-invalid={!!error}>
            <div className={cn(
                "flex items-center gap-3",
                labelPosition === "left" ? "flex-row-reverse" : "flex-row"
            )}>
                <Switch
                    id={switchId}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${switchId}-error` :
                            helperText ? `${switchId}-helper` : undefined
                    }
                    className={cn(
                        // Custom active state color
                        "data-[state=checked]:bg-[#0165F1]",
                        // Error state styling
                        error && [
                            "border-2 border-[#C6190D]",
                            "focus-visible:ring-red-500/20",
                        ],
                        className
                    )}
                    {...props}
                />

                {label && (
                    <FormLabel htmlFor={switchId} isRequired={isRequired} className="mb-0">
                        {label}
                    </FormLabel>
                )}
            </div>

            <FieldContent>
                {/* Error message */}
                {error && (
                    <ValidationMessage id={`${switchId}-error`} type="error">
                        {error}
                    </ValidationMessage>
                )}

                {/* Helper text (only show if no error) */}
                {!error && helperText && (
                    <HelperText id={`${switchId}-helper`}>
                        {helperText}
                    </HelperText>
                )}
            </FieldContent>
        </Field>
    );
});

FormSwitch.displayName = "FormSwitch";

export { FormSwitch };