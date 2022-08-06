import React, {FC, useContext} from "react"
import {SearchContext} from "../pages/Home"


export const Search:FC= () => {

    const {filterValue, setFilterValue} = useContext(SearchContext)

    return (
        <div className="content__search">
            <span className="content__search-text">Поиск пиццы...</span>
            <input
                className="content__search-area"
                value={filterValue}
                onChange={(e) => setFilterValue(e.currentTarget.value)}
                type="text"
            />
        </div>
    )
}
