import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow,TableBody, List, ListItemButton, ListItemText, Collapse, ListItem, ListItemIcon, Checkbox, Button } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { Link } from "react-router-dom"
import ReviewForm from "./reviewForm/ReviewForm"

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

    const [open1, setOpen1] = React.useState(true);
    const handleClick1 = () => {
        setOpen1(!open1);
        if(open1){
            const order = articulos.sort((a, b) => {
                if (a._id > b._id) return 1;
                else if (a._id < b._id) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a._id < b._id) return 1;
                else if (a._id > b._id) return -1;
                else return 0;
                setArticulos(order)
          });
        }
    };
    
    
    const [open2, setOpen2] = React.useState(true);
    const handleClick2 = () => {
        setOpen2(!open2);
        if(open2){
            const order = articulos.sort((a, b) => {
                if (a.date.split("T")[0] > b.date.split("T")[0]) return 1;
                else if (a.date.split("T")[0] < b.date.split("T")[0]) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a.date.split("T")[0] < b.date.split("T")[0]) return 1;
                else if (a.date.split("T")[0] > b.date.split("T")[0]) return -1;
                else return 0;
                setArticulos(order)
            });
        };
    }
    
    const [open21, setOpen21] = React.useState(true);
    const handleClick21 = () => {
        setOpen21(!open21);
        if(open21){
            const order = articulos.sort((a, b) => {
                if (a.date.split("T")[1].split(".")[0] > b.date.split("T")[1].split(".")[0]) return 1;
                else if (a.date.split("T")[1].split(".")[0] < b.date.split("T")[1].split(".")[0]) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a.date.split("T")[1].split(".")[0] < b.date.split("T")[1].split(".")[0]) return 1;
                else if (a.date.split("T")[1].split(".")[0] > b.date.split("T")[1].split(".")[0]) return -1;
                else return 0;
                setArticulos(order)
            });
        };
    }

    const [open3, setOpen3] = React.useState(true);
    const handleClick3 = () => {
        setOpen3(!open3);
        if(open3){
            const order = articulos.sort((a, b) => {
                if (a.status > b.status) return 1;
                else if (a.status < b.status) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a.status < b.status) return 1;
                else if (a.status > b.status) return -1;
                else return 0;
                setArticulos(order)
            });
        }
    }
    
    const [open4, setOpen4] = React.useState(true);
    const handleClick4 = () => {
        setOpen4(!open4);
        if(open4){
            const order = articulos.sort((a, b) => {
                if (a.amount > b.amount) return 1;
                else if (a.amount < b.amount) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a.amount < b.amount) return 1;
                else if (a.amount > b.amount) return -1;
                else return 0;
                setArticulos(order)
            });
        }
    }


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
                                <TableCell>
                                    <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                        <ListItemButton onClick={handleClick1}>
                                            <ListItemText primary="Numero de compra" />
                                            {open1 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </List>
                                </TableCell>
                                <TableCell align="right">
                                    <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                        <ListItemButton onClick={handleClick2}>
                                            <ListItemText primary="Fecha" />
                                            {open2 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </List>
                                </TableCell>
                                <TableCell align="right">
                                    <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                        <ListItemButton onClick={handleClick21}>
                                            <ListItemText primary="Hora" />
                                            {open21 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </List>
                                </TableCell>
                                <TableCell align="right">
                                    <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                        <ListItemButton onClick={handleClick3}>
                                            <ListItemText primary="Status" />
                                            {open3 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </List>
                                </TableCell>
                                <TableCell align="right">
                                    <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                        <ListItemButton onClick={handleClick4}>
                                            <ListItemText primary="Monto" />
                                            {open4 ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </List>
                                </TableCell>
                                <TableCell align="right">
                                    <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                        <ListItemButton >
                                            <ListItemText primary="Detalle de la compra" />        
                    {/* <TableCell>
                    { e.status !=='approved' ?
                        <ReviewForm publicationId={e._id}></ReviewForm>
                        :
                        <Button disabled>Falta pagar</Button>
                        }
                    </TableCell> */}
                                        </ListItemButton>
                                    </List>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {articulos?.map((e) => (
                                <TableRow
                                key={e._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {e._id}
                                        </List>
                                    </TableCell>
                                    <TableCell align="center">
                                        <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {e.date == "" ? e.date : e.date.split("T")[0]}
                                        </List>
                                    </TableCell>
                                    <TableCell align="center">
                                        <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {e.date == "" ? e.date : e.date.split("T")[1].split(".")[0]}
                                        </List>
                                    </TableCell>
                                    <TableCell align="center">
                                        <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {e.status}
                                        </List>
                                    </TableCell>
                                    <TableCell align="center">
                                        <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {e.amount}
                                        </List>
                                    </TableCell>
                                    <TableCell align="center">
                                        <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                            <Link to={`/`}>
                                                <button>Detalle</button>
                                            </Link>
                                        </List>
                                    </TableCell>
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
