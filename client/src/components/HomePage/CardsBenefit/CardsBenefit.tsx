import React, { useState } from 'react'
import { Grid, Button, Container, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import WomanGender from '../../assets/img/woman_genero.png'
import ManGender from '../../assets/img/man_genero.png'
import KidGender from '../../assets/img/kid_genero.png'
import './CardsBenefit.css';
import { useDispatch } from 'react-redux'
import { putPublications } from '../../../redux/actions/publicationActions'

const useStyles = makeStyles({
    containerBenefit: {
        // marginTop: '80px',
        // marginBottom: '80px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transformOrigin: 'center',
        transform: 'perspective(800px) rotateY(25deg)',
        transition: '0.5s'
    },
    gridItem: {
        height: '600px',
    },
    title: {
        marginBottom: '60px',
        fontWeight: 400,
        textDecoration: 'underline'
    }
})



const CardsBenefit = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleSubmit = (valueGender: string) => {
        dispatch(
            putPublications({
                gender: valueGender
            })
        );
    };



    return (
        <Container classes={{ root: classes.containerBenefit }} maxWidth="md">
            <Typography classes={{ root: classes.title }} align='center' variant="h3" color="primary">
               Busca por Género
            </Typography>
            <Grid className='gridBenefit' container spacing={10}>
                <Grid classes={{ root: classes.gridItem }} item xs={12} sm={6} md={4} lg={3} xl={4}>
                    <Button onClick={() => handleSubmit('Mujer')} className='containedButtonBenefit containedButtonBenefitWoman' color='primary' classes={{ root: classes.button }}>
                        <Box
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                top: '-40px !important',
                                right: '-100px !important',
                                borderRadius: '50% !important',
                                backgroundColor: '#00c2cb !important',
                                width: '200px !important',
                                height: '200px !important',
                                zIndex: '-1',
                                opacity: '0.2'
                            }}
                            component='span'
                        ></Box>
                        <img className='imgGenderWoman imgGender' src={WomanGender} alt="Género Mujer" />
                        <Box
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                bottom: '0 !important',
                                left: '0 !important',
                                borderRadius: '50% !important',
                                backgroundColor: '#00c2cb !important',
                                width: '200px !important',
                                height: '200px !important',
                                zIndex: '-1',
                                opacity: '0.3'
                            }}
                            component='span'
                        ></Box>
                        <Box component='span' className='overlayWoman'>
                            <Typography variant='body1' color='textPrimary'>
                                Mujer
                            </Typography>
                        </Box>
                    </Button>
                </Grid>


                <Grid classes={{ root: classes.gridItem }} item xs={12} sm={6} md={4} lg={3} xl={4}>
                    <Button onClick={() => handleSubmit('Hombre')} className='containedButtonBenefit containedButtonBenefitMan' color='primary' classes={{ root: classes.button }}>
                        <Box
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                top: '-27px !important',
                                right: '146px !important',
                                borderRadius: '50% !important',
                                backgroundColor: '#00c2cb !important',
                                width: '200px !important',
                                height: '200px !important',
                                zIndex: -1,
                                opacity: 0.5,
                                margin: '0px'
                            }}
                            component='span'
                        >

                        </Box>
                        <img className='imgGenderMan imgGender' src={ManGender} alt="Género Hombre" />
                        <Box
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                bottom: '-20px !important',
                                right: '-54px !important',
                                border: 'solid 7px #00c2cb',
                                borderRadius: '50% !important',
                                width: '200px !important',
                                height: '200px !important',
                                zIndex: '-1',
                                opacity: '0.3',
                                margin: '0px'
                            }}
                            component='span'
                            className='overlayMan'
                        >
                            <Typography variant="body1" color="textPrimary">
                                Hombre
                            </Typography>
                        </Box>
                    </Button>
                </Grid>
                <Grid classes={{ root: classes.gridItem }} item xs={12} sm={6} md={4} lg={3} xl={4}>
                    <Button onClick={() => handleSubmit('Niños')} className='containedButtonBenefit containedButtonBenefitKid' color='primary' classes={{ root: classes.button }}>
                        <Box
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                top: '-47px !important',
                                right: '-50px !important',
                                borderRadius: '50% !important',
                                backgroundColor: '#00c2cb !important',
                                width: '200px !important',
                                height: '200px !important',
                                zIndex: -1,
                                opacity: 0.3,
                                margin: '0px'
                            }}
                            component='span'
                        ></Box>
                        <img className='imgGenderkid imgGender' src={KidGender} alt="Género Kid" />
                        <Box
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                right: '45px !important',
                                top: '153px !important',
                                backgroundColor: '#00c2cb !important',
                                width: '10px !important',
                                height: '73% !important',
                                zIndex: '-1',
                                opacity: 0.3,
                                margin: '0px'
                            }}
                            component='span'
                        ></Box>
                        <Box className='overlayKid' component='span'>
                            <Typography variant="body1" color="textPrimary">
                                Niños
                            </Typography>
                        </Box>
                    </Button>
                </Grid>
            </Grid>
        </Container >
    )
}

export default CardsBenefit
