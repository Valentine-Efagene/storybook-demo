import React, { forwardRef, ReactNode } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '../ui/input-group';

interface NumberInputProps extends Omit<React.ComponentProps<"input">, 'type' | 'value' | 'onChange'> {
    value?: number | string | null;
    onChange?: (value: number | null) => void;
    onValueChange?: (formattedValue: string, numericValue: number | null) => void;
    unitRight?: ReactNode;
    unitLeft?: ReactNode
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            className,
            value,
            onChange,
            onValueChange,
            min = 0,
            unitLeft,
            unitRight,
            ...props
        },
        ref
    ) => {
        return (
            <InputGroup className={`${className ?? ''}`}>
                {unitLeft ? <InputGroupAddon>
                    <InputGroupText>{unitLeft}</InputGroupText>
                </InputGroupAddon> : null}
                <InputGroupInput {...props} type='number' min={min} ref={ref} />
                {unitRight ? <InputGroupAddon align="inline-end">
                    <InputGroupText>{unitRight}</InputGroupText>
                </InputGroupAddon> : null}
            </InputGroup>
        );
    }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
export type { NumberInputProps };