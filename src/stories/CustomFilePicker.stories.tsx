import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { CustomFilePicker } from '@/components/form/CustomFilePicker'

const meta: Meta<typeof CustomFilePicker> = {
    title: 'Form/Custom File Picker',
    component: CustomFilePicker,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        allowMultiple: {
            control: 'boolean',
            description: 'Allow selecting multiple files'
        },
        maxFiles: {
            control: 'number',
            description: 'Maximum number of files allowed'
        },
        maxFileSize: {
            control: 'number',
            description: 'Maximum file size in MB'
        },
        allowedTypes: {
            control: 'object',
            description: 'Array of allowed MIME types'
        },
        showPreview: {
            control: 'boolean',
            description: 'Show image previews'
        },
        showFileSize: {
            control: 'boolean',
            description: 'Show file sizes'
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the file picker'
        }
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Interactive wrapper component for stories
function InteractiveFilePicker(props: any) {
    const [files, setFiles] = useState<File[]>([])
    const [error, setError] = useState<string>('')

    return (
        <div className="space-y-4">
            <CustomFilePicker
                {...props}
                files={files}
                onFilesChange={setFiles}
                onError={setError}
            />
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">Error: {error}</p>
                </div>
            )}
            {files.length > 0 && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                    <ul className="text-xs space-y-1">
                        {files.map((file, index) => (
                            <li key={index}>
                                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export const Default: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: false,
        maxFiles: 1,
        maxFileSize: 10,
        allowedTypes: ['image/*'],
        label: 'Upload files',
        description: 'Select files to upload',
        showPreview: true,
        showFileSize: true,
        disabled: false,
        accept: 'image/*'
    },
}

export const MultipleFiles: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: true,
        maxFiles: 5,
        maxFileSize: 10,
        allowedTypes: ['image/*'],
        label: 'Upload multiple images',
        description: 'You can select up to 5 images',
        showPreview: true,
        showFileSize: true,
        disabled: false,
        accept: 'image/*'
    },
}

export const LargeFiles: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: true,
        maxFiles: 3,
        maxFileSize: 50,
        allowedTypes: ['image/*', 'video/*'],
        label: 'Upload large media files',
        description: 'Upload images or videos up to 50MB each',
        showPreview: true,
        showFileSize: true,
        disabled: false,
        accept: 'image/*,video/*'
    },
}

export const DocumentUpload: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: true,
        maxFiles: 10,
        maxFileSize: 5,
        allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        label: 'Upload documents',
        description: 'Upload PDF, DOC, or DOCX files',
        showPreview: false,
        showFileSize: true,
        disabled: false,
        accept: '.pdf,.doc,.docx'
    },
}

export const Disabled: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: false,
        maxFiles: 1,
        maxFileSize: 10,
        allowedTypes: ['image/*'],
        label: 'Upload disabled',
        description: 'This file picker is disabled',
        showPreview: true,
        showFileSize: true,
        disabled: true,
        accept: 'image/*'
    },
}

export const SmallFileLimit: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: true,
        maxFiles: 5,
        maxFileSize: 1,
        allowedTypes: ['image/*'],
        label: 'Small files only',
        description: 'Maximum 1MB per file to test size validation',
        showPreview: true,
        showFileSize: true,
        disabled: false,
        accept: 'image/*'
    },
}

export const WithoutPreview: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: true,
        maxFiles: 5,
        maxFileSize: 10,
        allowedTypes: ['image/*'],
        label: 'No preview mode',
        description: 'File picker without image previews',
        showPreview: false,
        showFileSize: true,
        disabled: false,
        accept: 'image/*'
    },
}

export const PropertyGallery: Story = {
    render: (args) => <InteractiveFilePicker {...args} />,
    args: {
        allowMultiple: true,
        maxFiles: 10,
        maxFileSize: 10,
        allowedTypes: ['image/*'],
        label: 'Property Images',
        description: 'Upload images for your property listing',
        showPreview: true,
        showFileSize: true,
        disabled: false,
        accept: 'image/*'
    },
}