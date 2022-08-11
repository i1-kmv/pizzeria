import React, {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import axios from "axios";
import {PizzaType} from "./Home";


export const FullPizza:FC = () => {

    const [pizza, setPizza] = useState<PizzaType | null>(null)

    const { id } = useParams()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get<PizzaType>(`https://62ebb45a55d2bd170e744c03.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return (
            <div className="container">
                loading
            </div>
        )
    }

    return (
        <div className="container">
            <img src={pizza?.imageUrl} alt="pizza image"/>
            <h2>{pizza?.name}</h2>
            <h4>{pizza?.price}</h4>
        </div>
    )
}
