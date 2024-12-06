import React, { Dispatch, SetStateAction, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { PaginationType } from './schema'

interface PaginatedItemsProps {
    itemsPerPage: number
    setPagination: Dispatch<SetStateAction<PaginationType>>
    totalRecords: number
    pagination: PaginationType
}

export const ClientPagination: React.FC<PaginatedItemsProps> = ({
    itemsPerPage,
    setPagination,
    totalRecords,
    pagination,
}) => {
    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(
        itemsPerPage > 0 ? itemsPerPage : 5,
    )

    const pageCount = Math.ceil(totalRecords / selectedItemsPerPage)

    const handlePageClick = (selectedItem: { selected: number }) => {
        setPagination({
            page: selectedItem.selected + 1,
            pageSize: selectedItemsPerPage,
        })
    }

    const handlePageSizeClick = (value: string) => {
        const newPageSize = parseInt(value) //  const newPageSize = parseInt(value, 10)

        setSelectedItemsPerPage(newPageSize)

        setPagination((prevPagination) => ({
            ...prevPagination,
            page: 1, // Resetter
            pageSize: newPageSize,
        }))
    }

    const itemsPerPageOptions = [5, 10, 20, 50]

    return (
        <div className='flex flex-row justify-end gap-5 w-full'>
            <div className='mb-2 z-10 flex flex-row gap-2 justify-end'>
                <label htmlFor='itemsPerPage'>Rows per page:</label>
                <select
                    id='itemsPerPage'
                    value={selectedItemsPerPage}
                    onChange={(e) => handlePageSizeClick(e.target.value)}
                    className='h-[30px] -mt-1'
                >
                    {itemsPerPageOptions?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col justify-end'>
                <ReactPaginate
                    previousLabel='<'
                    nextLabel='>'
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
                    pageRangeDisplayed={selectedItemsPerPage}
                    onPageChange={handlePageClick}
                    containerClassName='react-paginate'
                    forcePage={(pagination.page ?? 1) - 1}
                />
            </div>
        </div>
    )
}
