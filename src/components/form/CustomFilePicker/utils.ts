import { FileValidationRule } from './types'

export const validateFile = (
    file: File,
    rules: FileValidationRule
): { isValid: boolean; error?: string } => {
    // Check file size
    if (rules.maxSize && file.size > rules.maxSize) {
        const maxSizeMB = (rules.maxSize / 1024 / 1024).toFixed(1)
        return {
            isValid: false,
            error: `File size must be less than ${maxSizeMB}MB`
        }
    }

    if (rules.minSize && file.size < rules.minSize) {
        const minSizeMB = (rules.minSize / 1024 / 1024).toFixed(1)
        return {
            isValid: false,
            error: `File size must be at least ${minSizeMB}MB`
        }
    }

    // Check file type
    if (rules.allowedTypes && rules.allowedTypes.length > 0) {
        const isTypeAllowed = rules.allowedTypes.some(type => {
            if (type.endsWith('/*')) {
                const baseType = type.replace('/*', '')
                return file.type.startsWith(baseType)
            }
            return file.type === type
        })

        if (!isTypeAllowed) {
            const typeList = rules.allowedTypes.join(', ')
            return {
                isValid: false,
                error: `File type not allowed. Accepted types: ${typeList}`
            }
        }
    }

    return { isValid: true }
}

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const generateFileId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            resolve('')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            resolve(e.target?.result as string)
        }
        reader.onerror = () => {
            reject(new Error('Failed to read file'))
        }
        reader.readAsDataURL(file)
    })
}