import React, {FC} from "react"
import ReactPaginate from "react-paginate"

type PaginationPropsType = {
    onChange: (val:number) => void
}

export const Pagination:FC<PaginationPropsType> = ({onChange}) => {
    return (
        <ReactPaginate
            className="content__pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onChange(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
        />
    )
}
