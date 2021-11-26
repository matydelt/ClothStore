import { Badge, Box, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import React, { useContext } from "react";
import { DataContext } from "../../../../context/DataProvider";
import "./cardPublication.css"
type Props= {
    name: string;
    images: any[];
    stock: number;
    mark: string;
    detail: string;
    price: number;
    categorie: string;
    author: string;
    gender: string;
    key:string;
    id:string;
}
export default function CardPublicacion(props:Props) {
    const value = useContext(DataContext);
    const { name, images, stock, mark, detail, price, categorie, gender,id } = props
    const aux = {detail,name}
    return (<Badge>
        <Box  className="publication" style={{marginLeft:"5px", marginRight:"5px"}}>
        <Carousel >{images.map( (item, i) => <Item key={i} item={aux} /> )}</Carousel>
        <hr></hr>
        <Typography>{categorie}</Typography>
        <Typography>$ {price}</Typography>
        {/* <Typography>marca: {mark}</Typography> */}
        {/* <Typography>genero: {gender}</Typography> */}
        <Button variant="contained" color="success" style={{marginTop:"5px"}} onClick={()=>{value.addCarrito(id)}}>Agregar al carrito</Button>
        </Box>
    </Badge>)
}


function Item(props:any)
{
    return (
        <Paper>
            <h4>{props.item.name}</h4>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}