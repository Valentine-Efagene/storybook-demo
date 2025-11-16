"use client"

import DetailCard from "@/components/DetailCard"
import StatusTag from "@/components/StatusTag"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet"
import ImageHelper from "@/lib/helpers/ImageHelper"
import UserHelper from "@/lib/helpers/UserHelper"
import { User } from "@/types/user"
import { Edit2, Play, X } from "lucide-react"
import { useMemo, useState } from "react"
import UserSuspensionModal from "./UserSuspensionModal"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    contribution: User
}

export function ContributionsSheet({ open, setOpen, contribution }: Props) {
    const [openSuspensionDialog, setOpenSuspensionDialog] = useState(false)
    const initials = useMemo(() => UserHelper.getInitials(contribution), [contribution])
    const fullName = useMemo(() => UserHelper.getFullName(contribution) || "User", [contribution])

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
                <div className="flex flex-col gap-8 px-6">
                    <UserSuspensionModal
                        open={openSuspensionDialog}
                        setOpen={setOpenSuspensionDialog}
                        user={contribution}
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-[50px] w-[50px]">
                                <AvatarImage src={ImageHelper.getCdnLink(contribution?.avatar, 'avatar') ?? ''} alt={initials} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0">
                                <div className="text-lg font-medium text-[var(--primary-text)]">{fullName}</div>
                                <div className="text-sm font-normal text-[var(--secondary-text)]">{contribution.email}</div>
                            </div>
                        </div>
                        <StatusTag />
                    </div>
                    <div className="flex justify-start gap-4">
                        <Button icon={<Edit2 />} iconPosition="left" variant='subtle'>Edit Details</Button>
                        <Button variant='subtle' onClick={() => setOpenSuspensionDialog(true)} className="text-destructive" icon={<Play />} iconPosition="left">
                            Suspend User
                        </Button>
                    </div>
                </div>
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
                            <DetailCard label="First Name" value={contribution.first_name} />
                            <DetailCard label="Last Name" value={contribution.last_name} />
                            <DetailCard label="Email" type="email" nChars={20} value={contribution.email} />
                            <DetailCard label="Phone Number" value={contribution.phone} />
                            <DetailCard label="BVN" value={contribution.bvn} />
                            <DetailCard label="Government Issues ID" nChars={20} value={contribution.identity_document} />
                            <DetailCard label="Country of Residence" value={contribution.country} />
                            <DetailCard label="City" value={contribution.address} />
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
                            <DetailCard label="Occupation" value={contribution.job_title} />
                            <DetailCard label="Company Name" value={contribution.name_of_employer} />
                            <DetailCard label="Salary Range" nChars={20} value={contribution.monthly_net_salary} />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    )
}
