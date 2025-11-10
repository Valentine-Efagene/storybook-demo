import { DetailedHTMLProps, HTMLAttributes } from "react";

export function FormGroup(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div {...props} className={`${props.className} flex flex-col gap-2`} />
  );
}
