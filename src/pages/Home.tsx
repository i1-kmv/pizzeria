import {Categories} from "../components/Categories"
import {Sort} from "../components/Sort"
import MyLoader from "../components/MyLoader"
import {PizzaBlock} from "../components/PizzaBlock"
import React, {FC, useEffect} from "react"
import {Search} from "../components/Search"
import {Pagination} from "../components/Pagination"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../redux/store"
import {fetchPizzas, itemsSelector, setItems, statusSelector} from "../redux/slices/pizzasSlice";
import {categorySelector, filterValueSelector, pageCountSelector, sortValueSelector} from "../redux/slices/filterSlice";


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

    const dispatch = useDispatch()

    const sortValue = useSelector(sortValueSelector)
    const category = useSelector(categorySelector )
    const filterValue = useSelector(filterValueSelector )
    const currentPage = useSelector(pageCountSelector )
    const pizzas = useSelector(itemsSelector)
    const status = useSelector(statusSelector)


    const sortResponseValues = ['rating', 'price', 'title']
    const categotiesTitleValues = ['Все', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
    const sortResponseValue = sortResponseValues[sortValue]
    const respCategory = category ? `&category=${category}` : ''
    const respFilter = filterValue ? `&search=${filterValue}` : ''

    useEffect(() => {
       // @ts-ignore
        dispatch(fetchPizzas({currentPage, respCategory, sortResponseValue, respFilter}))
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
                {status === 'loading' ? skeletonArr.map((_, index) => <MyLoader key={index.toString()}/>) :
                    pizzas.map((el: PizzaType, index: number) => {
                        return (
                            <PizzaBlock
                                el={el}
                                key={index}
                            />
                        )
                    })}
            </div>
            <Pagination/>
        </>
    )
}
