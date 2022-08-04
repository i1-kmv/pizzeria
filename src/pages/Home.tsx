import {Categories} from "../components/Categories"
import {Sort} from "../components/Sort"
import MyLoader from "../components/MyLoader"
import {PizzaBlock} from "../components/PizzaBlock"
import React, {FC, useEffect, useState} from "react"


type PizzaType = {
    id: string
    imageUrl: string
    name: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}


export const Home:FC = () => {

    let [pizzas, setPizzas] = useState<Array<PizzaType>>([])

    let [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('https://62ebb45a55d2bd170e744c03.mockapi.io/items').then((res) => {
            return res.json()
        }).then((json) => {
            setIsLoading(false)
            setPizzas(json)
        })
    }, [])

    let skeletonArr = [...new Array(8)]

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletonArr.map((_,index) => <MyLoader key={index.toString()}/>) :
                    pizzas.map((el, index) => {
                        return (
                            <PizzaBlock
                                key={el.id}
                                title={el.name}
                                price={el.price}
                                imageUrl={el.imageUrl}
                                sizes={el.sizes}
                                types={el.types}
                            />
                        )
                    })}
            </div>
        </>
    )
}
