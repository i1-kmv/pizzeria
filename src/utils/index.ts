export const getCartFromLS = () => {
    const data = localStorage.getItem('items')
    return data ? JSON.parse(data) : []
}

export const getTotalPriceFromLS = () => {
    const data = localStorage.getItem('totalPrice')
    return data ? JSON.parse(data) : 0
}
