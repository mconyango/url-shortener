//simple component
const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Delete</th>
        </tr>
        </thead>
    )
}

//simple component
const TableBody = (props) => {
    const rows = props.urlItems.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.original_url}</td>
                <td>{row.shortened_url}</td>
                <td>
                    <button onClick={() => {
                        props.removeItem(index)
                    }}>Delete
                    </button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}
const Table = (props) => {
    const {urlItems, removeItem} = props
    return (
        <table>
            <TableHeader/>
            <TableBody urlItems={urlItems} removeItem={removeItem}/>
        </table>
    )
}

export default Table
