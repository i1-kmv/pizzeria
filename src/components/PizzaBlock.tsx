import React, {FC, useState} from "react"
import {useDispatch} from "react-redux"
import {addItem} from "../redux/slices/cartSlice"
import {PizzaType} from "../pages/Home"
import {Link} from "react-router-dom"

type PizzaBlockPropsType = {
    el:PizzaType
}


export const PizzaBlock: FC<PizzaBlockPropsType> = ({el}) => {

    const dispatch = useDispatch()

    const [pizzaCount, setPizzaCount] = useState<number>(0)
    const [activeSize, setActiveSize] = useState<number>(0)
    const [activeType, setActiveType] = useState<number>(0)
    const typesName = ['Тонкое', 'Традиционное']

    const setPizzaCountHandler = (id: string, title: string, price: number, imageUrl: string, activeType: number, activeSize: number) => {
        setPizzaCount(pizzaCount + 1)
        dispatch(addItem({id, title, price, imageUrl, type: activeType, size: activeSize}))
    }

    if (!el) {
        return <div className="container">Loading...</div>
    }

    return (
        <div className="pizza-block">
           <Link to={`/pizza/${el.id}`}>
               <img
                   className="pizza-block__image"
                   src={el.imageUrl}
                   alt="Pizza"
               />
               <h4 className="pizza-block__title">{el.name}</h4>
           </Link>
            <div className="pizza-block__selector">
                <ul>
                    {typesName.map((elem, i) => {
                        return (
                            i < el.types.length &&
                            <li
                                key={`${el} + ${i}`}
                                className={activeType === i ? "active" : ''}
                                onClick={() => setActiveType(i)}
                            >
                                {elem}
                            </li>
                        )
                    })}
                </ul>
                <ul>
                    {el.sizes.map((el, i) => {
                        return (
                            <li
                                key={`${el}+${i}`}
                                className={activeSize === i ? 'active' : ''}
                                onClick={() => setActiveSize(i)}
                            >
                                {el} см.
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {el.price} ₽</div>
                <div
                    className="button button--outline button--add"
                    onClick={() => setPizzaCountHandler(el.id, el.name, el.price, el.imageUrl, el.types[activeType], el.sizes[activeSize])}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{pizzaCount}</i>
                </div>
            </div>
        </div>
    )
}
