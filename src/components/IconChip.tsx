import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Props {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    label: string;
}

export default function IconChip({ icon: Icon, label }: Props) {
    return (
        <div className="border border-primary-border rounded-[100px] h-fit py-1 px-2 flex items-center gap-2 flex-nowrap">
            <Icon className="text-secondary-text h-3 w-3" />
            <div className="text-[11px] font-medium text-primary-text whitespace-nowrap">{label}</div>
        </div>
    )
}
