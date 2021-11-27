import { Badge, Box, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import React, { useContext } from "react";
import { DataContext } from "../../../../context/DataProvider";
import "./cardPublication.css"
import { Link } from "react-router-dom";
type Props = {
    name: string;
    images: any[];
    stock: number;
    mark: string;
    detail: string;
    price: number;
    categorie: string;
    author: string;
    gender: string;
    key: string;
    id: string;
}
export default function CardPublicacion(props: Props) {
    const value = useContext(DataContext);
    const { name, images, mark, detail, price, categorie, id } = props
    console.log(images)
    return (<Badge>
        <Box className="publication" style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Carousel >{images.map((item, i) => <Item key={i} item={item} />)}</Carousel>
            <hr></hr>
            <Box className="namePublication">
                <Typography>{name}</Typography>
            </Box>

            <Typography>{categorie}</Typography>
            <Typography >$ {`  ${price}`}</Typography>
            {/* <Typography>{mark}</Typography> */}
            <Box className="buttonsPublication">
                <Box className="buttonBox">
                    <button className="bottonPublication" onClick={() => { value.addCarrito(id) }}>🛒</button>
                </Box>
                <Box className="buttonBox">
                    <Link to={`/publication/${id}`}>
                        <button className="bottonPublication" >ver producto</button>
                    </Link>
                </Box>
            </Box>
        </Box>
    </Badge>)
}


function Item(props: any) {
    return (
        <Paper>
            {/* <h4>{props.item.name}</h4> */}
            {/* <p>{props.item.description}</p> */}
            <Box style={{ height: "150px", width: "200px", padding: "4px", justifyContent: "center", display: "flex" }}>
                <img src={props.item.url} style={{ maxHeight: "150px", maxWidth: "200px", borderRadius: "3px" }} />
            </Box>
            {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
        </Paper>
    )
}