"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TableCell, TableRow } from "@/components/ui/table"
import ImageHelper from "@/lib/helpers/ImageHelper"
import UserHelper from "@/lib/helpers/UserHelper"
import { User } from "@/types/user"
import { format } from "date-fns"
import { useState } from "react"
import { UserSheet } from "./UserSheet"
import StatusTag from "@/components/StatusTag"

interface UserRowProps {
    user: User
}

export default function UserRow({ user }: UserRowProps) {
    const [openSheet, setOpenSheet] = useState<boolean>(false)

    return (
        <>
            <UserSheet user={user} open={openSheet} setOpen={setOpenSheet} />
            <TableRow onClick={() => setOpenSheet(true)} className="cursor-pointer hover:bg-[var(--table-row-hover-bg)]">
                <TableCell className="font-medium">
                    <div className="flex items-center gap-2 pl-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={ImageHelper.getCdnLink(user?.avatar, 'avatar') ?? ''} alt={user?.first_name || "User"} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {UserHelper.getInitials(user)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-normal text-[var(--primary-text)]">{UserHelper.getFullName(user) || "User"}</div>
                            <div className="text-sm font-normal text-[var(--secondary-text)]">{user.email}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell><StatusTag /></TableCell>
                <TableCell className="text-sm font-normal text-[var(--primary-text)]">{user.created_at ? format(new Date(user.created_at), "PPP") : ''}</TableCell>
            </TableRow>
        </>
    )
}
