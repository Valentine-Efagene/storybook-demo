
/**
 * SingleFilePicker is a wrapper for CustomFilePicker that works reliably for single file uploads with React Hook Form.
 *
 * BUG DOCUMENTATION:
 * React Hook Form's Controller can have timing issues for single file fields (File | undefined),
 * where `field.value` may be stale after calling `field.onChange(undefined)`. This causes the picker to display
 * a removed file until the next navigation or re-render. However, `useWatch` always reflects the true form state.
 *
 * Therefore, SingleFilePicker uses `useWatch` to synchronize the picker UI with the actual form state.
 *
 * Use SingleFilePicker for all single file upload fields. For multiple files, use CustomFilePicker directly.
 *
 * See: https://github.com/react-hook-form/react-hook-form/issues/1101 (related timing issue)
 */
import { Control, useWatch } from "react-hook-form";
import { CustomFilePicker } from "./CustomFilePicker";

export interface SingleFilePickerProps extends Omit<React.ComponentProps<typeof CustomFilePicker>, 'files' | 'onFilesChange' | 'allowMultiple' | 'maxFiles'> {
    control: Control<any>;
    name: string;
    onChange: (file: File | undefined) => void;
}

export function SingleFilePicker({ control, name, onChange, ...otherProps }: SingleFilePickerProps) {
    const watchedValue = useWatch({ control, name })

    return (
        <CustomFilePicker
            files={watchedValue ? [watchedValue] : []}
            onFilesChange={(files) => onChange(files[0] || undefined)}
            allowMultiple={false}
            maxFiles={1}
            {...otherProps}
        />
    )
}