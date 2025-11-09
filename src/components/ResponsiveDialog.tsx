
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { PropsWithChildren, ReactNode } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import Info from "./Info";
import { Button } from "./ui/button";

interface IProps extends PropsWithChildren {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerText?: string;
    description?: ReactNode;
    title?: string;
    triggerButton?: ReactNode;
    info?: ReactNode;
    triggerIcon?: ReactNode;
    noTrigger?: boolean;
    dialogContentClassName?: string
}

export function ResponsiveDialog({ open, setOpen, noTrigger, triggerButton, dialogContentClassName, children, triggerIcon, triggerText, description, title, info }: IProps) {
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
                <DialogContent className={`${dialogContentClassName}`}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {children}
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
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}