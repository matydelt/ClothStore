import React from "react";
import { useSelector } from "react-redux";
import { Publication } from "../../../redux/types";
import CardPublicacion from "./cardPublicaciones/cardPublicaciones";
import { PublicationState } from "../../../redux/reducer/publicationReducer"
import Grid from '@mui/material/Grid'


export default function Publicaciones() {
    const state = useSelector((state: PublicationState) => state)
    return (
        <Grid container spacing={4}
            sx={{
                width: '80%',
                marginTop: '50px'
            }}>
            {
                state.publicationList.publications.map((e: Publication) => {
                    return (
                        <>
                            <CardPublicacion name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} id={e._id}
                            />
                        </>
                    )
                })
            }
        </Grid>
    )
}