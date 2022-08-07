import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {PizzaType} from "../../pages/Home"


interface CartState {
    totalPrice:number,
    items: Array<PizzaType>
}

const initialState: CartState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload
        },

    },
})

export const { setTotalPrice } = cartSlice.actions

export const totalPrice = (state: RootState) => state.cart.totalPrice

export default cartSlice.reducer
