import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/ui/field";
import styles from './FormLabel.module.css';

export interface FormLabelProps extends React.ComponentProps<typeof FieldLabel> {
    isRequired?: boolean;
    children: React.ReactNode;
}

const FormLabel = React.forwardRef<
    React.ElementRef<typeof FieldLabel>,
    FormLabelProps
>(({ isRequired = false, className, children, ...props }, ref) => {
    return (
        <FieldLabel
            ref={ref}
            className={cn(styles.formLabel, className)}
            {...props}
        >
            {children}
            {isRequired && <span className={styles.required}>*</span>}
        </FieldLabel>
    );
});

FormLabel.displayName = "FormLabel";

export { FormLabel };