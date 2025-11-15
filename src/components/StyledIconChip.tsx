import { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    label: string;
}

export default function StyledIconChip({ icon, label }: Props) {
    return (
        <div className="border border-primary-border rounded-[100px] h-fit py-1 px-2 flex items-center gap-2 flex-nowrap">
            {icon}
            <div className="text-[11px] font-medium text-primary-text whitespace-nowrap">{label}</div>
        </div>
    )
}
