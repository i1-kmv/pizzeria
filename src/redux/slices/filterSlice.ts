import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface CategoryState {
    category: number
    filterValue: string
    pageCount: number
}

const initialState: CategoryState = {
    category: 0,
    filterValue: '',
    pageCount: 1
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
    },
})

export const { setCategory, setSearchValue, setCurrentPage } = filterSlice.actions

export const category = (state: RootState) => state.filter.category
export const filterValue = (state: RootState) => state.filter.filterValue

export default filterSlice.reducer
