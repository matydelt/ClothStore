import axios from 'axios';
import React from 'react';
import Grid from "@mui/material/Grid";
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

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

interface props {
    publicationId: string | undefined
}

export default function RelatedPublications({ publicationId }: props): JSX.Element {

    const [publications, setPublications] = React.useState([]);


    React.useEffect(() => {
        axios.get('/publications/related', { params: { publicationId } }).then(({ data }) => {
            console.log(data)
            setPublications(data);
        });
    }, []);


    return (

        <Box sx={{ width: '100%' }}>


<Swiper
          spaceBetween={35}
          slidesPerView={4}
          navigation={true}
          effect={"slide"}
          loop={false}
        
        //   pagination={{ clickable: true }}
   
        >
            {
                publications.map((e: Publication) => {
                    return (
                        <>
                        <SwiperSlide style={{  width: 'auto', justifyContent: 'space-between'}}>
                            <CardPublicacion name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} id={e._id}
                            />
                            </SwiperSlide>
                        </>
                    )
                })
            }
        </Swiper>
            </Box>
    )
};