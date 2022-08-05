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
    let [category, setCategory] = useState<number>(0)
    const [sortValue, setSortValue] = useState<number>(0)
    const sortResponseValues = ['rating', 'price', 'title']
    const sortResponseValue = sortResponseValues[sortValue]

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://62ebb45a55d2bd170e744c03.mockapi.io/items?${category ? `category=${category}` : ''}&sortBy=${sortResponseValue}&order=desc`).then((res) => {
            return res.json()
        }).then((json) => {
            setIsLoading(false)
            setPizzas(json)
        })
    }, [category, sortResponseValue])


    let skeletonArr = [...new Array(8)]

    return (
        <>
            <div className="content__top">
                <Categories
                    category={category}
                    setCategory={setCategory}
                />
                <Sort
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                />
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
