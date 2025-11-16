import { ArrowUpRightIcon, LucideProps, SearchSlash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { DetailedHTMLProps, ForwardRefExoticComponent, RefAttributes } from "react";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message?: string;
    description?: string;
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export function EmptyContributions({ message, description, icon: Icon, children }: Props) {
    return (
        <div className="h-full w-full flex-1 border rounded-lg flex items-center justify-center sm:min-h-[calc(100vh-20rem)]">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon" className="p-[3rem] bg-secondary-bg">
                        {Icon ? <Icon className="!size-12" /> : <SearchSlash className="!size-12" />}
                    </EmptyMedia>
                    <EmptyTitle className="max-w-[15ch] font-semibold text-sm">{message}</EmptyTitle>
                    <EmptyDescription className="max-w-[37ch] text-sm text-secondary-text">
                        {description}
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    {children}
                </EmptyContent>
            </Empty>
        </div>
    )
}
