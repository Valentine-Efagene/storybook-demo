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
import { DetailedHTMLProps } from "react";
import NextImage from "@/components/NextImage";
import Link from "next/link";

interface Props extends Omit<DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
    message?: string;
    description?: string;
}

export function EmptyProperty({ message, description }: Props) {
    return (
        <div className="h-full w-full flex-1 border rounded-lg flex items-center justify-center sm:min-h-[calc(100vh-20rem)]">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia className="p-[1rem] bg-secondary-bg rounded-lg">
                        <NextImage
                            width={100}
                            height={100}
                            src="/img/property_empty.svg" alt="Empty Property" className="w-[100px] h-[100px]"
                        />
                    </EmptyMedia>
                    <EmptyTitle className="max-w-[15ch] font-semibold text-sm">{message}</EmptyTitle>
                    <EmptyDescription className="max-w-[37ch] text-sm text-secondary-text">
                        {description}
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button asChild className="">
                        <Link href="/properties/create">Add Property</Link>
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    )
}
