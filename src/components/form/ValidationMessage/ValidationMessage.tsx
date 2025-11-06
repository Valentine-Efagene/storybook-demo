import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/field";
import { CircleAlert } from "lucide-react";

export interface ValidationMessageProps extends React.ComponentProps<typeof FieldError> {
    type?: 'error' | 'success' | 'info';
    showIcon?: boolean;
}

const ValidationMessage = React.forwardRef<
    React.ElementRef<typeof FieldError>,
    ValidationMessageProps
>(({ type = 'error', showIcon = true, className, children, ...props }, ref) => {
    if (!children) return null;

    const getStyles = () => {
        switch (type) {
            case 'error':
                return 'text-[#C6190D]';
            case 'success':
                return 'text-green-600';
            case 'info':
                return 'text-gray-600';
            default:
                return 'text-[#C6190D]';
        }
    };

    const getIcon = () => {
        if (!showIcon) return null;

        switch (type) {
            case 'error':
                return <CircleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />;
            case 'success':
                return <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>;
            case 'info':
                return <span className="text-gray-600 flex-shrink-0 mt-0.5">ℹ</span>;
            default:
                return <CircleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />;
        }
    };

    return (
        <FieldError
            ref={ref}
            className={cn(
                "text-sm flex items-start gap-1",
                getStyles(),
                className
            )}
            role="alert"
            aria-live="polite"
            {...props}
        >
            {getIcon()}
            <span>{children}</span>
        </FieldError>
    );
});

ValidationMessage.displayName = "ValidationMessage";

export { ValidationMessage };