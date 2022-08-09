import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {PizzaType} from "../../pages/Home";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params:any) => {
        console.log(params)
        const {currentPage, respCategory, sortResponseValue, respFilter} = params
        const response =  await axios.get<Array<PizzaType>>(`https://62ebb45a55d2bd170e744c03.mockapi.io/items?limit=4&page=${currentPage}${respCategory}&sortBy=${sortResponseValue}&order=desc${respFilter}`)
        return response.data

    }
)

interface pizzasState {
    items: Array<PizzaType>,
    status: string
}

const initialState: pizzasState = {
  items: [],
  status: 'loading'
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Array<PizzaType>>) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) =>
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchPizzas.fulfilled, (state, action:any) => {
            console.log(action)
            state.status = 'success'
            state.items = action.payload
        })
        .addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error'
        }),
})


export const { setItems } = pizzasSlice.actions

export const items = (state: RootState) => state.pizzas.items

export default pizzasSlice.reducer
