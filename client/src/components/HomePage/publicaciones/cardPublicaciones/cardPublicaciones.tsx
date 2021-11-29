import { Box, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import React, { useEffect } from "react";
import "./cardPublication.css"
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid'
import { CartItemType, CartType } from "../../../../pages/CartScreen";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { cartLength } from "../../../../redux/actions/publicationActions";



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
    const [cart, setCart] = useLocalStorage<CartType>("cart", []);
    const { name, images, price, categorie, id, stock } = props
    const dispatch = useDispatch()

    const item: CartItemType = {
        id,
        amount: stock,
        price,
        image: images[0].url,
        title: name,
        category: categorie,

    }
    useEffect(() => {
        dispatch(cartLength())
    }, [cart, dispatch])
    const handleAddToCart = (clickedItem: CartItemType) => {
        setCart(() => {
            const isItemInCart = cart.find((item) => item.id === clickedItem.id);
            if (isItemInCart) {
                console.log(cart)
                isItemInCart.amount += 1;
                return cart;
            }
            console.log(clickedItem)
            return [...cart, { ...clickedItem, amount: 1 }];
        });
    };
    return (
        <Grid container spacing={4}
            sx={{
                width: '80%',
                marginTop: '50px'
            }}>
            <Card className='cardMain' sx={{ maxWidth: 200, borderBottom: '2px solid #00c2cb' }} >
                <CardMedia className='showButton_Cart_Info' sx={{ overflow: 'hidden' }}>
                    <Carousel autoPlay={false}
                        navButtonsProps={{ style: { backgroundColor: 'transparent', borderRadius: '0', color: '#000' } }}
                    >
                        {images.length === 0 ? <Item item={"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"} /> : images.map((item, i) => <Item key={i} item={item} />)}
                    </Carousel>

                    <Box className='noshowButton_Cart_Info' sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label='Add to Cart' sx={{ backgroundColor: '#00c2cb', borderRadius: '50%' }} size='large' color="primary" onClick={() => handleAddToCart(item)}>
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
            </Card>
        </Grid>)
}


function Item(props: any) {
    return (
        <Box>
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
        </Box>
    )
}