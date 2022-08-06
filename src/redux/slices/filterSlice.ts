import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface CategoryState {
    category: number
    filterValue: string
}

const initialState: CategoryState = {
    category: 0,
    filterValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
        },
    },
})

export const { setCategory, setFilter } = filterSlice.actions

export const category = (state: RootState) => state.filter.category
export const filterValue = (state: RootState) => state.filter.filterValue

export default filterSlice.reducer
