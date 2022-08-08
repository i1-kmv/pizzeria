import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

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
    items: Array<CartItemType>
}

const initialState: CartState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type
                && obj.size === action.payload.size)

            if (findItem) {
                findItem.count ++
            } else {
                state.items.push({...action.payload, count: 1})
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
        removeItem: (state, action: PayloadAction<{id:string, type:number, size: number}>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            state.items = state.items.filter( i => i !== findItem)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        plusCount: (state, action: PayloadAction<{id:string, type:number, size: number}>) => {
            let item = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type
                && obj.size === action.payload.size)

            if (item) {
                item.count += 1
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
        minusCount: (state, action: PayloadAction<{id:string, type:number, size: number}>) => {
            let item = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type
                && obj.size === action.payload.size)

            if (item) {
                item.count -= 1
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + Number(sum)
            }, 0)
        },
    },
})

export const { addItem, removeItem, clearItems, plusCount, minusCount } = cartSlice.actions

export const totalPrice = (state: RootState) => state.cart.totalPrice
export const items = (state: RootState) => state.cart.items

export default cartSlice.reducer
