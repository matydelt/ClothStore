import { Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";
import { useState, useEffect } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/modules/autoplay/autoplay.min.css";
import "swiper/modules/effect-fade/effect-fade.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import { Publication } from "../../../redux/types";
import CardPublicacion from "../../HomePage/publicaciones/cardPublicaciones/cardPublicaciones";
import "./RelatedPublications.css";

interface Props {
  publicationId: string | undefined;
}

const useStyles = makeStyles({
  containRaltedPublication: {
    marginBottom: "40px",
  },
});

export default function RelatedPublications({
  publicationId,
}: Props): JSX.Element {
  const [publications, setPublications] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/publications/related", { params: { publicationId } })
      .then(({ data }) => {
        setPublications(data);
      });
  }, [publicationId]);

  return (
    <Container classes={{ root: classes.containRaltedPublication }}>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        slidesPerView={3}
        navigation
        effect="slide"
        className="swipePublicaionRelated"
      >
        {publications.map((e: Publication) => {
          return (
            <SwiperSlide className="cardPublicationRelated" key={e._id}>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}
