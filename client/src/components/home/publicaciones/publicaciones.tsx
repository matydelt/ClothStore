import  Badge  from "@mui/material/Badge";
import React from "react";
import { useSelector } from "react-redux";
import { DefaultRootState, Publication } from "../../../redux/types";
import CardPublicacion from "./cardPublicaciones/cardPublicaciones";


export default function Publicaciones() {
 const {publications} = useSelector((state: DefaultRootState)=> state)

    return (      
        <Badge>
            {
                publications.map((e:Publication)=>{                    
                    return(<CardPublicacion  name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id}/>)
                })
            }
        </Badge>       
    )
}