import axios from 'axios';
import React from 'react';
import Grid from "@mui/material/Grid";
import CardPublicacion from '../../HomePage/publicaciones/cardPublicaciones/cardPublicaciones';
import Carousel from "react-material-ui-carousel";
import { ArrowCircleUpOutlined } from '@mui/icons-material';
import { Publication } from '../../../redux/types';
import { Box } from '@mui/system';
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

        <Box sx={{ width: '100%'}}>


        <Carousel
            className="Carousel-root-1 CarouselItem"
            autoPlay={false}
            navButtonsProps={{
                style: {
                    backgroundColor: "gray",
                    width: '50px',
                    height: '50px',
                    borderRadius: 100,
                    color: 'red',
                    boxShadow: '1px 1px 1px 1px gray'
                },
            }}
            indicators={false}
            navButtonsAlwaysVisible={true}
            navButtonsAlwaysInvisible={false}
            
        >
            {
                publications.map((e: Publication) => {
                    return (
                        <>
                            <CardPublicacion name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} id={e._id}
                            />
                        </>
                    )
                })
            }
        </Carousel>
            </Box>
    )
};