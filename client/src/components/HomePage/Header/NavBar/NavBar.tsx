import React from 'react';
import ButtonsNav from '../../../GeneralComponents/ButtonsNav'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo/ClothStore_logotipo_sin_fondo.png';
import Toolbar from '@mui/material/Toolbar'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import {
    MyNavBarHeader,
} from '../NavBar/NavBarStyles'
import { Box } from '@mui/system';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';

const NavBar = () => {

    const cartLength = useSelector((state: RootState) => state.publicationSave.cartLength)
    const user = useSelector((state: RootState) => state.userSignin.userInfo)
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
                                href="#tienda"
                                className='buttonLink colorPrimary textDecoration'
                                sx={{ fontSize: { xl: '25px' } }}
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
                        <Link to="/cart">
                            <IconButton size='medium' color='secondary'>
                                <Badge badgeContent={cartLength} color='primary'>
                                    <ShoppingCartIcon  />
                                </Badge>
                            </IconButton>
                        </Link>

                        {user ?
                            <Box sx={{ fontSize: { xl: '25px' }, marginLeft: '16px' }}>
                                <ButtonsNav
                                    link="/perfil"
                                    text="PERFIL"
                                    nameClass='textDecoration colorPrimary buttonLink'
                                />
                            </Box> :
                            <Box sx={{ fontSize: { xl: '25px' }, marginLeft: '16px' }}>
                                <ButtonsNav
                                    link="/login"
                                    text="INICIAR SESION"
                                    nameClass='textDecoration colorPrimary buttonLink'
                                />
                            </Box>}
                    </Box>
                </Toolbar>
            </MyNavBarHeader>
        </>
    )
}

export default NavBar
