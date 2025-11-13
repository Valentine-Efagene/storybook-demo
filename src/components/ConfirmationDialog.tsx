
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { PropsWithChildren, ReactNode } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import Info from "./Info";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface IProps extends PropsWithChildren {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerText?: string;
    title?: string;
    triggerButton?: ReactNode;
    info?: ReactNode;
    triggerIcon?: ReactNode;
    leftButton?: ReactNode;
    rightButton?: ReactNode;
    noTrigger?: boolean;
    dialogContentClassName?: string
}

export function ConfirmationDialog({ rightButton, leftButton, open, setOpen, noTrigger, triggerButton, dialogContentClassName, children, triggerIcon, triggerText, title, info }: IProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const _trigger = triggerButton ? triggerButton : <Button iconPosition="left" icon={triggerIcon} variant="outline">{triggerText}</Button>

    const hasTrigger = (triggerButton != null || triggerText != null) && !noTrigger

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                {!hasTrigger ? null : <div className="flex gap-2 items-center">
                    <DialogTrigger asChild>
                        {_trigger}
                    </DialogTrigger>
                    {info ? <Info>{info}</Info> : null}
                </div>}
                <DialogContent className={`${dialogContentClassName} px-0 py-4`}>
                    <DialogHeader className="px-6">
                        <DialogTitle className="text-base text-primary-text font-medium">{title}</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <div className="px-6 py-1 max-h-[60vh] overflow-y-auto text-sm text-primary-text font-normal">
                        {children}
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-4 px-6">
                        <div className="flex justify-end gap-3">
                            {leftButton}
                            {rightButton}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {!hasTrigger ? null : <div className="flex gap-2 items-center">
                <DrawerTrigger asChild>
                    {_trigger}
                </DrawerTrigger>
                {info ? <Info>{info}</Info> : null}
            </div>}
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 max-h-[80vh] overflow-y-auto">
                    {children}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end gap-3">
                            {leftButton}
                            {rightButton}
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}