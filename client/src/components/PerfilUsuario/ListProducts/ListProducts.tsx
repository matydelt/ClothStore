import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow,TableBody } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { Link } from "react-router-dom"

interface Publication  {
    name: string;
    images: any[];
    stock: number;
    mark: string;
    detail: string;
    price: number;
    category: string;
    author: string;
    gender: string;
    key: string;
    id: string;
}
interface Articulos{
    articulos:[Publication]
}
interface User{
    id:string|undefined
}
export default function ListProducts(props:User) {
    const [articulos, setArticulos] = React.useState<[Publication]>([{
        name:"",
        images: [],
        stock:0,
        mark: "",
        detail: "",
        price: 0,
        category: "",
        author: "",
        gender: "",
        key: "",
        id: "",
    }],)
    React.useEffect(() => {
        async function getOneUser() {
            await axios.get(`http://localhost:3001/auth/${props.id}`).then(({ data }) => {
                setArticulos(data.publications)
            })
        }
        getOneUser()
    }, [])
    return (
        <Box style={{marginTop: "100px",marginLeft: "100px"}}>
            <div style={{ display: "flex", justifyContent: "center" }}>

<h3>Publicaciones</h3>
</div>
{articulos?.length > 0 ?
<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
                <TableCell>Nombre de articulo</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Genero</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">#</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {articulos?.map((e) => (

                <TableRow
                    key={e.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {e.name}
                    </TableCell>
                    <TableCell align="right">{e.mark}</TableCell>
                    <TableCell align="right">{e.category}</TableCell>
                    <TableCell align="right">{e.gender}</TableCell>
                    <TableCell align="right">{e.price}</TableCell>
                    <TableCell align="right"> <Link to={`/actualizar-publicacion/${e.id}`}><button>Actualizar</button></Link></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
:
<div style={{ display: "flex", justifyContent: "center" }}>
    <h4>No se han realizado publicaciones</h4>
</div>
}
        </Box>
    )
}
