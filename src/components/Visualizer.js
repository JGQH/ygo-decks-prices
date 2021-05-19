import { useReducer, useCallback } from 'react';
import { TableHeaders, TableBody } from './../aux/table';

function Reducer(prices, action) {
    const newPrices = {...prices}
    newPrices[action.id] = action.price;
    return newPrices;
}

const Visualizer = ({data}) => {
    const titles = ["ID", "Name", "Quantity", "Set", "Rarity", "Unit Price", "Total Price"];
    const [prices, setter] = useReducer(Reducer, {});

    const dispatcher = useCallback((id, price) => {
        setter({"id":id, "price":price})
    }, [])

    return (
    <table className="visualizer-content">
        <thead>
            <tr>
                <TableHeaders titles={titles} />
            </tr>
        </thead>
        <tbody>
            {Object.keys(data).map((id, index) => {
                const info = data[id];

                return <TableBody key={index} id={id} name={info["name"]} quantity={info["quantity"]} priceInfo={info["prices"]} dispatcher={dispatcher} />
            })}
            <tr>
                <th colSpan={titles.length - 1}>TOTAL</th>
                <th>${Object.keys(prices).map(id => prices[id]).reduce((p, c) => p + c, 0).toFixed(2)}</th>
            </tr>
        </tbody>
    </table>)
}

export default Visualizer