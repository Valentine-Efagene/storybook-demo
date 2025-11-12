// Mock FilePicker for Storybook
import React from 'react'

interface MockFilePickerProps {
    allowMultiple?: boolean
    allowReorder?: boolean
    maxFiles?: number
    acceptedFileTypes?: string[]
    maxFileSize?: string
    labelIdle?: string
    files?: any[]
    onupdatefiles?: (fileItems: any[]) => void
    imagePreviewHeight?: number
    imageCropAspectRatio?: string
    imageResizeTargetWidth?: number
    imageResizeTargetHeight?: number
    stylePanelLayout?: string
    styleLoadIndicatorPosition?: string
    styleButtonRemoveItemPosition?: string
    className?: string | null
}

export default function MockFilePicker({
    labelIdle = 'Drag & Drop files or Browse',
    files = [],
    onupdatefiles,
    maxFiles = 1,
    allowMultiple = false,
    ...rest
}: MockFilePickerProps) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        const fileItems = selectedFiles.map((file, index) => ({
            file,
            id: `file-${index}`,
            source: file.name,
        }))
        onupdatefiles?.(fileItems)
    }

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white hover:border-gray-400 transition-colors">
            <div className="space-y-4">
                <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900">File Upload Mock</h3>
                    <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: labelIdle.replace(/<[^>]*>/g, '') }}
                    />
                    <p className="text-sm text-gray-400">
                        {allowMultiple ? `Up to ${maxFiles} files` : 'Single file upload'}
                    </p>
                </div>

                <div>
                    <input
                        type="file"
                        multiple={allowMultiple}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="mock-file-upload"
                    />
                    <label
                        htmlFor="mock-file-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                        Choose Files
                    </label>
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Selected Files ({files.length})
                    </h4>
                    <div className="space-y-1">
                        {files.map((fileItem, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="truncate">
                                    {fileItem.file?.name || fileItem.source || `File ${index + 1}`}
                                </span>
                                <span className="text-gray-500 ml-2">
                                    {fileItem.file?.size ? `${(fileItem.file.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}