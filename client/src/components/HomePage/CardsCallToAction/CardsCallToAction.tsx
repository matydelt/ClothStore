import { Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import PaymentIcon from '@material-ui/icons/Payment';
import SearchIcon from '@material-ui/icons/Search';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    containerCardsCTA: {
        marginTop: '30px',
        maxWidth: '1200px'
    },
    containCard: {
        textAlign: 'center',
        height: '270px',
        width: '365px'
    },
    icon: {
        fontSize: '90px'
    },
    title: {
        fontWeight: 400,
        marginBottom: '40px',
        textDecoration: 'underline'
    },
    subheader: {
        fontWeight: 'bold'
    }
})

const CardsCallToAction = () => {
    const classes = useStyles();
    return (
        <Container classes={{ root: classes.containerCardsCTA }} maxWidth="md">
            <Typography classes={{ root: classes.title }} paragraph={true} variant='h3' align='center' color='primary'>
                En ClothStore puedes...
            </Typography>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Card classes={{ root: classes.containCard }}>
                        <CardHeader
                            title={<PaymentIcon classes={{ root: classes.icon }} color='primary' />}
                            subheader={<Typography classes={{ root: classes.subheader }} color='primary' variant='h5'>Comprar/Vender</Typography>}
                        />

                        <CardContent>
                            <Typography variant='body1'>
                                Envia o recibe pagos por mercadopago de manera segura.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Card classes={{ root: classes.containCard }}>
                        <CardHeader
                            title={<SearchIcon classes={{ root: classes.icon }} color='primary' />}
                            subheader={<Typography classes={{ root: classes.subheader }} color='primary' variant='h5'>Buscar tus preferencias</Typography>}
                        />

                        <CardContent>
                            <Typography variant='body1'>
                                Busca tu estilo preferido y único si así lo deseas.
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>


                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Card classes={{ root: classes.containCard }}>
                        <CardHeader
                            title={<BusinessCenterIcon classes={{ root: classes.icon }} color='primary' />}
                            subheader={<Typography classes={{ root: classes.subheader }} color='primary' variant='h5'>Vender tu ropa o diseños</Typography>}
                        />
                        <CardContent>
                            <Typography variant='body1'>
                                Toma esta oportunidad para que el mundo conozca tu potencial y originalidad.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CardsCallToAction
