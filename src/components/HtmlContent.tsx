import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    htmlString: string
}

export default function HtmlContent({ htmlString, ...rest }: IProps) {
    return (
        <div
            {...rest}
            dangerouslySetInnerHTML={{ __html: htmlString }}
        />
    );
}