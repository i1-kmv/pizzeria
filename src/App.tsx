import React from 'react'
import './App.css'
import './scss/app.scss'
import {Header} from "./components/Header"
import {Categories} from "./components/Categories"
import {Sort} from "./components/Sort"
import {PizzaBlock} from "./components/PizzaBlock"
import pizzas from './db.json'

function App() {
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
                            {pizzas.pizzas.map((el, index) => {
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
