import {
  CSSProperties,
} from "react";
import styles from './PhoneNumberInput.module.css'
import PhoneInput, { type Value } from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import clsx from "clsx";

export interface PhoneNumberInputProps {
  value?: Value;
  onChange?: (value?: Value) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function PhoneNumberInput({
  className,
  value,
  onChange,
  placeholder,
  disabled,
  style,
  ...props
}: PhoneNumberInputProps) {
  return (
    <PhoneInput
      {...props}
      className={clsx(className, styles.container)}
      style={style}
      value={value}
      onChange={onChange || (() => { })}
      placeholder={placeholder}
      disabled={disabled}
      international
      defaultCountry={'NG'}
    />
  );
}
