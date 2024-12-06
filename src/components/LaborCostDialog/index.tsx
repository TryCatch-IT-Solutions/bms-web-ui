import { useFormContext } from 'react-hook-form'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../Dialog'
import { Input } from '../Input'
import { atom, useAtom, useSetAtom } from 'jotai'
import { Button } from '../Button'
import { invoiceContentAtom, quoteContentAtom } from '@/store/owner'
import { ImPencil } from 'react-icons/im'
import { useLocation } from 'react-router-dom'

const DEFAULT_LABOR_COST = 0
const VERBIAGE = 'Add Labor Cost'

const laborCostAtom = atom<number>(DEFAULT_LABOR_COST)

laborCostAtom.onMount = (set) => () => set(DEFAULT_LABOR_COST)

const LaborCostDialog = ({ fieldName, isForEdit }: { fieldName: string; isForEdit?: boolean }) => {
    const { pathname } = useLocation()
    const { setValue } = useFormContext()

    const isAddQuoting = pathname === '/financial-management/quoting/add-quoting'

    const setContent = useSetAtom(isAddQuoting ? quoteContentAtom : invoiceContentAtom)
    // const isNoSelectedServices = useAtomValue(
    //     isAddQuoting ? isNoSelectedServicesQuotingAtom : isNoSelectedServicesInvoicingAtom,
    // ) as boolean

    const [laborCost, setLaborCost] = useAtom(laborCostAtom)

    const applyLaborCost = () => {
        setValue(fieldName, laborCost, {
            shouldValidate: true,
        })

        setContent((prev) => ({
            ...prev,
            laborCost: laborCost,
            subTotal: prev.totalProduct + prev.totalService + prev.totalExpense + laborCost,
        }))
    }

    return (
        <Dialog>
            <DialogTrigger
                className={`${
                    isForEdit ? 'px-2' : 'px-8'
                } pb-2 font-semibold text-zentive-blue-dark cursor-pointer`}
            >
                {isForEdit ? <ImPencil className='w-3 h-3 text-zentive-blue-dark' /> : VERBIAGE}
            </DialogTrigger>
            <DialogContent className='rounded-[15px] p-0 w-[380px]'>
                <DialogHeader className='p-[26px] rounded-t-[15px] space-y-[26px]'>
                    <DialogTitle className='text-2xl text-zentive-black text-left'>
                        {VERBIAGE}
                    </DialogTitle>
                    <Input
                        name={fieldName}
                        onChange={(e) => setLaborCost(parseFloat(e.target.value))}
                        placeholder='Labor Cost'
                        type='number'
                        value={laborCost}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                e.preventDefault()
                            }
                        }}
                    />
                </DialogHeader>
                <DialogFooter className='flex flex-row gap-[15px] bg-zentive-gray-light px-[26px] py-[16px] rounded-b-[15px]'>
                    <DialogClose asChild>
                        <Button
                            className='w-full font-semibold'
                            type='button'
                            onClick={() => setLaborCost(0)}
                            variant='outline'
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className='w-full'
                            onClick={applyLaborCost}
                            disabled={!laborCost}
                            type='button'
                        >
                            Apply
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LaborCostDialog
