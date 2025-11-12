"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { useCallback, useEffect } from 'react'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    Image as ImageIcon,
    Palette
} from 'lucide-react'
import styles from './TextEditor.module.css'

interface IProps {
    onChange: (e: string) => void
    defaultValue?: string | null
}

// Toolbar Button Component
const ToolbarButton = ({
    onClick,
    disabled,
    active,
    children,
    title
}: {
    onClick: () => void
    disabled?: boolean
    active?: boolean
    children: React.ReactNode
    title: string
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`${styles.toolbarButton} ${active ? styles.toolbarButtonActive : ''}`}
    >
        {children}
    </button>
)

// Color Picker Component
const ColorPicker = ({ editor }: { editor: any }) => {
    const colors = [
        '#000000', '#374151', '#6B7280', '#9CA3AF',
        '#EF4444', '#F97316', '#F59E0B', '#EAB308',
        '#22C55E', '#10B981', '#06B6D4', '#3B82F6',
        '#6366F1', '#8B5CF6', '#A855F7', '#EC4899'
    ]

    return (
        <div className={styles.colorPicker}>
            <ToolbarButton
                onClick={() => { }}
                title="Text Color"
                active={false}
            >
                <Palette size={16} />
            </ToolbarButton>
            <div className={styles.colorGrid}>
                {colors.map(color => (
                    <button
                        key={color}
                        type="button"
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color }}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                        title={color}
                    />
                ))}
                <button
                    type="button"
                    className={styles.colorSwatch}
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    title="Remove color"
                    style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)',
                        border: '1px solid #ccc'
                    }}
                />
            </div>
        </div>
    )
}

export default function TextEditor({ onChange, defaultValue }: IProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: defaultValue || '',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
    })

    useEffect(() => {
        if (editor && defaultValue && editor.getHTML() !== defaultValue) {
            editor.commands.setContent(defaultValue)
        }
    }, [editor, defaultValue])

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) return

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    const addImage = useCallback(() => {
        const url = window.prompt('Image URL')

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div className={styles.editorContainer}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
                {/* Text Formatting */}
                <div className={styles.toolbarGroup}>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        active={editor.isActive('underline')}
                        title="Underline"
                    >
                        <UnderlineIcon size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        active={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <Strikethrough size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={!editor.can().chain().focus().toggleCode().run()}
                        active={editor.isActive('code')}
                        title="Code"
                    >
                        <Code size={16} />
                    </ToolbarButton>
                </div>

                <div className={styles.toolbarDivider} />

                {/* Lists */}
                <div className={styles.toolbarGroup}>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        active={editor.isActive('blockquote')}
                        title="Quote"
                    >
                        <Quote size={16} />
                    </ToolbarButton>
                </div>

                <div className={styles.toolbarDivider} />

                {/* Alignment */}
                <div className={styles.toolbarGroup}>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        active={editor.isActive({ textAlign: 'left' })}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        active={editor.isActive({ textAlign: 'center' })}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        active={editor.isActive({ textAlign: 'right' })}
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        active={editor.isActive({ textAlign: 'justify' })}
                        title="Justify"
                    >
                        <AlignJustify size={16} />
                    </ToolbarButton>
                </div>

                <div className={styles.toolbarDivider} />

                {/* Media & Links */}
                <div className={styles.toolbarGroup}>
                    <ToolbarButton
                        onClick={setLink}
                        active={editor.isActive('link')}
                        title="Add Link"
                    >
                        <LinkIcon size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={addImage}
                        title="Add Image"
                    >
                        <ImageIcon size={16} />
                    </ToolbarButton>

                    <ColorPicker editor={editor} />
                </div>

                <div className={styles.toolbarDivider} />

                {/* History */}
                <div className={styles.toolbarGroup}>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        title="Undo"
                    >
                        <Undo size={16} />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        title="Redo"
                    >
                        <Redo size={16} />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className={styles.editor}
            />
        </div>
    )
}