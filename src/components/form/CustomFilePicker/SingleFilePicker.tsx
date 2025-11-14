import { Control, useWatch } from "react-hook-form";
import { CustomFilePicker } from "./CustomFilePicker";

interface SingleFilePickerProps extends Omit<React.ComponentProps<typeof CustomFilePicker>, 'files' | 'onFilesChange' | 'allowMultiple' | 'maxFiles'> {
    control: Control<any>;
    name: string;
    onChange: (file: File | undefined) => void;
}

export function SingleFilePicker({ control, name, onChange, ...otherProps }: SingleFilePickerProps) {
    const watchedValue = useWatch({ control, name })

    return (<CustomFilePicker
        files={watchedValue ? [watchedValue] : []}
        onFilesChange={(files) => onChange(files[0] || undefined)}
        allowMultiple={false}
        maxFiles={1}
        {...otherProps}
    />
    )
}