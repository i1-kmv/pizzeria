import React, {useEffect, useState} from 'react'
import './App.css'
import './scss/app.scss'
import {Header} from "./components/Header"
import {Categories} from "./components/Categories"
import {Sort} from "./components/Sort"
import {PizzaBlock} from "./components/PizzaBlock"

type PizzaType = {
    id:string
    imageUrl: string
    name: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}


function App() {

    let [pizzas, setPizzas] = useState<Array<PizzaType>>([])

    useEffect(() => {
        fetch('https://62ebb45a55d2bd170e744c03.mockapi.io/items').then((res) => {
            return res.json()
        }).then((json) => {
           setPizzas(json)
        })
    }, [])

    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <div className="container">
                        <div className="content__top">
                            <Categories/>
                            <Sort/>
                        </div>
                        <h2 className="content__title">Все пиццы</h2>
                        <div className="content__items">
                            {pizzas.map((el, index) => {
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
