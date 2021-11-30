import React from 'react'
import Header from './Header/Header'
import Publicaciones from './publicaciones/publicaciones'
import { Box } from '@mui/system'
import SideBarHomePage from './SideBarHomePage/SideBarHomePage'
import Footer from '../Footer'
import { Container } from '@mui/material'
const Homepage = () => {
    return (
        <Box>
            <Header />
            <Container
                id='tienda'
                maxWidth='lg'
            >
                <Box
                    component='main'
                    sx={{
                        height: '100%',
                        maxWidth: '1215px',
                        paddingLeft: '10px',
                        paddingRight: '28px',
                        width: '100%',
                        display: 'flex',
                        marginBottom: '30px'
                    }}
                >
                    <SideBarHomePage />
                    <Publicaciones />
                </Box>
            </Container>
            <Box sx={{ height: '50%' }} />
            <Footer />
        </Box >
    )
}

export default Homepage
