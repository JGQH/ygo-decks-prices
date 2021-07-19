import { useYdk } from '@Root'
import usePricer from '@Hooks/usePricer'
import TableHeaders from '@Components/TableHeaders'
import TableBody from '@Components/TableBody'
import styles from './visualizer.module.scss'

const TITLES = ["ID", "Name", "Quantity", "Set", "Rarity", "Unit Price", "Total Price"]

function PriceTable() {
    const { fetcher, table } = useYdk()

    const ydk = fetcher.value['ydk']
    const [priceTotal, dispatcher] = usePricer()

    return (
    <table ref={table}>
        <thead>
            <tr>
                <TableHeaders titles={TITLES} />
            </tr>
        </thead>
        <tbody>
            {Object.keys(ydk).map((id, index) => {
                const info = ydk[id];

                const name = info['name']
                const quantity = info['quantity']

                const boxes = info['prices'].map(detail => detail['set'])
                const rarities = info['prices'].map(info => info['rarity'])
                const prices = info['prices'].map(info => info['prices'])

                return <TableBody key={index} {...{id, name, quantity, boxes, rarities, prices, dispatcher}} />
            })}
            <tr>
                <th colSpan={TITLES.length - 1}>TOTAL</th>
                <th>${priceTotal}</th>
            </tr>
        </tbody>
    </table>)
}

export default function Visualizer() {
    const { fetcher } = useYdk()

    return (
    <div className={styles.visualizerContainer}>
        {fetcher?.status === "IDLE" && <p>No info yet, try uploading a .ydk file!</p>}
        {fetcher?.status === "UPLOADING" && <p>Uploading ydk ({fetcher.value}%)...</p>}
        {fetcher?.status === "DOWNLOADING" && <p>Downloading prices ({fetcher.value}%)...</p>}
        {fetcher?.status === "ERROR" && <p>Sorry, an error ocurred. Try again! (<i>{fetcher.value}</i>)</p>}
        {fetcher?.status === "FINISHED" && <PriceTable />}
    </div>)
}