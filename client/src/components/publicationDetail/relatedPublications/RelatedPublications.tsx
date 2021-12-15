import axios from 'axios';
import React from 'react';
import Grid from "@mui/material/Grid";
import { Container, makeStyles } from '@material-ui/core'
import CardPublicacion from '../../HomePage/publicaciones/cardPublicaciones/cardPublicaciones';
import Carousel from "react-material-ui-carousel";
import { ArrowCircleUpOutlined } from '@mui/icons-material';
import { Publication } from '../../../redux/types';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper";
import './RelatedPublications.css'

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

interface props {
    publicationId: string | undefined
}

const useStyles = makeStyles({
    containRaltedPublication: {
        marginBottom: '40px'
    }
})

export default function RelatedPublications({ publicationId }: props): JSX.Element {

    const [publications, setPublications] = React.useState([]); 

    const classes = useStyles();


    React.useEffect(() => {
        axios.get('/publications/related', { params: { publicationId } }).then(({ data }) => {
            console.log(data)
            setPublications(data);
        });
    }, [publicationId]);


    return (

        <Container classes={{ root: classes.containRaltedPublication }}>


            <Swiper
                spaceBetween={-335}
                slidesPerView={5}
                navigation={true}
                effect={"slide"}
                loop={false}
                className='swipePublicaionRelated'
                >
                {
                    publications.map((e: Publication) => {
                        return (
                            <SwiperSlide className='cardPublicationRelated' key={e._id}>
                                <CardPublicacion discount={e.discount} name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} id={e._id}
                                />

                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Container>
    )
};