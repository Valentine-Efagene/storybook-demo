export interface FileItem {
    id: string
    file: File
    preview?: string
    loading: boolean
    error?: string
    progress?: number
}

export interface FileValidationRule {
    maxSize?: number // in bytes
    minSize?: number // in bytes
    allowedTypes?: string[] // mime types
    maxFiles?: number
}

export interface CustomFilePickerProps {
    files: File[]
    onFilesChange: (files: File[]) => void
    allowMultiple?: boolean
    maxFiles?: number
    maxFileSize?: number // in MB
    allowedTypes?: string[]
    className?: string
    disabled?: boolean
    label?: string
    description?: string
    showPreview?: boolean
    showFileSize?: boolean
    accept?: string
    onError?: (error: string) => void
}