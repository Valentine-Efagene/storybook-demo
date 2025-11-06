import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldDescription } from "@/components/ui/field";

export interface HelperTextProps extends React.ComponentProps<typeof FieldDescription> {
    children: React.ReactNode;
}

const HelperText = React.forwardRef<
    React.ElementRef<typeof FieldDescription>,
    HelperTextProps
>(({ className, children, ...props }, ref) => {
    if (!children) return null;

    return (
        <FieldDescription
            ref={ref}
            className={cn("text-sm text-gray-600", className)}
            {...props}
        >
            {children}
        </FieldDescription>
    );
});

HelperText.displayName = "HelperText";

export { HelperText };