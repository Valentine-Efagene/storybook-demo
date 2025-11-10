interface Props {
    dotClassName?: string;
    statusText?: string;
}

export default function StatusTag({ dotClassName, statusText }: Props) {
    return (
        <div className="flex flex-nowrap gap-2 items-center text-sm font-medium text-[var(--secondary-text)] border rounded-[100px] px-2 py-1 h-fit">
            <div className={`w-2 h-2 rounded-full bg-[var(--tertiary-bg)] ${dotClassName ?? ''}`}></div>
            <div>{statusText ?? "Not Started"}</div>
        </div>
    )
}
