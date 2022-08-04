import React, {FC} from "react"
import cart from '../assets/img/cart.svg'
import arrow from '../assets/img/grey-arrow-left.svg'
import trash from '../assets/img/trash.svg'
import {Link} from "react-router-dom";
import {CartItem} from "../components/Cart-item";


export const Cart: FC = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart">
                    <div className="cart__top">
                        <h2 className="content__title">
                            <img src={cart}/> Корзина
                        </h2>
                        <div className="cart__clear">
                            <img src={trash}/>
                            <span>Очистить корзину</span>
                        </div>
                    </div>
                    <div className="content__items">
                        <CartItem/>
                    </div>
                    <div className="cart__bottom">
                        <div className="cart__bottom-details">
                            <span> Всего пицц: <b>3 шт.</b> </span>
                            <span> Сумма заказа: <b>900 ₽</b> </span>
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
            </div>
        </div>
    )
}
