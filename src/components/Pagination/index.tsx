import React, { Dispatch, SetStateAction } from 'react'
import ReactPaginate from 'react-paginate'
import { PaginationType } from './schema'

interface PaginatedItemsProps {
    itemsPerPage: number
    setPagination: Dispatch<SetStateAction<PaginationType>>
    totalRecords: number
    pagination: PaginationType
}

export const Pagination: React.FC<PaginatedItemsProps> = ({
    itemsPerPage,
    setPagination,
    totalRecords,
    pagination,
}) => {

    const pageCount = Math.ceil(totalRecords / itemsPerPage)

    const handlePageClick = (selectedItem: { selected: number }) => {
        setPagination({
            page: selectedItem.selected + 1,
            pageSize: itemsPerPage,
        })
    }

    const handlePageSizeClick = (value: string) => {
        const newPageSize = parseInt(value) //  const newPageSize = parseInt(value, 10)

        setPagination((prevPagination) => ({
            ...prevPagination,
            page: 1, // Resetter
            pageSize: newPageSize,
        }))
    }

    const itemsPerPageOptions = [5, 10, 20, 50]

    return (
        <div className='flex flex-row justify-end gap-5 w-full max-w-full'>
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
                    forcePage={(pagination.page ?? 1) - 1}
                />
            </div>
            <div className='mb-2 z-10 flex flex-row gap-2 justify-end'>
                <label htmlFor='itemsPerPage'>Items per page:</label>
                <select
                    id='itemsPerPage'
                    value={itemsPerPage}
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
