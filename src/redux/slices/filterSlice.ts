import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface CategoryState {
    category: number
}

const initialState: CategoryState = {
    category: 0,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload
        },
    },
})

export const { setCategory } = filterSlice.actions

export const category = (state: RootState) => state.filter.category

export default filterSlice.reducer
