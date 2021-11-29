import { Badge, Box, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import React, { useContext } from "react";
import { DataContext } from "../../../../context/DataProvider";
import "./cardPublication.css"
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid'



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
    console.log(typeof images)
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Card className='cardMain' sx={{ maxWidth: 200, borderBottom: '2px solid #00c2cb' }} >
                <CardMedia className='showButton_Cart_Info' sx={{overflow: 'hidden'}}>
                    <Carousel 
                    navButtonsProps={{ style: {backgroundColor: 'transparent', borderRadius: '0', color: '#000'}}} 
                    >
                        {images.length === 0 ? <Item item={"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"} /> : images.map((item, i) => <Item key={i} item={item} />)}
                    </Carousel>

                    <Box className='noshowButton_Cart_Info' sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton onClick={() => { value.addCarrito(id) }} aria-label='Add to Cart' sx={{ backgroundColor: '#00c2cb', borderRadius: '50%' }} size='large' color="primary">
                            <ShoppingCartIcon />
                        </IconButton>
                        <Link to={`/publication/${id}`}>
                            <IconButton sx={{ backgroundColor: '#00c2cb' }} size='large' color="primary">
                                <InfoIcon />
                            </IconButton>
                        </Link>
                    </Box>
                </CardMedia>


                <CardContent>
                    <Typography sx={{ fontSize: '19px', textAlign: 'center' }} variant='h5'>{name}</Typography>
                    <Typography sx={{ fontSize: '17px', textAlign: 'center' }} variant='body2'>$ {`  ${price}`}</Typography>
                    <Typography variant='body1'>{categorie}</Typography>
                </CardContent>

                {/* <Typography>{mark}</Typography> */}
                {/* <Box className="buttonsPublication">
                    <Box className="buttonBox">
                        <button className="bottonPublication" onClick={() => { value.addCarrito(id) }}>🛒</button>
                    </Box>
                    <Box className="buttonBox">
                        <Link to={`/publication/${id}`}>
                            <button className="bottonPublication" >ver producto</button>
                        </Link>
                    </Box>
                </Box> */}
            </Card>
        </Grid>)
}


function Item(props: any) {
    return (
        <Box>
            {/* <h4>{props.item.name}</h4> */}
            {/* <p>{props.item.description}</p> */}
            <Box style={{ height: "150px", width: "200px", padding: "4px", justifyContent: "center", display: "flex", alignItems: 'center' }}>
                <Box
                    component='img'
                    src={props.item.url || "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"}
                    alt='productoImage'
                    sx={{
                        maxHeight: "150px",
                        maxWidth: "200px",
                        borderRadius: "3px"
                    }}
                />
            </Box>
            {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
        </Box>
    )
}