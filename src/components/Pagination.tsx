import React, {FC} from "react"
import ReactPaginate from "react-paginate"
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/slices/filterSlice";

export const Pagination:FC = () => {

    const dispatch = useDispatch()

    return (
        <ReactPaginate
            className="content__pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => dispatch(setCurrentPage(e.selected))}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
        />
    )
}
