/* eslint-disable react-hooks/rules-of-hooks */
import { Editor } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { AiOutlineAlignCenter, AiOutlineOrderedList } from 'react-icons/ai'
import { BiFontColor, BiFontSize, BiLink, BiUnlink } from 'react-icons/bi'
import { BsJustify, BsJustifyLeft, BsJustifyRight } from 'react-icons/bs'
import { GrBlockQuote } from 'react-icons/gr'
import { ImFontSize } from 'react-icons/im'
import { MdAlternateEmail, MdFormatListBulleted } from 'react-icons/md'
import { RiFontSize2 } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'
import { MenuButton } from './MenuButton'
import { Button } from '@/components/Button'
import AppModal from '../../AppModal'

interface MenuBarProps {
    editor: Editor | null
    defaultColor?: string
}

export const MenuBar = ({ editor, defaultColor }: MenuBarProps) => {
    const [openModalLink, setOpenModalLink] = useState(false)
    const [openModalEmail, setOpenModalEmail] = useState(false)
    const [inputLinkValue, setInputLinkValue] = useState('')
    const [inputEmailValue, setInputEmailValue] = useState('')
    const [hexColor, setHexColor] = useState(defaultColor ?? '#000000')
    const [fontSize, setFontSize] = useState(16)
    const [colorClicked, setColorClicked] = useState(false)
    const colorDivRef = useRef<HTMLDivElement | null>(null)

    if (!editor) {
        return null
    }

    const getLinkAttr = () => {
        const editorAttr = editor.getAttributes('link')
        if (!editorAttr) return ''

        if (!editorAttr.href) {
            return ''
        }

        // check position of the link with https://
        if (editorAttr.href.indexOf('https://') !== 0) {
            return `https://${editorAttr.href}`
        }

        return editorAttr.href
    }

    const getColorAttr = () => {
        const editorAttr = editor.getAttributes('textStyle')
        if (!editorAttr) return defaultColor ?? '#000000'

        if (!editorAttr.color) {
            return defaultColor ?? '#000000'
        }

        return editorAttr.color
    }

    const isLinkClassHasActive = () => {
        const editorAttr = editor.getAttributes('link')
        if (!editorAttr) return false

        if (!editorAttr.class) {
            return false
        }

        if (editorAttr.class.indexOf('active-link') === -1) {
            return false
        }

        return true
    }

    const isEmailLinkClassHasActive = () => {
        const editorAttr = editor.getAttributes('link')
        if (!editorAttr) return false

        if (!editorAttr.class) {
            return false
        }

        if (editorAttr.class.indexOf('active-email') === -1) {
            return false
        }

        return true
    }

    const getEmailAttr = () => {
        const editorAttr = editor.getAttributes('link')
        if (!editorAttr) return ''

        if (!editorAttr.href) {
            return ''
        }

        // check position of the link with mailto:
        //if (editorAttr.href.indexOf('mailto:') !== 0) {
        //    return `mailto:${editorAttr.href}`
        //}

        return editorAttr.href
    }

    useEffect(() => {
        if (!editor) return
        setHexColor(getColorAttr())
    }, [editor])

    useEffect(() => {
        if (!colorClicked) return

        const handleClickOutside = (event: MouseEvent) => {
            if (colorDivRef.current && !colorDivRef.current.contains(event.target as Node)) {
                setColorClicked(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
    }, [colorClicked])

    const handleLinkInsertion = () => {
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({
                href: inputLinkValue.includes('https://')
                    ? inputLinkValue
                    : `https://${inputLinkValue}`,
            })
            .updateAttributes('link', { class: 'active-link text-[#0000EE] underline' })
            .run()
        setOpenModalLink(false)
        setInputLinkValue('')
    }

    const handleEmailInsertion = () => {
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: 'mailto:' + inputEmailValue })
            .updateAttributes('link', { class: 'active-email text-[#0000EE] underline' })
            .run()
        setOpenModalEmail(false)
        setInputEmailValue('')
    }

    const setColor = () => {
        editor
            .chain()
            .focus()
            .setColor(hexColor) // Set your desired text color here
            .run()
    }

    useEffect(() => {
        setColor()
    }, [hexColor])

    return (
        <div className='flex flex-wrap gap-2'>
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={twMerge('font-extrabold', editor.isActive('bold') ? 'bg-gray-200' : '')}
            >
                B
            </MenuButton>
            {/* Adjust font size */}
            <MenuButton
                onClick={() => {
                    setFontSize(fontSize + 2 < 1000 ? fontSize + 2 : 999)
                    editor
                        .chain()
                        .focus()
                        .setFontSize(`${fontSize + 2}pt`)
                        .run()
                }}
            >
                <ImFontSize />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    setFontSize(fontSize - 2 > 0 ? fontSize - 2 : 1)
                    editor
                        .chain()
                        .focus()
                        .setFontSize(`${fontSize - 2}pt`)
                        .run()
                }}
            >
                <RiFontSize2 />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    editor.chain().focus().setFontSize(`${fontSize}pt`).run()
                }}
            >
                <BiFontSize />
            </MenuButton>
            <input
                type='text'
                name='fontSize'
                maxLength={3}
                id='fontSize'
                onBlur={() => setFontSize(fontSize === 0 ? 12 : fontSize)}
                className='w-12 rounded-md px-3 text-xs text-gray-600 shadow-sm border outline-none'
                value={fontSize}
                onChange={(e) => {
                    const value = e.target.value
                    if (/^\d*$/.test(value)) {
                        setFontSize(Number(value))
                    }
                }}
            />
            {/* font size end */}
            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={twMerge('italic', editor.isActive('italic') ? 'bg-gray-200' : '')}
            >
                I
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={twMerge('line-through', editor.isActive('strike') ? 'bg-gray-200' : '')}
            >
                S
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
            >
                <MdFormatListBulleted />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
            >
                <AiOutlineOrderedList />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
            >
                <GrBlockQuote />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(editor.isActive({ textAlign: 'left' }) ? '' : 'left')
                        .run()
                }}
                className={
                    editor.isActive({ textAlign: 'left' })
                        ? 'bg-gray-200 cursor-pointer'
                        : 'cursor-pointer'
                }
            >
                <BsJustifyLeft />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(editor.isActive({ textAlign: 'center' }) ? '' : 'center')
                        .run()
                }}
                className={
                    editor.isActive({ textAlign: 'center' })
                        ? 'bg-gray-200 cursor-pointer'
                        : 'cursor-pointer'
                }
            >
                <AiOutlineAlignCenter />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(editor.isActive({ textAlign: 'right' }) ? '' : 'right')
                        .run()
                }}
                className={
                    editor.isActive({ textAlign: 'right' })
                        ? 'bg-gray-200 cursor-pointer'
                        : 'cursor-pointer'
                }
            >
                <BsJustifyRight />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(editor.isActive({ textAlign: 'justify' }) ? '' : 'justify')
                        .run()
                }}
                className={
                    editor.isActive({ textAlign: 'justify' })
                        ? 'bg-gray-200 cursor-pointer'
                        : 'cursor-pointer'
                }
            >
                <BsJustify />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    setOpenModalLink(true)
                    setInputLinkValue(getLinkAttr())
                }}
                className={isLinkClassHasActive() ? 'bg-gray-200' : ''}
            >
                <BiLink />
            </MenuButton>
            <MenuButton
                onClick={() => {
                    setInputEmailValue(getEmailAttr().replace('mailto:', ''))
                    setOpenModalEmail(true)
                }}
                className={isEmailLinkClassHasActive() ? 'bg-gray-200' : ''}
            >
                <MdAlternateEmail />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive('link')}
                className={'cursor-pointer'}
            >
                <BiUnlink />
            </MenuButton>

            <div
                onClick={() => {
                    setColorClicked(true)
                }}
                className='flex items-center justify-center'
            >
                <MenuButton
                    onClick={setColor}
                    disabled={editor.isActive('textColor')}
                    className={'cursor-pointer'}
                >
                    <BiFontColor className='w-5 h-5' color={hexColor} />
                </MenuButton>
                <div
                    ref={colorDivRef}
                    className={twMerge(colorClicked ? 'flex' : 'hidden', 'absolute')}
                >
                    <HexColorPicker
                        onBlur={() => {
                            setColor()
                        }}
                        className='hover:cursor-pointer'
                        onChange={(hex) => setHexColor(hex)}
                        color={hexColor}
                        defaultValue={hexColor}
                    />
                </div>
            </div>

            <AppModal
                open={openModalLink}
                setOpen={() => setOpenModalLink(false)}
                title='Insert Link'
            >
                <div className='space-y-4'>
                    <div className='border-b w-full'>
                        <input
                            type='text'
                            className='p-3 w-full border-none rounded outline-none'
                            value={inputLinkValue}
                            onChange={(e) => setInputLinkValue(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row items-center justify-center space-x-4'>
                        <Button
                            type={'button'}
                            onClick={() => {
                                handleLinkInsertion()
                            }}
                        >
                            Insert
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={() => setOpenModalLink(false)}
                            type={'button'}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </AppModal>
            <AppModal
                open={openModalEmail}
                setOpen={() => setOpenModalEmail(false)}
                title='Insert Email Address'
            >
                <div className='space-y-4'>
                    <div className='border-b w-full'>
                        <input
                            type='text'
                            className='p-3 w-full border-none rounded outline-none'
                            value={inputEmailValue.replace('mailto:', '')}
                            onChange={(e) => setInputEmailValue(e.target.value)}
                            placeholder='eg. email@email.com'
                        />
                    </div>
                    <div className='flex flex-row items-center justify-center space-x-4'>
                        <Button
                            type={'button'}
                            onClick={() => {
                                //if (inputEmailValue.indexOf('mailto:') !== 0) {
                                //    setInputEmailValue(`mailto:${inputEmailValue}`)
                                //}

                                handleEmailInsertion()
                            }}
                        >
                            Insert
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={() => setOpenModalEmail(false)}
                            type={'button'}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </AppModal>
        </div>
    )
}
