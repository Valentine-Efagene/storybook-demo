"use client"

import React, { useState, useCallback, useRef } from 'react'
import { Upload, X, FileText, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CustomFilePickerProps, FileItem } from './types'
import { validateFile, formatFileSize, generateFileId, createFilePreview } from './utils'

export function CustomFilePicker({
    files = [],
    onFilesChange,
    allowMultiple = false,
    maxFiles = allowMultiple ? 10 : 1,
    maxFileSize = 10, // 10MB default
    allowedTypes = ['image/*'],
    className,
    disabled = false,
    label = 'Upload files',
    description,
    showPreview = true,
    showFileSize = true,
    accept = 'image/*',
    onError
}: CustomFilePickerProps) {
    const [fileItems, setFileItems] = useState<FileItem[]>([])
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Convert File[] to FileItem[] on mount and when files prop changes
    React.useEffect(() => {
        const convertFilesToItems = async () => {
            // Create a map of existing items for quick lookup
            const existingItemsMap = new Map(
                fileItems.map(item => [
                    `${item.file.name}-${item.file.size}-${item.file.lastModified}`,
                    item
                ])
            )

            const newItems: FileItem[] = []

            for (const file of files) {
                const fileKey = `${file.name}-${file.size}-${file.lastModified}`
                const existingItem = existingItemsMap.get(fileKey)

                if (existingItem) {
                    // Keep existing item with its current state
                    newItems.push(existingItem)
                } else {
                    // Create new item
                    const newItem: FileItem = {
                        id: generateFileId(),
                        file,
                        loading: showPreview && file.type.startsWith('image/'),
                        preview: undefined
                    }

                    newItems.push(newItem)

                    // Generate preview asynchronously for images
                    if (showPreview && file.type.startsWith('image/')) {
                        createFilePreview(file)
                            .then(preview => {
                                setFileItems(currentItems =>
                                    currentItems.map(item =>
                                        item.id === newItem.id
                                            ? { ...item, preview, loading: false }
                                            : item
                                    )
                                )
                            })
                            .catch(() => {
                                setFileItems(currentItems =>
                                    currentItems.map(item =>
                                        item.id === newItem.id
                                            ? { ...item, loading: false, error: 'Failed to load preview' }
                                            : item
                                    )
                                )
                            })
                    }
                }
            }

            setFileItems(newItems)
        }

        convertFilesToItems()
    }, [files, showPreview]) // Removed fileItems dependency

    const handleFiles = useCallback((newFiles: File[]) => {
        const validationRules = {
            maxSize: maxFileSize * 1024 * 1024, // Convert MB to bytes
            allowedTypes,
            maxFiles
        }

        const validFiles: File[] = []
        const errors: string[] = []

        for (const file of newFiles) {
            // Check if we're at max files (for new files)
            if (!allowMultiple && files.length + validFiles.length >= 1) {
                break
            }

            if (allowMultiple && files.length + validFiles.length >= maxFiles) {
                errors.push(`Maximum ${maxFiles} files allowed`)
                break
            }

            // Check if file already exists
            const isDuplicate = files.some(existingFile =>
                existingFile.name === file.name &&
                existingFile.size === file.size &&
                existingFile.lastModified === file.lastModified
            )

            if (isDuplicate) {
                errors.push(`File "${file.name}" is already selected`)
                continue
            }

            // Validate file
            const validation = validateFile(file, validationRules)
            if (!validation.isValid) {
                errors.push(`${file.name}: ${validation.error}`)
                continue
            }

            validFiles.push(file)
        }

        // Report errors
        if (errors.length > 0 && onError) {
            onError(errors.join(', '))
        }

        // Update files
        if (validFiles.length > 0) {
            const updatedFiles = allowMultiple
                ? [...files, ...validFiles]
                : validFiles

            onFilesChange(updatedFiles)
        }
    }, [files, onFilesChange, allowMultiple, maxFiles, maxFileSize, allowedTypes, onError])

    const removeFile = useCallback((fileToRemove: File) => {
        const updatedFiles = files.filter(file =>
            !(file.name === fileToRemove.name &&
                file.size === fileToRemove.size &&
                file.lastModified === fileToRemove.lastModified)
        )
        onFilesChange(updatedFiles)
    }, [files, onFilesChange])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)

        if (disabled) return

        const droppedFiles = Array.from(e.dataTransfer.files)
        handleFiles(droppedFiles)
    }, [handleFiles, disabled])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        if (!disabled) {
            setDragActive(true)
        }
    }, [disabled])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)
    }, [])

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        handleFiles(selectedFiles)

        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }, [handleFiles])

    const openFileDialog = useCallback(() => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }, [disabled])

    return (
        <div className={cn("w-full", className)}>
            {/* File Input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple={allowMultiple}
                accept={accept}
                onChange={handleFileInputChange}
                className="hidden"
                disabled={disabled}
            />

            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={openFileDialog}
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
                    "hover:border-gray-400 hover:bg-gray-50",
                    dragActive && "border-blue-400 bg-blue-50",
                    disabled && "cursor-not-allowed opacity-50",
                    files.length === 0 && "min-h-[200px] flex items-center justify-center"
                )}
            >
                <div className="space-y-4">
                    <div className="text-gray-500">
                        <Upload className="mx-auto h-12 w-12" />
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{label}</h3>
                        {description && (
                            <p className="text-gray-600 mt-1">{description}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                            {allowMultiple
                                ? `Drop files here or click to browse (max ${maxFiles} files)`
                                : 'Drop a file here or click to browse'
                            }
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Max file size: {maxFileSize}MB • Supported: {allowedTypes.join(', ')}
                        </p>
                    </div>
                </div>
            </div>

            {/* File List */}
            {fileItems.length > 0 && (
                <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">
                        Selected Files ({fileItems.length})
                    </h4>

                    <div className="space-y-2">
                        {fileItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
                            >
                                {/* Preview or Icon */}
                                <div className="flex-shrink-0">
                                    {item.loading ? (
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                                        </div>
                                    ) : item.preview ? (
                                        <img
                                            src={item.preview}
                                            alt={item.file.name}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.file.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {showFileSize && (
                                            <span className="text-xs text-gray-500">
                                                {formatFileSize(item.file.size)}
                                            </span>
                                        )}
                                        {item.error && (
                                            <div className="flex items-center gap-1 text-xs text-red-600">
                                                <AlertCircle className="h-3 w-3" />
                                                {item.error}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(item.file)
                                    }}
                                    disabled={disabled}
                                    className="flex-shrink-0 h-8 w-8 p-0"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}