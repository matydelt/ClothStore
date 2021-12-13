import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { Link } from "react-router-dom"
import DiscountModal from "./DiscountModal/DiscountModal"
import Button from '@mui/material/Button';
import ModalQA from "./ModalQA"

interface Publication {
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
    _id: string;
    discount: any;
}
interface Articulos {
    articulos: [Publication]
}
interface User {
    id: string | undefined
}
export default function ListProducts(props: User) {
    const [articulos, setArticulos] = React.useState<[Publication]>([{
        name: "",
        images: [],
        stock: 0,
        mark: "",
        detail: "",
        price: 0,
        category: "",
        author: "",
        gender: "",
        key: "",
        _id: "",
        discount: ""
    }])
    React.useEffect(() => {
        // async function getOneUser() {
        //     await axios.get(`http://localhost:3001/auth/${props.id}`).then(({ data }) => {
        //         setArticulos(data.publications)
        //     })
        // }
        // getOneUser()
        getPublications()
    }, [])

    function getPublications(): void {
        axios.get(`http://localhost:3001/publications`, { params: { authorId: props.id } }).then(({ data }) => {
            setArticulos(data)
        });
    };

    function removeDiscount(publicationId: string): void {
        axios.post('/discount/remove', { publicationId }).then(({ data }) => {
            console.log(data)
            getPublications();
        });
    };

    return (
        <Box style={{ marginTop: "100px", marginLeft: "100px" }}>
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
                                <TableCell align="right">Precio descuento</TableCell>
                                <TableCell align="center">Opciones</TableCell>
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
                                    <TableCell align="right">
                                        {e.discount &&
                                            <Box component="div">

                                                {(e.price - e.price * e.discount.percentage / 100) + ` (${e?.discount?.percentage}%)`}
                                                <Button onClick={() => removeDiscount(e._id)}>Cancelar</Button>
                                            </Box>
                                        }
                                    </TableCell>
                                    <TableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} align="right">
                                        <DiscountModal userId={props?.id} publicationId={e?._id} getPublications={getPublications}>
                                            <Button>{e.discount ? 'Reemplazar descuento' : 'Aplicar descuento'}</Button>
                                        </DiscountModal>
                                        <ModalQA id={e._id} />
                                        <Link to={`/actualizar-publicacion/${e._id}`}><Button>Actualizar</Button></Link></TableCell>
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
