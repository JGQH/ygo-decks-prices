import { useState, useEffect } from 'react';
import Select from './select';

export const TableHeaders = ({titles}) => titles.map((title, index) => {
    return <th key={index} title={title}>{title}</th>
})

export const TableBody = props => {
    const { id, name, quantity, sets, rarities, prices, dispatcher } = props;

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
            <Select options={sets} value={setIndex} onChange={setSetIndex} />
        </td>
        <td>{rarities[setIndex]}</td>
        <td>
            <Select options={[
                `Low - $${prices[setIndex][0].toFixed(2)}`,
                `Average - $${prices[setIndex][1].toFixed(2)}`,
                `High - $${prices[setIndex][2].toFixed(2)}`
            ]} value={priceIndex} onChange={setPriceIndex} />
        </td>
        <td>${finalPrice.toFixed(2)}</td>
    </tr>)
}