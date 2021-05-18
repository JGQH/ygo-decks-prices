import { TableHeaders, TableBody } from './../aux/table';

const Visualizer = ({data}) => {
    const titles = ["ID", "Name", "Quantity", "Set", "Rarity", "Unit Price", "Total Price"];

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

                return <TableBody key={index} id={id} name={info["name"]} quantity={info["quantity"]} priceInfo={info["prices"]} />
            })}
        </tbody>
    </table>)
}

export default Visualizer