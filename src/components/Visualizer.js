import { useReducer, useCallback } from 'react';
import { TableHeaders, TableBody } from './../aux/table';

function Reducer(prices, action) {
    const newPrices = {...prices}
    newPrices[action.id] = action.price;
    return newPrices;
}

const Visualizer = ({reference, data}) => {
    const titles = ["ID", "Name", "Quantity", "Set", "Rarity", "Unit Price", "Total Price"];
    const [prices, setter] = useReducer(Reducer, {});

    const dispatcher = useCallback((id, price) => {
        setter({"id":id, "price":price})
    }, [])

    return (
    <table className="visualizer-content" ref={reference}>
        <thead>
            <tr>
                <TableHeaders titles={titles} />
            </tr>
        </thead>
        <tbody>
            {Object.keys(data).map((id, index) => {
                const info = data[id];

                const name = info["name"];
                const quantity = info["quantity"];

                const sets = info["prices"].map(detail => detail["set"]);
                const rarities = info["prices"].map(info => info["rarity"]);
                const prices = info["prices"].map(info => info["prices"]);

                return <TableBody key={index} {...{id, name, quantity, sets, rarities, prices, dispatcher}} />
            })}
            <tr>
                <th colSpan={titles.length - 1}>TOTAL</th>
                <th>${Object.keys(prices).map(id => prices[id]).reduce((p, c) => p + c, 0).toFixed(2)}</th>
            </tr>
        </tbody>
    </table>)
}

export default Visualizer