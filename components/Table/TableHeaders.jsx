export default function TableHeaders({ titles }) {
    return titles.map((title, index) => (
        <th key={index} title={title}>{title}</th>
    ))
}