import React from 'react'
import Header from './Header/Header'
import Publicaciones from './publicaciones/publicaciones'
import { Box } from '@mui/system'
import SideBarHomePage from './SideBarHomePage/SideBarHomePage'
const Homepage = () => {
    return (
        <>
            <Header />
            <Box
                component='main'
                sx={{
                    height: '700px',
                    width: '100%',
                    display: 'flex'
                }}
            >
                <SideBarHomePage />
                <Publicaciones />
            </Box>
        </>
    )
}

export default Homepage
