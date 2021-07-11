import Select from '@Components/Select'
import useCalculator from '@Hooks/useCalculator'

export default function TableBody({ id, name, quantity, boxes, rarities, prices, dispatcher }) {
    const { finalPrice, boxIndex, tagIndex, setBoxIndex, setTagIndex } = useCalculator(id, quantity, prices, dispatcher)

    return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>
            <Select options={boxes} value={boxIndex} onChange={setBoxIndex} />
        </td>
        <td>{rarities[boxIndex]}</td>
        <td>
            <Select options={[
                `Low - $${prices[boxIndex][0].toFixed(2)}`,
                `Average - $${prices[boxIndex][1].toFixed(2)}`,
                `High - $${prices[boxIndex][2].toFixed(2)}`
            ]} value={tagIndex} onChange={setTagIndex} />
        </td>
        <td>${finalPrice.toFixed(2)}</td>
    </tr>)
}