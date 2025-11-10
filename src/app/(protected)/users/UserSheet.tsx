"use client"

import DetailCard from "@/components/DetailCard"
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
import { Edit2, Play, X } from "lucide-react"
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
            <SheetContent className="w-full sm:w-[560px] sm:max-w-[560px] p-0 gap-4 [&>button]:hidden max-h-full overflow-auto">
                <SheetTitle className="py-2 border-b px-6 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(false)}
                        className="ml-auto"
                        icon={<X className="h-4 w-4" />}
                        iconPosition="left"
                    >
                        Close
                    </Button>
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
                <div className="flex flex-col gap-[3rem]">
                    <div className="flex flex-col gap-4 px-6">
                        <div className="flex justify-between">
                            <span className="text-[var(--primary-text)] font-medium text-sm">Personal Information</span>
                            <Button size='sm' icon={<Edit2 />} iconPosition="left" variant='subtle'>
                                Edit
                            </Button>
                        </div>
                        <div className="rounded-xl border p-5 grid grid-cols-2 gap-5">
                            <DetailCard label="First Name" value={user.first_name} />
                            <DetailCard label="Last Name" value={user.last_name} />
                            <DetailCard label="Email" type="email" nChars={20} value={user.email} />
                            <DetailCard label="Phone Number" value={user.phone} />
                            <DetailCard label="BVN" value={user.bvn} />
                            <DetailCard label="Government Issues ID" nChars={20} value={user.identity_document} />
                            <DetailCard label="Country of Residence" value={user.country} />
                            <DetailCard label="City" value={user.address} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 px-6">
                        <div className="flex justify-between">
                            <span className="text-[var(--primary-text)] font-medium text-sm">Employment Information</span>
                            <Button size='sm' icon={<Edit2 />} iconPosition="left" variant='subtle'>
                                Edit
                            </Button>
                        </div>
                        <div className="rounded-xl border p-5 grid grid-cols-2 gap-5">
                            <DetailCard label="Occupation" value={user.job_title} />
                            <DetailCard label="Company Name" value={user.name_of_employer} />
                            <DetailCard label="Salary Range" nChars={20} value={user.monthly_net_salary} />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    )
}
