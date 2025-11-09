import { DetailedHTMLProps, HtmlHTMLAttributes, ReactElement } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"
import { CircleQuestionMark } from "lucide-react"

type IVariant = "info" | "warn" | "danger"

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: IVariant
    icon?: ReactElement
}

const map: Record<IVariant, string> = {
    info: '#2563EB',
    warn: "#D97706",
    danger: "#DC2626",
}

export default function Info({ icon, variant = "info", children }: IProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button type="button" variant="ghost" className="p-0 w-5 h-5">
                    {icon ? (
                        icon
                    ) : (
                        <CircleQuestionMark
                            stroke={map[variant]}
                            className="w-5 h-5"
                        />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{children}</p>
            </TooltipContent>
        </Tooltip>
    )
}
