import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./TextLimit.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  nChars?: number
}

// Reason for  nesting: Width does not work on an inline element, and if you put the flex on the text, it just clips the content.
export default function TextLimit({ children, nChars, style, ...rest }: IProps) {
  const maxWidthStyle = nChars ? {
    maxWidth: `${nChars}ch`
  } : {}

  return (
    <span className="flex">
      <span  {...rest} className={`${rest.className} ${styles.container}`} style={{ ...style, ...maxWidthStyle }}>
        {children}
      </span>
    </span>
  );
}
