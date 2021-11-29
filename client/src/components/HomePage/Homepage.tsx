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
            <Box
                component='main'
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    marginBottom: '30px'
                }}
            >
                <SideBarHomePage />
                <Publicaciones />
            </Box>
            <Box sx={{ height: '50%' }} />
            <Footer />
        </Box>
    )
}

export default Homepage
