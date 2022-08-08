import {Categories} from "../components/Categories"
import {Sort} from "../components/Sort"
import MyLoader from "../components/MyLoader"
import {PizzaBlock} from "../components/PizzaBlock"
import React, {createContext, FC, useEffect, useState} from "react"
import {Search} from "../components/Search"
import {Pagination} from "../components/Pagination"
import {useSelector} from "react-redux"
import {RootState} from "../redux/store"
import axios from "axios"
import {useNavigate} from "react-router-dom"


export type PizzaType = {
    id: string
    imageUrl: string
    name: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}


export const Home: FC = () => {


    const sortValue:any = useSelector<RootState>(state => state.filter.sortValue)
    const category = useSelector<RootState>(state => state.filter.category )
    const filterValue = useSelector<RootState>(state => state.filter.filterValue )
    const currentPage = useSelector<RootState>(state => state.filter.pageCount )

    let [pizzas, setPizzas] = useState<Array<PizzaType>>([])
    let [isLoading, setIsLoading] = useState<boolean>(true)


    const sortResponseValues = ['rating', 'price', 'title']
    const categotiesTitleValues = ['Все', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
    const sortResponseValue = sortResponseValues[sortValue]
    const respCategory = category ? `&category=${category}` : ''
    const respFilter = filterValue ? `&search=${filterValue}` : ''

    useEffect(() => {
        setIsLoading(true)
        axios.get<Array<PizzaType>>(`https://62ebb45a55d2bd170e744c03.mockapi.io/items?limit=4&page=${currentPage}${respCategory}&sortBy=${sortResponseValue}&order=desc${respFilter}`)
            .then((res) => {
                return res
            }).then((res) => {
            setIsLoading(false)
            setPizzas(res.data)
        })
    }, [category, sortResponseValue, filterValue, currentPage])


    let skeletonArr = [...new Array(8)]

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <Search/>
            <h2 className="content__title">{categotiesTitleValues[Number(category)]} пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletonArr.map((_, index) => <MyLoader key={index.toString()}/>) :
                    pizzas.map((el, index) => {
                        return (
                            <PizzaBlock
                                el={el}
                                key={index}
                            />
                        )
                    })}
            </div>
            {pizzas.length ?
            <Pagination/> : null
            }
        </>
    )
}
