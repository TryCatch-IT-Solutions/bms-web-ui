import React, { Dispatch, SetStateAction } from 'react'
import ReactPaginate from 'react-paginate'
import { PaginationType } from './schema'

interface PaginatedItemsProps {
    per_page: number
    setPagination: Dispatch<SetStateAction<PaginationType>>
    total: number
    pagination: PaginationType
}

export const Pagination: React.FC<PaginatedItemsProps> = ({
    per_page,
    setPagination,
    total,
    pagination,
}) => {
    const pageCount = Math.ceil(total / per_page)

    const handlePageClick = (selectedItem: { selected: number }) => {
        setPagination({
            current_page: selectedItem.selected + 1,
            per_page: per_page,
        })
    }

    const handlePageSizeClick = (value: string) => {
        const newPageSize = parseInt(value) //  const newPageSize = parseInt(value, 10)

        setPagination((prevPagination) => ({
            ...prevPagination,
            page: 1,
            per_page: newPageSize,
        }))
    }

    const itemsPerPageOptions = [10, 20, 50, 200, 500, 1000]

    return (
        <div className='flex flex-row justify-end gap-5 w-full max-w-full xs:text-sm'>
            <div className='flex flex-col justify-end max-w-full'>
                <ReactPaginate
                    previousLabel='<<'
                    nextLabel='>>'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakLabel='...'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    pageCount={pageCount > 0 ? pageCount : 1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName='react-paginate'
                    forcePage={(pagination.current_page ?? 1) - 1}
                />
            </div>
            <div className='mb-2 z-10 flex flex-row gap-2 justify-end'>
                <label htmlFor='itemsPerPage'>Items per page:</label>
                <select
                    id='itemsPerPage'
                    value={per_page}
                    onChange={(e) => handlePageSizeClick(e.target.value)}
                    className='h-[30px] -mt-1 rounded-md border border-zentive-gray-light'
                >
                    {itemsPerPageOptions?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
