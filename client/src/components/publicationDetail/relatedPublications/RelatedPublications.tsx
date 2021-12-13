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
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/scrollbar/scrollbar.min.css";
// import "swiper/components/autoplay";
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
    }, []);


    return (

        <Container classes={{ root: classes.containRaltedPublication }}>


            <Swiper
                // spaceBetween={35}
                // slidesPerView={4}
                // navigation={true}
                // effect={"slide"}
                // loop={false}

            //   pagination={{ clickable: true }}

                spaceBetween={-335}
                slidesPerView={5}
                navigation={true}
                effect={"slide"}
                loop={false}
                className='swipePublicaionRelated'
                >
                    {/* <SwiperSlide key={e._id} style={{ width: 'auto', justifyContent: 'space-between' }}>
                    <CardPublicacion discount={e.discount} name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} id={e._id} */}
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