import {Categories} from "../components/Categories"
import {Sort} from "../components/Sort"
import MyLoader from "../components/MyLoader"
import {PizzaBlock} from "../components/PizzaBlock"
import React, {createContext, FC, useContext, useEffect, useState} from "react"
import {Search} from "../components/Search"
import {Pagination} from "../components/Pagination"


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

type ContextType = {
    filterValue: string
    setFilterValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = createContext<ContextType>({filterValue: '', setFilterValue: () => {}})


export const Home: FC = () => {

    const [filterValue,setFilterValue] = useState<string>('')

    let [pizzas, setPizzas] = useState<Array<PizzaType>>([])
    let [isLoading, setIsLoading] = useState<boolean>(true)
    let [category, setCategory] = useState<number>(0)
    let [currentPage, setCurrentPage] = useState<number>(1)
    const [sortValue, setSortValue] = useState<number>(0)

    const sortResponseValues = ['rating', 'price', 'title']
    const sortResponseValue = sortResponseValues[sortValue]
    const respCategory = category ? `category=${category}` : ''
    const respFilter = filterValue ? `&search=${filterValue}` : ''


    useEffect(() => {
        setIsLoading(true)
        fetch(`https://62ebb45a55d2bd170e744c03.mockapi.io/items?limit=4&page=${currentPage}${respCategory}&sortBy=${sortResponseValue}&order=desc${respFilter}`)
            .then((res) => {
                return res.json()
            }).then((json) => {
            setIsLoading(false)
            setPizzas(json)
        })
        console.log(filterValue)
    }, [category, sortResponseValue, filterValue, currentPage])

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
            <SearchContext.Provider value={{filterValue, setFilterValue}}>
                <Search/>
            </SearchContext.Provider>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletonArr.map((_, index) => <MyLoader key={index.toString()}/>) :
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
            <Pagination onChange={setCurrentPage}/>
        </>
    )
}
