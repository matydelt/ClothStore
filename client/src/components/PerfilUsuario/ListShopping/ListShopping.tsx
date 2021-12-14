import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow,TableBody } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { Link } from "react-router-dom"

interface Shopping  {
    author: string;
    key: string;
    _id: string;
    amount: number;
    link: string;
    status: string;
    status_detail: string;
    date: string;
}
interface Articulos{
    articulos:[Shopping]
}
interface User{
    id:string|undefined
}
export default function ListShopping(props:User) {
    const [articulos, setArticulos] = React.useState<[Shopping]>([{
        author: "",
        key: "",
        _id: "",
        amount: 0,
        link: "",
        status: "",
        status_detail: "",
        date: "",
    }],)
    React.useEffect(() => {
        async function getOneUser() {
            await axios.get(`http://localhost:3001/auth/${props.id}`).then(({ data }) => {
                setArticulos(data.shopping)
            })
        }
        getOneUser()
    }, [])
    return (
        <Box style={{marginTop: "100px",marginLeft: "100px"}}>
            <div style={{ display: "flex", justifyContent: "center" }}>

<h3>Compras</h3>
</div>
{articulos?.length > 0 ?
<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
                <TableCell>Numero de compra</TableCell>
                <TableCell align="right">Fecha</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Detalle de la compra</TableCell>
                <TableCell align="right">#</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {articulos?.map((e) => (

                <TableRow
                    key={e._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {e._id}
                    </TableCell>
                    <TableCell align="right">{e.date}</TableCell>
                    <TableCell align="right">{e.status}</TableCell>
                    <TableCell align="right">{e.amount}</TableCell>
                    <TableCell align="right"> <Link to={`/`}><button>Detalle</button></Link></TableCell>
                    <TableCell align="right"> <Link to={`${e.link}`}><button disabled={e.status=='pending'?false:true}>Pagar</button></Link></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
:
<div style={{ display: "flex", justifyContent: "center" }}>
    <h4>No se han realizado compras</h4>
</div>
}
        </Box>
    )
}
