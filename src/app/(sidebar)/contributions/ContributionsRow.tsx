"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TableCell, TableRow } from "@/components/ui/table"
import ImageHelper from "@/lib/helpers/ImageHelper"
import dataHelper from "@/lib/helpers/UserHelper"
import { User } from "@/types/user"
import { format } from "date-fns"
import { useState } from "react"
import { ContributionsSheet } from "./ContributionsSheet"
import StatusTag from "@/components/StatusTag"

interface ContributionsRowProps {
    data: User
}

export default function ContributionsRow({ data }: ContributionsRowProps) {
    const [openSheet, setOpenSheet] = useState<boolean>(false)

    return (
        <>
            <ContributionsSheet contribution={data} open={openSheet} setOpen={setOpenSheet} />
            <TableRow onClick={() => setOpenSheet(true)} className="cursor-pointer hover:bg-[var(--table-row-hover-bg)]">
                <TableCell className="font-medium">
                    <div className="flex items-center gap-2 pl-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={ImageHelper.getCdnLink(data?.avatar, 'avatar') ?? ''} alt={data?.first_name || "data"} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {dataHelper.getInitials(data)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="text-sm font-normal text-[var(--primary-text)]">{dataHelper.getFullName(data) || "data"}</div>
                            <div className="text-sm font-normal text-[var(--secondary-text)]">{data.email}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell><StatusTag /></TableCell>
                <TableCell className="text-sm font-normal text-[var(--primary-text)]">{data.created_at ? format(new Date(data.created_at), "PPP") : ''}</TableCell>
            </TableRow>
        </>
    )
}
