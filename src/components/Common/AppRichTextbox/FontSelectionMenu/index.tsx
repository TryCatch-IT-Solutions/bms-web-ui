import { Editor } from '@tiptap/react'
// import { useState } from 'react'
import { AppSelectMenu } from '../../SelectionMenu'
import { AppSelectOption } from '@/types/common'

interface FontSelectMenuProps {
    editor: Editor | null
}

const Fonts: AppSelectOption[] = [
    {
        label: 'Arial',
        value: 'Arial',
    },
    {
        label: 'Georgia',
        value: 'Georgia',
    },
    {
        label: 'Impact',
        value: 'Impact',
    },
    {
        label: 'Tahoma',
        value: 'Tahoma',
    },
    {
        label: 'Times New Roman',
        value: 'Times New Roman',
    },
    {
        label: 'Verdana',
        value: 'Verdana',
    },
]

export const FontSelectMenu = ({ editor }: FontSelectMenuProps) => {
    // const [fontFamily, setFontFamily] = useState('Arial')

    if (!editor) {
        return null
    }

    const getFontFamily = () => {
        const attrs = editor.getAttributes('textStyle')
        if (!attrs) return 'Arial'
        return attrs.fontFamily
    }

    return (
        <AppSelectMenu
            name='font-family'
            classname='w-full pr-[0.80rem] bg-white border border-gray-300 mr-[4.5rem]'
            options={Fonts}
            value={getFontFamily()}
            onChange={(val) => {
                editor.chain().focus().setFontFamily(val).run()
            }}
            disabled={!editor.isEditable}
        />
    )
}
