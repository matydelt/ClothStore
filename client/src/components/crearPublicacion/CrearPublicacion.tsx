import React, { useState } from 'react';
import { Avatar, Button, Container, Divider, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, shadows } from '@mui/system';
import Home from '../home/Home';
import axios from 'axios';
import SubidaImagenes from '../subidaImagenes/SubidaImagenes';

export default function CrearPublicacion() {

    const [form, setForm] = useState({
        name: '',
        detail: '',
        mark: '',
        categorie: '',
        gender: '',
        stock: 0,
        price: 0,
        images: []
    });

    const { name, detail, mark, stock, price, categorie, gender, images } = form;


    function handleForm(e: any) {
        console.log(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function submitForm(e: any) {
        e.preventDefault();
        console.log(form);

        axios.post('http://localhost:3001/publications/new', form).then(({ data }) => {
            console.log(data);

        });
    }



    return (<>

        <Home></Home>

        {/* {JSON.stringify(form.images)} */}
        {console.log(form.images)
        }

        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '30vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                <Typography variant="h4" component="h4" sx={{ p: 10 }}>
                    Publicá tu producto
                </Typography>
                {/* <Divider ></Divider> */}
            </Box>
        </Box>

        <Box sx={{ backgroundColor: '#eeeeee', minHeight: '90vh' }}>
        </Box>


        <Box sx={{ mt: -125 }}>
            {/* <Box sx={{ zIndex: 50, mt: -125 }}> */}


            <Container >


                <Box component={Grid}
                    container
                    boxShadow={1} sx={{ backgroundColor: 'white', p: 2, mt: 4, borderRadius: 2, justifyContent: 'center' }}>


                    <Box
                        onSubmit={submitForm}
                        component="form"
                        sx={{
                            '& > :not(style)': { mx: 50, my: 3, width: '50ch' },
                            // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                        }}
                        noValidate
                        autoComplete="off"
                    >


                        <TextField
                            onChange={handleForm}
                            value={name}
                            name="name"
                            id="standard-basic"
                            label="Nombre"
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

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
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

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
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
                        <FormControl variant="standard" sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-standard-label">Categoría</InputLabel>
                            <Select
                                onChange={handleForm}
                                value={categorie}
                                name="categorie"
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Categoría"
                            >
                                <MenuItem value="">
                                    <em>Ninguna</em>
                                </MenuItem>
                                <MenuItem value={'Remera'}>Remera</MenuItem>
                                <MenuItem value={'Patanlon'}>Pantalón</MenuItem>
                                <MenuItem value={'Zapatillas'}>Zapatillas</MenuItem>
                                <MenuItem value={'Zapatos'}>Zapatos</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-standard-label">Género</InputLabel>
                            <Select
                                onChange={handleForm}
                                value={gender}
                                name="gender"
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Categoría"
                            >
                                <MenuItem value="">
                                    <em>Ninguna</em>
                                </MenuItem>
                                <MenuItem value={'Hombre'}>Hombre</MenuItem>
                                <MenuItem value={'Mujer'}>Mujer</MenuItem>
                                <MenuItem value={'Niños'}>Niños</MenuItem>
                            </Select>
                        </FormControl>

                        <SubidaImagenes form={form} setForm={setForm} />



                        <Button
                            type="submit"
                            sx={{ backgroundColor: "primary" }}
                            >
                            Publicar
                        </Button>
                    </Box>

                                {form.images && form.images.map((image: any) => {
                                    return <Avatar key={image.public_id}
                                        alt="image"
                                        src={image}
                                        sx={{ width: 150, height: 150, m: 1, mt:2 }}
                                    />
                                })
                                }

                </Box>


            </Container>

        </Box>

    </>)
}