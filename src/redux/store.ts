import { configureStore } from '@reduxjs/toolkit'
import {filterSlice} from "./slices/filterSlice"
import {cartSlice} from "./slices/cartSlice";
import {pizzasSlice} from "./slices/pizzasSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        cart: cartSlice.reducer,
        pizzas: pizzasSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
