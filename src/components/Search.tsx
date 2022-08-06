import React, {FC} from "react"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../redux/store"
import {setFilter} from "../redux/slices/filterSlice"


export const Search:FC= () => {

    const dispatch = useDispatch()
    const filterValue:any = useSelector<RootState>(state => state.filter.filterValue )

    return (
        <div className="content__search">
            <span className="content__search-text">Поиск пиццы...</span>
            <input
                className="content__search-area"
                value={filterValue}
                onChange={(e) => dispatch(setFilter(e.currentTarget.value))}
                type="text"
            />
        </div>
    )
}
