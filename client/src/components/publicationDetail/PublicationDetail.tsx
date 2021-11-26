import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Badge, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, Divider } from '@mui/material';
import { Box, shadows } from '@mui/system';
import Home from '../home/Home';
import axios from 'axios';
import FileUpload from '../fileUpload/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router';
import { ImageNotSupportedOutlined } from '@mui/icons-material';
// import { Publication } from '../../redux/reducer/stateTypes';


export interface Publication {
    _id: string;
    name: string;
    images?: { public_id: string, url: string }[];
    stock: number;
    mark: string;
    detail?: string;
    price: number;
    categorie: string;
    author: string;
    gender: "Hombre" | "Mujer" | "Niños";
    __v: number;
}


export default function PublicationDetail(): JSX.Element {

    const [publication, setPublication] = useState<Publication | undefined>();

    const [imageShow, setImageShow] = useState<string>();


    const { publicationId } = useParams();


    useEffect(() => {
        if (publicationId && publicationId.length > 0) {
            console.log(publicationId)
            axios.get('http://localhost:3001/publication', {
                params: { publicationId: publicationId }
            }).then(({ data }) => {
                console.log(data, 'publicacion');
                setPublication(data);
                setImageShow(data.images[0].url)
            });
        }
    }, []);


    function imageToShow(img: string): void {
        setImageShow(img)
    }



    return (<>

        <Home></Home>
        <Box sx={{ backgroundColor: '#eeeeee', minHeight: '93.3vh', height: 'max-content' }}>

            <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '30vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                </Box>
            </Box>

            <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>

                <Container sx={{ mt: -18, position: 'absolute' }}>

                    <Grid item component="div"

                        container
                        // boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, justifyContent: 'center' }}>
                        boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>


                        <Grid item
                            xs={1}
                            sx={{
                                my: 4, cursor: 'pointer'
                                // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                            }}

                        >
                            {publication && publication?.images?.map(img => {
                                return <span onMouseEnter={() => imageToShow(img.url)}>
                                    <Avatar sx={{ mt: 2, width: 50, height: 50, '&:hover': { boxShadow: 5 } }} src={img.url} variant="square">

                                    </Avatar>
                                </span>
                            })
                            }

                        </Grid>

                        <Grid item
                            xs={7}
                            sx={{
                                '& > :not(style)': { my: 5 },
                                // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                            }}

                        >
                            {imageShow && <Avatar src={imageShow} variant="square" sx={{ width: 470, height: 470, borderRadius: 1 }} alt="" />

                            }




                        </Grid>

                        {/* <Divider orientation="vertical" light flexItem sx={{ my: 3, mx: 5 }} /> */}


                        <Grid item xs={4}
                            sx={{
                                mt: 5, boxShadow: 2, p: 3, minHeight: 'max-content', height: 'max-content'
                                // '& > :not(style)': { mt: 5 },
                            }}>

                            <Typography>
                                <p>
                                    Marca: {publication && publication?.mark}
                                </p>
                            </Typography>

                            <Typography>
                                <p>
                                    Categoría: {publication && publication?.categorie}
                                </p>
                            </Typography>

                            <Typography variant="h5" component="h5">
                                {publication?.name}
                            </Typography>

                            <Typography>
                                <p>
                                    {publication && publication?.detail}
                                </p>
                            </Typography>

                            <Typography variant="h5" component="h5" sx={{ py: 3 }}>
                                $ {publication?.price}
                            </Typography>

                            <Grid item container component="div"
                                sx={{

                                    // '& > :not(style)': { mt: 5 },
                                }}>

                                <Grid item xs={6}
                                    sx={{

                                        // '& > :not(style)': { mt: 5 },
                                    }}>

                                    <Typography variant="h6" component="h6">
                                        {publication && publication?.stock > 0 ? 'Stock disponible' : 'Sin stock'}
                                    </Typography>

                                </Grid>

                                <Grid item xs={6}
                                    sx={{
                                        justifyContent: 'right', display: 'flex'
                                        // '& > :not(style)': { mt: 5 },
                                    }}>

                                    <FormControl variant="standard">
                                        {/* <InputLabel id="demo-simple-select-standard-label">Cantidad</InputLabel> */}
                                        <Select defaultValue={1}
                                            // onChange={handleForm}
                                            // value={gender}
                                            // name="gender"
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Categoría"
                                        >
                                            {
                                                Array.from(Array(publication?.stock).keys()).map((s, i) => {
                                                    return <MenuItem value={i+1}>{i+1}</MenuItem>
                                                })
                                            }
                                            {/* <MenuItem value="">
                                                <em>Seleccionar cantidad</em>
                                            </MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem> */}
                                        </Select>
                                    </FormControl>

                                </Grid>

                            </Grid>

                            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                                Añadir al carrito
                            </Button>


                        </Grid>


                        {/* <Divider sx={{ my: 3, mx: 5, width: '100%' }} />


                        <Grid item xs={12} sx={{}}>

                            <Typography variant="h5" component="h5">
                                Características principales
                            </Typography>

                            <Typography>
                                <p>
                                    Marca: {publication && publication?.mark}
                                </p>
                            </Typography>
                            <Typography>
                                <p>
                                    Categoría: {publication && publication?.categorie}
                                </p>
                            </Typography>

                        </Grid>

                        <Divider sx={{ my: 3, mx: 5, width: '100%' }} />

                        <Grid item xs={12} sx={{}}>

                            <Typography variant="h5" component="h5">
                                Descripción
                            </Typography>

                            <Typography>
                                <p>
                                    {publication && publication?.detail}
                                </p>
                            </Typography>

                        </Grid> */}
                    </Grid>


                </Container>

            </Box>
        </Box>
    </>)
}