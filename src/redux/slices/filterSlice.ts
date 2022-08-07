import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface CategoryState {
    category: number
    filterValue: string
    pageCount: number
    sortValue: number
}

const initialState: CategoryState = {
    category: 0,
    filterValue: '',
    pageCount: 1,
    sortValue: 0
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload + 1
        },
        setSortValue: (state, action: PayloadAction<number>) => {
            state.sortValue = action.payload
        }
    },
})

export const { setCategory, setSearchValue, setCurrentPage, setSortValue } = filterSlice.actions

export const category = (state: RootState) => state.filter.category
export const filterValue = (state: RootState) => state.filter.filterValue

export default filterSlice.reducer
