import { useState, useEffect } from 'react';

export const TableHeaders = ({titles}) => titles.map((title, index) => {
    return <th key={index} title={title}>{title}</th>
})

export const TableBody = ({id, name, quantity, priceInfo, dispatcher}) => {
    const sets = priceInfo.map(info => info["set"]);
    const rarities = priceInfo.map(info => info["rarity"]);
    const prices = priceInfo.map(info => info["prices"]);

    const [setIndex, setSetIndex] = useState(0);
    const [priceIndex, setPriceIndex] = useState(1);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const final = (quantity * prices[setIndex][priceIndex]);
        setFinalPrice(final);
        dispatcher(id, final);
    }, [setIndex, priceIndex]);

    return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>
            <select value={setIndex} onChange={e => setSetIndex(e.target.value)}>
                {sets.map((set, index) => {
                    return <option key={index} value={index}>{set}</option>
                })}
            </select>
        </td>
        <td>{rarities[setIndex]}</td>
        <td>
            <select value={priceIndex} onChange={e => setPriceIndex(e.target.value)}>
                <option value={0}>Low - ${prices[setIndex][0].toFixed(2)}</option>
                <option value={1}>Average - ${prices[setIndex][1].toFixed(2)}</option>
                <option value={2}>High - ${prices[setIndex][2].toFixed(2)}</option>
            </select>
        </td>
        <td>${finalPrice.toFixed(2)}</td>
    </tr>)
}