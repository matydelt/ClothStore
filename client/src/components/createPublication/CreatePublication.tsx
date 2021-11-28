import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Badge, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, Divider } from '@mui/material';
import { Box, shadows } from '@mui/system';
import Home from '../home/Home';
import axios from 'axios';
import FileUpload from '../fileUpload/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router';
import { ImageNotSupportedOutlined } from '@mui/icons-material';

interface CreatePublicationForm {
    name: string,
    detail: string,
    mark: string,
    category: string,
    gender: string,
    stock: 0,
    price: 0,
    images: { public_id: string, url: string }[]
}

export default function CreatePublication(): JSX.Element {

    const [form, setForm] = useState<CreatePublicationForm>({
        name: '',
        detail: '',
        mark: '',
        category: '',
        gender: '',
        stock: 0,
        price: 0,
        images: []
    });

    const { name, detail, mark, stock, price, category, gender, images } = form;


    const { publicationId } = useParams();


    useEffect(() => {
        if (publicationId && publicationId.length > 0) {
            console.log(publicationId)
            axios.get('http://localhost:3001/publication', {
                params: { publicationId: publicationId }
            }).then(({ data }) => {
                // console.log(data, 'publicacion');
                setForm({
                    ...data
                })
            });
        }
    }, []);


    function handleForm(e: any): void {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function submitForm(e: any): void {
        e.preventDefault();

        // setForm({...form, images: images.map((img: any) => img.url) });
        // console.log(form)

        axios.post('http://localhost:3001/publications/new', form, { params: { publicationId } }).then(({ data }) => {
            console.log(data);
            setForm({
                name: '',
                detail: '',
                mark: '',
                category: '',
                gender: '',
                stock: 0,
                price: 0,
                images: []
            });
        });
    }

    function removeImage(imageId: string): void {
        axios.post('http://localhost:3001/removeimage', { imageId }).then(({ data }) => {
            console.log(data);
            setForm({ ...form, images: images.filter((img: any) => img.public_id !== imageId) });
        }).catch(err => console.log(err));

    }



    return (<>

        <Home></Home>
        <Box sx={{ backgroundColor: '#eeeeee', minHeight: '105vh', height: 'max-content' }}>

            <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '30vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Typography variant="h4" component="h4" sx={{ p: 6 }}>
                        {publicationId ? 'Actualiza tu producto' : 'Publica tu producto'}
                    </Typography>

                </Box>
            </Box>

            {/* <Box sx={{ backgroundColor: '#eeeeee', minHeight: 'calc(100vh - 400px)' }}> */}



            <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>

                <Container sx={{ mt: -18, position: 'absolute' }}>

                    <Grid item component="form"
                        onSubmit={submitForm}
                        noValidate
                        autoComplete="off"
                        container
                        boxShadow={1} sx={{ backgroundColor: 'white', px: 3, borderRadius: 2, justifyContent: 'center' }}>


                        <Grid item
                            xs={5}
                            sx={{
                                '& > :not(style)': { my: 3, width: '45ch' },
                                // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                            }}

                        >


                            <TextField
                                onChange={handleForm}
                                value={name}
                                name="name"
                                id="standard-basic"
                                label="Nombre del producto"
                                variant="standard" />

                            <TextField
                                onChange={handleForm}
                                value={mark}
                                name="mark"
                                id="standard-basic"
                                label="Marca"
                                variant="standard" />

                            <TextField
                                onChange={handleForm}
                                value={detail}
                                name="detail"
                                id="standard-textarea"
                                label="Descripción"
                                // placeholder="Placeholder"
                                multiline
                                variant="standard"
                            />

                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Precio</InputLabel>
                                <Input
                                    onChange={handleForm}
                                    value={price}
                                    name="price"
                                    id="standard-adornment-amount"
                                    type="number"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>

                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Stock</InputLabel>
                                <Input
                                    onChange={handleForm}
                                    value={stock}
                                    name="stock"
                                    id="standard-adornment-amount"
                                    type="number"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                />
                            </FormControl>

                            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}> */}
                            <FormControl variant="standard">
                                <InputLabel id="demo-simple-select-standard-label">Categoría</InputLabel>
                                <Select
                                    onChange={handleForm}
                                    value={category}
                                    name="category"
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Categoría"
                                >
                                    <MenuItem value="">
                                        <em>Seleccionar</em>
                                    </MenuItem>
                                    <MenuItem value={'Remera'}>Remera</MenuItem>
                                    <MenuItem value={'Patanlon'}>Pantalón</MenuItem>
                                    <MenuItem value={'Zapatillas'}>Zapatillas</MenuItem>
                                    <MenuItem value={'Zapatos'}>Zapatos</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="standard">
                                <InputLabel id="demo-simple-select-standard-label">¿Para quién es este producto?</InputLabel>
                                <Select
                                    onChange={handleForm}
                                    value={gender}
                                    name="gender"
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Categoría"
                                >
                                    <MenuItem value="">
                                        <em>Seleccionar</em>
                                    </MenuItem>
                                    <MenuItem value={'Hombre'}>Hombre</MenuItem>
                                    <MenuItem value={'Mujer'}>Mujer</MenuItem>
                                    <MenuItem value={'Niños'}>Niños</MenuItem>
                                </Select>
                            </FormControl>





                        </Grid>

                        <Divider orientation="vertical" light flexItem sx={{ my: 3, mx: 5 }} />


                        <Grid item xs={6} sx={{ mt: 4 }}>
                            <Grid item xs={12} sx={{ ml: 1 }}>
                                <FileUpload form={form} setForm={setForm} />
                            </Grid>

                            {
                                form.images.length > 0 ? form.images.map((image: any) => {
                                    return <Badge key={image.public_id}

                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        badgeContent={
                                            <CancelIcon onClick={() => removeImage(image.public_id)} sx={{ cursor: 'pointer', ml: 1.5, mt: 0.5, color: 'red' }}></CancelIcon>
                                        }

                                    >
                                        <a href={image.url} target="_blank">
                                            <Avatar
                                                alt="image"
                                                src={image.url}
                                                sx={{ width: 150, height: 150, m: 1, mt: 2, boxShadow: 5, borderRadius: 0.5 }}
                                                variant="square"

                                            />
                                        </a>
                                    </Badge>


                                })
                                    :
                                    <Box component='div' sx={{ mt: 10 }}>
                                        <Box component='h3' sx={{ display: 'flex', justifyContent: 'center' }}>Aún no has subido imágenes</Box>
                                        <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <ImageNotSupportedOutlined fontSize='large' color="disabled" sx={{ fontSize: '200px', display: 'flex' }}></ImageNotSupportedOutlined>
                                        </Box>
                                    </Box>

                            }
                        </Grid>

                        <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>

                            <Button
                                type="submit"
                                sx={{ backgroundColor: "primary", my: 7 }}
                            >
                                {publicationId ? 'Actualizar publicación' : 'Publicar'}
                            </Button>

                        </Grid>
                    </Grid>


                </Container>

            </Box>
        </Box>
    </>)
}