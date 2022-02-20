import { useEffect, useRef } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/autoplay/autoplay.min.css";
import "swiper/modules/effect-fade/effect-fade.min.css";
import "./Header.css";
import NavBar from "./NavBar/NavBar";
import Woman from "../../assets/img/woman.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Man from "../../assets/img/man.png";
import Kids from "../../assets/img/kids.png";
import { gsap } from "gsap";

const Header = () => {
  const timeline = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 1,
    },
  });

  const typoOne = useRef<HTMLSpanElement>(null!);
  const titleWoman = useRef<HTMLSpanElement>(null!);
  const imgWoman = useRef<HTMLImageElement>(null!);
  const circleWoman = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    // const typoOne = document.getElementById("typoOne");
    // const titleWoman = document.getElementById("titleWoman");
    // const imgWoman = document.getElementById("imgWoman");
    // const circleWoman = document.getElementById("circleWoman");

    timeline
      .from(typoOne.current, { y: 150 })
      .from(titleWoman.current, { x: -500 }, "-=.5")
      .from(imgWoman.current, { y: 100 }, "-=.4")
      .from(circleWoman.current, { x: 100 }, "-=2");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header
        style={{ height: "100vh", background: "#f3f3f3", overflow: "hidden" }}
      >
        <NavBar flagButtonTranslate={true} />
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          effect="fade"
          loop
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
          }}
        >
          {/*********** SLIDE 1 ************/}
          <SwiperSlide>
            <Typography
              ref={typoOne}
              sx={{
                width: "231px !important",
                textAlign: "left",
                fontSize: { xl: "25px !important" },
                transform: { lg: "translate(0%, 10%)", xl: "translateY(30%)" },
              }}
              variant="h4"
              id="typoOne"
            >
              SIEMPRE PARA TI
            </Typography>
            <Typography
              ref={titleWoman}
              sx={{
                fontSize: { lg: "10px !important", xl: "98px !important" },
                width: { lg: "400px !important", xl: "400px !important" },
                transform: {
                  lg: "translate(-100%, 0%)",
                  xl: "translate(-100%, 0%)",
                },
                textAlign: "center",
                fontWeight: "400 !important",
                lineHeight: "128px !important",
              }}
              variant="h2"
              id="titleWoman"
            >
              Simplifica Todo.
            </Typography>
            <Box
              component="img"
              ref={imgWoman}
              src={Woman}
              alt="Woman"
              sx={{
                position: "absolute",
                display: "block",
                width: "50%",
                objectFit: "cover",
                right: { lg: "15%", xl: "7%" },
                bottom: "0%",
                height: "87%",
              }}
              id="imgWoman"
            />
            <Box
              component="span"
              ref={circleWoman}
              sx={{
                position: "absolute",
                right: { lg: "25%", xl: "15%" },
                backgroundColor: "#00c2cb",
                display: "block",
                width: { xs: 350, md: 250, lg: "40%", xl: "45%" },
                height: { xs: 350, md: 250, lg: "85%", xl: "80%" },
                zIndex: "-1",
                borderRadius: "50%",
              }}
              id="circleWoman"
            />
          </SwiperSlide>

          {/*********** SLIDE 2 ************/}
          <SwiperSlide>
            <Typography
              variant="h2"
              sx={{
                textTransform: "capitalize",
                position: "absolute",
                right: "18%",
                width: { lg: "450px !important", xl: "450px !important" },
                fontSize: { lg: "70px !important", xl: "98px !important" },
                fontWeight: "400 !important",
                textAlign: "right",
                letterSpacing: "2px !important",
                lineHeight: { lg: "98px !important", xl: "120px !important" },
              }}
            >
              lo mejor para ti.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                textTransform: "uppercase",
                fontSize: { lg: "23px !important", xl: "29px !important" },
                position: "absolute",
                textAlign: "right",
                right: "15%",
                top: { lg: "49% !important", xl: "49% !important" },
                fontWeight: "lighter",
              }}
              /* color="initial" */
            >
              siempre para ti.
            </Typography>

            <Box
              component="img"
              src={Man}
              alt="Man"
              sx={{
                display: "block",
                width: { lg: "38%" },
                position: "absolute",
                objectFit: "cover",
                left: { lg: "10%" },
              }}
            />

            <Box
              component="span"
              sx={{
                display: "block",
                position: "absolute",
                left: "-20%",
                width: { lg: "140vw" },
                height: { lg: "55%" },
                backgroundColor: "#00c2cb",
                transform: "rotateZ(-37deg)",
                zIndex: "-1",
              }}
            />
          </SwiperSlide>

          {/*********** SLIDE 3 ************/}
          <SwiperSlide>
            <Typography
              sx={{
                textTransform: "capitalize",
                position: "absolute",
                left: { lg: "10%", xl: "15%" },
                width: { lg: "450px !important", xl: "450px !important" },
                fontSize: { lg: "70px !important", xl: "98px !important" },
                fontWeight: "400 !important",
                textAlign: "center",
                letterSpacing: "4px !important",
                lineHeight: { lg: "78px !important", xl: "94px !important" },
              }}
              variant="h2"
            >
              También para tus pequeños.
            </Typography>

            <Typography
              sx={{
                textTransform: "uppercase",
                position: "absolute",
                left: { lg: "10%", xl: "13%" },
                bottom: { lg: "15%", xl: "17%" },
                width: { lg: "350px", xl: "450px" },
                fontSize: { lg: "17px", xl: "25px" },
                fontWeight: "lighter",
                textAlign: "center",
                letterSpacing: "4px",
                // lineHeight: '89px'
              }}
              variant="h4"
            >
              siempre para tus consentidos.
            </Typography>

            <Box
              component="img"
              src={Kids}
              alt="Kids"
              sx={{
                position: "absolute",
                bottom: "0%",
                right: "10%",
                objectFit: "cover",
                width: { lg: "48%" },
              }}
            />

            <Box
              component="span"
              sx={{
                display: "block",
                position: "absolute",
                left: "27%",
                bottom: "-10%",
                width: { lg: "53%", xl: "59%" },
                height: { lg: "110%" },
                backgroundColor: "#00c2cb",
                borderRadius: "50%",
                zIndex: "-1",
                opacity: "1",
              }}
            />
            <Box
              component="span"
              sx={{
                display: "block",
                position: "absolute",
                left: { lg: "14%", xl: "16%" },
                bottom: { lg: "14%", xl: "16%" },
                width: { lg: "8%" },
                height: { lg: "10%" },
                backgroundColor: "#00c2cb",
                borderRadius: "50%",
                zIndex: "-1",
                opacity: ".3",
              }}
            />
          </SwiperSlide>
        </Swiper>
      </header>
    </>
  );
};

export default Header;
