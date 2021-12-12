import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow,TableBody, List, ListItemButton, ListItemText } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { Link } from "react-router-dom"

interface Sales  {
    amount: number;
    date: string;
    status: string;
    status_detail: string;
    codigo: string;
    key: string;
    _id: string;
}
interface Articulos{
    articulos:[Sales]
}
interface User{
    id:string|undefined
}
export default function ListSales(props:User) {
    const [articulos, setArticulos] = React.useState<[Sales]>([{
        amount: 0,
        date: "",
        status: "",
        status_detail: "",
        codigo: "",
        key: "",
        _id: "",
    }],)
    React.useEffect(() => {
        async function getOneUser() {
            await axios.get(`http://localhost:3001/auth/${props.id}`).then(({ data }) => {
                setArticulos(data.sales)
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
                if (a.date > b.date) return 1;
                else if (a.date < b.date) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a.date < b.date) return 1;
                else if (a.date > b.date) return -1;
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
                if (a.codigo > b.codigo) return 1;
                else if (a.codigo < b.codigo) return -1;
                else return 0;
                setArticulos(order)
            });
        }
        else{
            const order = articulos.sort((a, b) => {
                if (a.codigo < b.codigo) return 1;
                else if (a.codigo > b.codigo) return -1;
                else return 0;
                setArticulos(order)
            });
        }
    }
    
    const [open5, setOpen5] = React.useState(true);
    const handleClick5 = () => {
        setOpen5(!open5);
        if(open5){
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

<h3>Ventas</h3>
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
                            <ListItemText primary="Venta numero" />
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
                            <ListItemText primary="Codigo de Descuento" />
                            {open4 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        
                    </List>
                </TableCell>
                <TableCell align="right">
                    <List
                    component="nav"
                    aria-labelledby="nested-list-subheader">
                        <ListItemButton onClick={handleClick5}>
                            <ListItemText primary="Monto" />
                            {open5 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        
                    </List>
                </TableCell>
                <TableCell align="right">
                    <List
                    component="nav"
                    aria-labelledby="nested-list-subheader">
                        <ListItemButton>
                            <ListItemText primary="#" />
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
                        {e.date == "" ? e.date : e.date.split("T")[0] + " " + e.date.split("T")[1].split(".")[0]}
                        </List>
                    </TableCell>
                    <TableCell align="center">
                        <List
                        component="nav"
                        aria-labelledby="nested-list-subheader">{e.status}
                        </List>
                    </TableCell>
                    <TableCell align="center">
                        <List
                        component="nav"
                        aria-labelledby="nested-list-subheader">{e.codigo}
                        </List>
                    </TableCell>
                    <TableCell align="center">
                        <List
                        component="nav"
                        aria-labelledby="nested-list-subheader">{e.amount}
                        </List>
                    </TableCell>
                    <TableCell align="center">
                        <List
                        component="nav"
                        aria-labelledby="nested-list-subheader">
                            <Link to={`/`}><button>Detalle</button></Link>
                        </List>
                    </TableCell>
                </TableRow>
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
