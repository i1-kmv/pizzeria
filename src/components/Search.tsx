import React, {ChangeEvent, FC, useCallback, useState} from "react"
import {useDispatch} from "react-redux"
import {setSearchValue} from "../redux/slices/filterSlice"
import {debounce} from "lodash"



export const Search:FC= () => {

    const [searchValue, setSearchLocalValue] = useState<string>('')
    const dispatch = useDispatch()

    const updateSearchValue = useCallback(
        debounce((str:string) => {
            dispatch(setSearchValue(str))
        }, 1000),[]
    )

    const setSearchValues = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchLocalValue(e.currentTarget.value)
        updateSearchValue(e.currentTarget.value)
    }

    return (
        <div className="content__search">
            <span className="content__search-text">Поиск пиццы...</span>
            <input
                className="content__search-area"
                value={searchValue}
                onChange={setSearchValues}
                type="text"
            />
        </div>
    )
}
