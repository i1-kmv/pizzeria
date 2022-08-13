import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {getCartFromLS, getTotalPriceFromLS} from "../../utils"

export type CartItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: number
    size: number
    count: number
}


interface CartState {
    totalPrice:number,
    cartItems: Array<CartItemType>
}

const initialState: CartState = {
    totalPrice: getTotalPriceFromLS(),
    cartItems: getCartFromLS(),
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id && obj.type === action.payload.type
                && obj.size === action.payload.size)

            if (findItem) {
                findItem.count ++
            } else {
                state.cartItems.push({...action.payload, count: 1})
            }
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
        removeItem: (state, action: PayloadAction<{id:string, type:number, size: number}>) => {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            state.cartItems = state.cartItems.filter( i => i !== findItem)
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
        clearItems: (state) => {
            state.cartItems = []
            state.totalPrice = 0
        },
        plusCount: (state, action: PayloadAction<{id:string, type:number, size: number}>) => {
            let item = state.cartItems.find(obj => obj.id === action.payload.id && obj.type === action.payload.type
                && obj.size === action.payload.size)

            if (item) {
                item.count += 1
            }

            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
        minusCount: (state, action: PayloadAction<{id:string, type:number, size: number}>) => {
            let item = state.cartItems.find(obj => obj.id === action.payload.id && obj.type === action.payload.type
                && obj.size === action.payload.size)

            if (item && item.count > 1) {
                item.count -= 1
            }

            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
    },
})

export const { addItem, removeItem, clearItems, plusCount, minusCount } = cartSlice.actions

export const totalPriceSeletor = (state: RootState) => state.cart.totalPrice
export const cartItemsSelector = (state: RootState) => state.cart.cartItems

export default cartSlice.reducer
