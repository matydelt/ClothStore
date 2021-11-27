import Badge from "@mui/material/Badge";
import React from "react";
import { useSelector } from "react-redux";
import { Publication } from "../../../redux/types";
import CardPublicacion from "./cardPublicaciones/cardPublicaciones";
import { PublicationState } from "../../../redux/reducer/publicationReducer"


export default function Publicaciones() {
    const state = useSelector((state: PublicationState) => state)
    console.log(state.publicationList.publications)
    return (
        <Badge className="publicationBox">
            {
                state.publicationList.publications.map((e: Publication) => {
                    return (<CardPublicacion name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} id={e._id} />)
                })
            }
        </Badge>
    )
}