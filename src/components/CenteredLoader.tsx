"use client"

import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Spinner } from "./ui/spinner";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function CenteredLoader({ size, className, ...rest }: IProps) {
    return (
        <div {...rest} className={`flex h-full flex-1 justify-center items-center ${className}`}><Spinner size={size} /></div>
    )
}
