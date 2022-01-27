import config from "./config.json";
//simple component
const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>&nbsp;</th>
        </tr>
        </thead>
    )
}

//simple component
const TableBody = (props) => {
    const rows = props.items.map((row, index) => {
        const shortened_url = config.SERVER_URL + row.url_code
        return (
            <tr key={index}>
                <td>{row.original_url}</td>
                <td>
                    <a href={shortened_url} target="_blank" rel="noreferrer">{shortened_url}</a>
                </td>
                <td>
                    <a href={"#"} style={{color:"#d33c40"}} onClick={() => {
                        props.removeItem(row.id)
                    }}>X
                    </a>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}
const Table = (props) => {
    const {urlItems, removeItem} = props
    return (
        <table style={{marginTop: "20px"}}>
            <TableHeader/>
            <TableBody items={urlItems} removeItem={removeItem}/>
        </table>
    )
}

export default Table
