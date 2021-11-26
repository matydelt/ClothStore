import { ViewCarousel } from "@mui/icons-material"
import { Badge, Box, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import React, { useContext } from "react";
import { DataContext } from "../../../../context/DataProvider";
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
}
export default function CardPublicacion(props:Props) {
    const value = useContext(DataContext);
    const { name, images, stock, mark, detail, price, categorie, gender,key } = props
    return (<Badge>
        <Box style={{marginLeft:"5px", marginRight:"5px"}}>
        <Typography>nombre: {name}</Typography>
        <Carousel >{images.map( (item, i) => <Item key={i} item={item} /> )}</Carousel>
        <Typography>marca: {mark}</Typography>
        <Typography>stock: {stock}</Typography>
        <Typography>precio: {price}</Typography>
        <Typography>categoria: {categorie}</Typography>
        <Button variant="contained" color="primary" onClick={()=>{value.addCarrito(key)}}>Agregar al carrito</Button>
        </Box>
    </Badge>)
}


function Item(props:any)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}