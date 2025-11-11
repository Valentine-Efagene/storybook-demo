interface Props {
    dotClassName?: string;
    statusText?: string;
}

export default function StatusTag({ dotClassName, statusText }: Props) {
    return (
        <div className="flex flex-nowrap gap-2 items-center w-fit text-sm font-medium text-secondary-text border border-primary-border rounded-[100px] px-2 py-1 h-fit">
            <div className={`w-2 h-2 rounded-full bg-black/20 ${dotClassName ?? ''}`}></div>
            <div className="text-primary-text">{statusText ?? "Not Started"}</div>
        </div>
    )
}
