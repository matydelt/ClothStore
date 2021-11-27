import React from 'react'
import ButtonScroll from '../../../GeneralComponents/ButtonScroll'
import ButtonsNav from '../../../GeneralComponents/ButtonsNav'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo/ClothStore_logotipo_sin_fondo.png';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton'
import {
    MyNavBarHeader,
    MyToolbarHeader
} from '../NavBar/NavBarStyles'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';






const NavBar = () => {

    return (
        <>
            <MyNavBarHeader position="static">
                <Toolbar>
                    <Box
                        component='img'
                        src={Logo}
                        alt='ClothStore'
                        sx={{
                            width: { lg: '15%', xl: '20%' },
                            position: 'absolute',
                            zIndex: '1',
                            left: '0',
                            bottom: { xl: '-245%;' }
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        alignItems: { xl: 'center' },
                        transform: { lg: 'translateX(60%)', xl: 'translateX(86%)' },
                        zIndex: '10'
                    }}
                    >
                        <Box sx={{ fontSize: { xl: '25px' }, marginRight: { lg: '16px', xl: '25px' } }}>
                            <ButtonsNav
                                link="/"
                                text="HOME"
                                nameClass='textDecoration colorPrimary buttonLink'
                            />
                        </Box>

                        <Box sx={{ marginRight: { lg: '16px', xl: '25px' } }}>
                            <Box
                                component='a'
                                href="#"
                                className='buttonLink colorPrimary textDecoration'
                                sx={{ fontSize: { xl: '25px' }}}
                            >
                                TIENDA
                            </Box>
                        </Box>

                        <Box sx={{ fontSize: { xl: '25px' }, marginRight: { lg: '16px', xl: '25px' } }}>
                            <ButtonsNav
                                link="/contacto"
                                text="CONTACTO"
                                nameClass='textDecoration colorPrimary buttonLink'
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, transform: 'translateX(50%)' }} />

                    <Box sx={{ transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
                        <Link to="#">
                            <IconButton size='large' color="secondary">
                                <Badge badgeContent={5} color="primary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>

                        <Box sx={{ fontSize: { xl: '25px' }, marginLeft: '16px' }}>
                            <ButtonsNav
                                link="/signin"
                                text="INICIAR SESION"
                                nameClass='textDecoration colorPrimary buttonLink'
                            />
                        </Box>
                    </Box>
                </Toolbar>
            </MyNavBarHeader>
            {/* <div>
                <Link to="/">
                </Link>

                <ButtonsNav
                    link="/"
                    text="HOME"
                    nameClass="buttonNav_homePage"
                />

                <ButtonScroll
                    idScroll="#"
                    text="TIENDA"
                />

                <ButtonsNav
                    link="/contacto"
                    text="CONTACTO"
                    nameClass="buttonNav_homePage"
                />

            </div> */}
        </>
    )
}

export default NavBar
