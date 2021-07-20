import { useState, useEffect } from 'react'

export default function useCalculator(id, quantity, prices, dispatcher) {
    const [boxIndex, setBoxIndex] = useState(0)
    const [tagIndex, setTagIndex] = useState(1)
    const [finalPrice, setFinalPrice] = useState(0)

    useEffect(() => {
        const price = quantity * prices[boxIndex][tagIndex]
        setFinalPrice(price)
        dispatcher(id, price)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boxIndex, tagIndex])

    return { finalPrice, boxIndex, tagIndex, setBoxIndex, setTagIndex }
}