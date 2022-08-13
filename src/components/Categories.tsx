import React, {FC} from "react"
import {categorySelector, setCategory} from "../redux/slices/filterSlice"
import {useDispatch, useSelector} from "react-redux"


export const Categories: FC = () => {

    const dispatch = useDispatch()
    const category = useSelector(categorySelector)

    const categoties = ['Все', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {
                    categoties.map((el, index) => {
                        return (
                            <li
                                className={category === index ? 'active' : ''}
                                onClick={() => dispatch(setCategory(index))}
                                key={el + index}
                            >
                                {el}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
