import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { Link } from "react-router-dom"

interface Sales {
    amount: number;
    date: string;
    status: string;
    status_detail: string;
    codigo: string;
    key: string;
    _id: string;
}
interface Articulos {
    articulos: [Sales]
}
interface User {
    id: string | undefined
}
export default function ListSales(props: User) {
    const [articulos, setArticulos] = React.useState<[Sales]>([{
        amount: 0,
        date: "",
        status: "",
        status_detail: "",
        codigo: "",
        key: "",
        _id: "",
    }])
    React.useEffect(() => {
        async function getOneUser() {
            await axios.get(`/auth/${props.id}`).then(({ data }) => {
                setArticulos(data.sales)
            })
        }
        getOneUser()
    }, [])
    return (
        <Box style={{ marginTop: "100px", marginLeft: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>

                <h3>Ventas</h3>
            </div>
            {articulos?.length > 0 ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Venta numero</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                                <TableCell align="right">Estado</TableCell>
                                <TableCell align="right">Codigo</TableCell>
                                <TableCell align="right">Monto</TableCell>
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
                                    <TableCell align="right">{e.codigo}</TableCell>
                                    <TableCell align="right">{e.amount}</TableCell>
                                    <TableCell align="right"> <Link to={`/`}><button>Detalle</button></Link></TableCell>                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h4>No se han realizado ventas</h4>
                </div>
            }
        </Box>
    )
}
