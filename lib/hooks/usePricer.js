import { useCallback, useReducer } from 'react'

function Reducer(prices, action) {
    const newPrices = {...prices}
    newPrices[action.id] = action.price;
    return newPrices;
}

export default function usePricer() {
    const [prices, setter] = useReducer(Reducer, {})

    const dispatcher = useCallback((id, price) => {
        setter({ id, price })
    }, [])

    const priceTotal = Object.keys(prices).map(id => prices[id]).reduce((p, c) => p + c, 0).toFixed(2)

    return [priceTotal, dispatcher]
}