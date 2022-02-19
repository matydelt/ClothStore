import { useSelector } from "react-redux";
import { Publication } from "../../../redux/types";
import CardPublicacion from "./cardPublicaciones/cardPublicaciones";
import { PublicationState } from "../../../redux/reducer/publicationReducer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Publicaciones() {
  const state = useSelector((state: PublicationState) => state);

  return (
    <Box>
      <Grid
        container
        spacing={1}
        sx={{
          // maxWidth: '1330px !important',
          width: "830px !important",
          marginTop: "50px !important",
          marginRight: "30px !important",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        {state.publicationList.publications.map((e: Publication) => {
          return (
            <CardPublicacion
              discount={e.discount}
              name={e.name}
              author={e.author}
              images={e.images}
              mark={e.mark}
              stock={e.stock}
              price={e.price}
              categorie={e.categorie}
              detail={e.detail}
              gender={e.gender}
              key={e._id}
              id={e._id}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
