import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./TableWrapper.module.css";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function TableWrapper({ className, ...rest }: IProps) {
  return <div {...rest} className={`${className} ${styles.container}`}></div>;
}
