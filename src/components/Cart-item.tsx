import React, {FC} from "react"
import plus from '../assets/img/plus.svg'
import {useDispatch} from "react-redux";
import {minusCount, plusCount, removeItem} from "../redux/slices/cartSlice";

export type CartItemPropsType = {
    id: string
    name: string
    type: number
    size: number
    price: number
    count: number
    imageUrl: string
}



export const CartItem:FC<CartItemPropsType> = ({id,name, type, size, price,count, imageUrl}) => {

    const typesName = ['Тонкое', 'Традиционное']
    const dispatch = useDispatch()

    const onPlusClickHandler = (id:string, type:number, size: number) => {
        dispatch(plusCount({id, type, size}))
    }

    const onMinusClickHandler = (id:string, type:number, size: number) => {
        dispatch(minusCount({id, type, size}))
    }

    const removeHandler = (id:string, type:number, size: number) => {
        dispatch(removeItem({id, type, size}))
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{name}</h3>
                <p>{typesName[type]}, {size} см.</p>
            </div>
            <div className="cart__item-count">
                <div
                    className={`button button--outline button--circle cart__item-count-minus ${count === 1 && 'disabled'}`}
                    onClick={() => onMinusClickHandler(id, type,size)}
                >
                    <img src={plus}/>
                </div>
                <b>{count}</b>
                <div
                    className="button button--outline button--circle cart__item-count-plus"
                    onClick={() => onPlusClickHandler(id, type,size)}
                >
                    <img src={plus}/>
                </div>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div className="button button--outline button--circle" onClick={() => removeHandler(id, type,size)}>
                   <img src={plus}/>
                </div>
            </div>
        </div>
    )
}
