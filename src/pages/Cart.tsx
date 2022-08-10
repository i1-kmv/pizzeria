import React, {FC} from "react"
import cart from '../assets/img/cart.svg'
import arrow from '../assets/img/grey-arrow-left.svg'
import trash from '../assets/img/trash.svg'
import {Link} from "react-router-dom";
import {CartItem} from "../components/Cart-item";
import {useDispatch, useSelector} from "react-redux";
import {cartItemsSelector, CartItemType, clearItems, totalPriceSeletor} from "../redux/slices/cartSlice";
import {RootState} from "../redux/store";
import {CartEmpty} from "../components/CartEmpty";


export const Cart: FC = () => {

    const dispatch = useDispatch()

    let items: any = useSelector<RootState>(cartItemsSelector)
    const totalPrice:any = useSelector<RootState>(totalPriceSeletor)

    const itemsCount = items.reduce((sum: number, obj: CartItemType) => {
        return sum + obj.count
    }, 0)

    const clearCartHandler = () => {
        dispatch(clearItems())
    }

    return (
        <div className="content">
            { items.length ? <div className="container container--cart">
                <div className="cart">
                    <div className="cart__top">
                        <h2 className="content__title">
                            <img src={cart}/> Корзина
                        </h2>
                        <div className="cart__clear">
                            <img src={trash}/>
                            <span onClick={clearCartHandler}>Очистить корзину</span>
                        </div>
                    </div>
                    <div className="content__items">
                        {items.map((el: CartItemType, i: number) => {
                            return (
                                <CartItem
                                    key={`${el.id} + ${i}`}
                                    id={el.id}
                                    name={el.title}
                                    type={el.type}
                                    size={el.size}
                                    price={el.price}
                                    count={el.count}
                                    imageUrl={el.imageUrl}
                                />
                            )
                        })}
                    </div>
                    <div className="cart__bottom">
                        <div className="cart__bottom-details">
                            <span> Всего пицц: <b>{itemsCount} шт.</b> </span>
                            <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
                        </div>
                        <div className="cart__bottom-buttons">
                            <Link to="/" className="button button--outline button--add go-back-btn">
                                <img src={arrow}/>
                                <span>Вернуться назад</span>
                            </Link>
                            <div className="button pay-btn">
                                <span>Оплатить сейчас</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :  <CartEmpty/>}
        </div>
    )
}
