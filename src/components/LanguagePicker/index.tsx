import { CiGlobe } from 'react-icons/ci'
import { Button } from '@/components/Button'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import { useSetAtom } from 'jotai'
import { languageAtom } from '@/store/crew'
import ReactCountryFlag from 'react-country-flag'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/AlertDialog'
import { FaCheck } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

const LanguagePicker = () => {
    const { t, i18n } = useTranslation(['common'])
    const setLanguage = useSetAtom(languageAtom)
    const [open, setOpen] = useState<boolean>(false)
    const dialogRef = useRef(null)

    const handleLanguageSelect = (lang: string) => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
        setOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !(dialogRef.current as Node).contains(event.target as Node)) {
                setOpen(false)
            }
        }

        if (open) {
            window.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <div>
            <AlertDialog onOpenChange={(o) => setOpen(o)} open={open}>
                <AlertDialogTrigger asChild>
                    <Button variant='ghost' className='mt-4 hover:bg-transparent'>
                        <CiGlobe className='mr-1 h-4 w-4' />
                        {i18n.language === 'en' ? 'English' : 'Español'}
                        <MdKeyboardArrowDown />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                    ref={dialogRef}
                    className='bg-white h-[140px] w-[250px] rounded-md py-0 px-1'
                >
                    <p className='text-gray-500 font-semibold mt-2 ml-2'>{t('Language')}</p>
                    <div className='flex flex-col'>
                        <Button
                            className='flex flex-row justify-start border-b rounded-none px-2'
                            variant='ghost'
                            onClick={() => handleLanguageSelect('en')}
                        >
                            <ReactCountryFlag
                                countryCode='US'
                                svg
                                cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
                                cdnSuffix='svg'
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                title='US'
                            />
                            <p className='ml-2'>English</p>
                            {i18n.language === 'en' && (
                                <FaCheck className='text-zentive-green-dark ml-auto' />
                            )}
                        </Button>
                        <Button
                            className='flex flex-row justify-start rounded-none px-2'
                            variant='ghost'
                            onClick={() => handleLanguageSelect('es')}
                        >
                            <ReactCountryFlag
                                countryCode='ES'
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
                                cdnSuffix='svg'
                                title='ES'
                            />
                            <p className='ml-2'>Español</p>
                            {i18n.language === 'es' && (
                                <FaCheck className='text-zentive-green-dark ml-auto' />
                            )}
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LanguagePicker
