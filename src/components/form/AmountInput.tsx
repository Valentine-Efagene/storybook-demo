import React, { forwardRef } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '../ui/input-group';

interface AmountInputProps extends Omit<React.ComponentProps<"input">, 'type' | 'value' | 'onChange'> {
    value?: number | string | null;
    onChange?: (value: number | null) => void;
    onValueChange?: (formattedValue: string, numericValue: number | null) => void;
    placeholder?: string;
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
    (
        {
            className,
            value,
            onChange,
            onValueChange,
            placeholder = "0.00",
            disabled,
            min = 0,
            ...props
        },
        ref
    ) => {
        return (
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>₦</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput {...props} type='number' min={min} ref={ref} placeholder="0.00" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>NGN</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        );
    }
);

AmountInput.displayName = "AmountInput";

export default AmountInput;
export type { AmountInputProps };