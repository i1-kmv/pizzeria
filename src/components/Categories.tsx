import React, {FC, useState} from "react";


export const Categories: FC = () => {

    const [activeFilter, setActiveFilter] = useState<number>(0)

    const categoties = ['Все', 'Мясные', 'Вегетарианские', 'Грибные', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {
                    categoties.map((el, index) => {
                        return (
                            <li
                                className={activeFilter === index ? 'active' : ''}
                                onClick={() => setActiveFilter(index)}
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
