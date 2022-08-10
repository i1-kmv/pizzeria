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

export const categorySelector = (state: RootState) => state.filter.category
export const filterValueSelector = (state: RootState) => state.filter.filterValue
export const pageCountSelector = (state: RootState) => state.filter.pageCount
export const sortValueSelector = (state: RootState) => state.filter.pageCount

export default filterSlice.reducer
