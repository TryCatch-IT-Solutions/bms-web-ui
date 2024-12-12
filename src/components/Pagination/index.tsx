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
                    forcePage={(pagination.current_page ?? 1) - 1}
                />
            </div>
        </div>
    )
}
