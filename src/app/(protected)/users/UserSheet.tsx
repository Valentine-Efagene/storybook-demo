"use client"

import StatusTag from "@/components/StatusTag"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import ImageHelper from "@/lib/helpers/ImageHelper"
import UserHelper from "@/lib/helpers/UserHelper"
import { User } from "@/types/user"
import { Edit2, Play } from "lucide-react"
import { useMemo } from "react"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    user: User
}

export function UserSheet({ open, setOpen, user }: Props) {
    const initials = useMemo(() => UserHelper.getInitials(user), [user])
    const fullName = useMemo(() => UserHelper.getFullName(user) || "User", [user])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="w-full sm:w-[560px] sm:max-w-[560px] p-0 gap-4">
                <SheetTitle className="py-6 border-b">
                </SheetTitle>
                <SheetHeader>
                    <SheetDescription>
                        <div className="flex flex-col gap-8 px-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-[50px] w-[50px]">
                                        <AvatarImage src={ImageHelper.getCdnLink(user?.avatar, 'avatar') ?? ''} alt={initials} />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-0">
                                        <div className="text-lg font-medium text-[var(--primary-text)]">{fullName}</div>
                                        <div className="text-sm font-normal text-[var(--secondary-text)]">{user.email}</div>
                                    </div>
                                </div>
                                <StatusTag />
                            </div>
                            <div className="flex justify-start gap-4">
                                <Button icon={<Edit2 />} iconPosition="left" variant='subtle'>Edit Details</Button>
                                <Button variant='subtle' icon={<Play />} iconPosition="left">
                                    Suspend User
                                </Button>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>
                <Separator />
                <div className="flex flex-col gap-4 px-6">
                    <div className="flex justify-between">
                        <span className="text-[var(--primary-text)] font-medium text-sm">Personal Information</span>
                        <Button size='sm' icon={<Edit2 />} iconPosition="left" variant='subtle'>
                            Edit
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    )
}
