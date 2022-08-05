import React, {FC, useState} from "react"

type CategoriesPropsType = {
    category: number
    setCategory: (val: number) => void
}


export const Categories: FC<CategoriesPropsType> = ({category, setCategory}) => {

    const categoties = ['Все', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {
                    categoties.map((el, index) => {
                        return (
                            <li
                                className={category === index ? 'active' : ''}
                                onClick={() => setCategory(index)}
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
