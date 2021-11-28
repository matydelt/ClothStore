import React from 'react'
import Header from './Header/Header'
import Publicaciones from './publicaciones/publicaciones'
import { Box } from '@mui/system'
import SideBarHomePage from './SideBarHomePage/SideBarHomePage'
import Footer from '../Footer'
const Homepage = () => {
    return (
        <>
            <Header />
            <Box
                component='main'
                sx={{
                    width: '100%',
                    display: 'flex',
                }}
            >
                <SideBarHomePage />
                <Publicaciones />
            </Box>
            {/* <Footer></Footer> */}
        </>
    )
}

export default Homepage
