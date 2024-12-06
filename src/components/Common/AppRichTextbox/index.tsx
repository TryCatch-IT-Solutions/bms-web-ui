import BulletList from '@tiptap/extension-bullet-list'
import TextColor from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { twMerge } from 'tailwind-merge'
import FontSize from 'tiptap-extension-font-size'
import { MenuBar } from './MenuBar'
import './styles.scss'
import { FontSelectMenu } from './FontSelectionMenu'
import Placeholder from '@tiptap/extension-placeholder'

interface AppRichTextBoxProps {
    name: string
    value?: string
    label?: string
    labelClassname?: string
    disabled?: boolean
    onChange: (content: string) => void
    className?: string
    isHome?: boolean
    containerClassName?: string
    secondContainerClassName?: string
    errorMessage?: string
    errorClassName?: string
    placeholder?: string
}

export const AppRichTextBox = (props: AppRichTextBoxProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                orderedList: false,
                bulletList: false,
            }),
            TextStyle,
            FontFamily,
            FontSize,
            Link.configure({
                autolink: true,
            }),
            TextColor,
            OrderedList.configure({
                keepMarks: true,
                keepAttributes: true,
                HTMLAttributes: {
                    style: 'list-style-type: decimal; padding-left: 1em; position: relative;',
                },
            }),
            BulletList.configure({
                keepMarks: true,
                keepAttributes: true,
                HTMLAttributes: {
                    style: 'list-style-type: disc; padding-left: 1em; position: relative;',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: props.placeholder,
            }),
        ],
        content: props.value,
        onUpdate: ({ editor }) =>
            props.onChange(JSON.stringify(editor.getHTML()).replace(/\\\\/g, '\\')),
    })

    // useEffect(() => {
    //     if (!editor) return
    //     if (props.disabled === undefined) return

    //     editor.setEditable(props.disabled, true)
    // }, [props.disabled])

    if (!editor) return null

    if (props.disabled != undefined) {
        editor.setEditable(!props.disabled)
    }

    return (
        <div className={twMerge('space-y-1', props.containerClassName ?? '')}>
            {props.label && (
                <label
                    htmlFor={props.name}
                    className={twMerge(
                        'block text-sm font-medium text-gray-700',
                        props.labelClassname,
                    )}
                    id={props.name}
                >
                    {props.label}
                </label>
            )}
            <div
                className={twMerge(
                    props.secondContainerClassName,
                    'max-h-[400px] overflow-y-auto border border-zentive-black',
                )}
            >
                <div
                    className={twMerge(
                        'flex flex-row border-b-2 p-1 gap-2 border-zentive-gray-medium bg-[#F7F7F7]',
                        props.disabled ? 'pointer-events-none' : '',
                    )}
                >
                    {/* pointer-events-none: to prevent clicking inside the div */}
                    <FontSelectMenu editor={editor} />
                    <MenuBar editor={editor} defaultColor={'#000000'} />
                </div>

                <EditorContent
                    name={props.name}
                    editor={editor}
                    disabled={props.disabled}
                    // contentEditable={props.disabled}
                    className={twMerge(
                        'p-2 h-[250px]',
                        props.disabled ? 'bg-gray-100' : 'bg-white',
                        props.isHome && 'bg-zentive-gray-medium',
                        props.className,
                    )}
                />

                {props.errorMessage && (
                    <p
                        className={twMerge('mt-2 text-sm text-red-600', props?.errorClassName)}
                        id={`${props.name}-error`}
                    >
                        {props.errorMessage}
                    </p>
                )}
            </div>
        </div>
    )
}
