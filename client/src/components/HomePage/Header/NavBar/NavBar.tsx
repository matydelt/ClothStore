import React, { useEffect } from "react";
import ButtonsNav from "../../../GeneralComponents/ButtonsNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo/ClothStore_logotipo_sin_fondo.png";
// import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { Box } from "@mui/system";
import { Badge, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { gsap } from 'gsap'
import { useAuth } from "../../../../hooks/useAuth";

const useStyles = makeStyles({
  navBarContain: {
    background: 'transparent',
    boxShadow: '0px 0px 0px'
  },
  button: {
    "& span": {
      marginLeft: 0,
    },
    marginLeft: "2%",
  },
})

interface Props {
  flagButtonTranslate?: boolean;
}





export default function NavBar({ flagButtonTranslate }: Props) {
  const cartLength = useSelector(
    (state: RootState) => state.publicationSave.cartLength
  );
  const user = useSelector((state: RootState) => state.userSignin.userInfo);
  const carrito: any = useSelector((state: RootState) => state.carrito.carrito);
  const auth = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const timeline = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 1
    }
  })


  useEffect(() => {
    const logo = document.getElementById('logo');
    const buttonAnimate = document.querySelectorAll('.buttonAnimate');
    const containNavButton = document.getElementById('containNavButton');
    const containButtonShoppingLogin = document.getElementById('containButtonShoppingLogin');
    const buttonNavRight = document.querySelectorAll('.buttonNavRight');

    timeline.from(logo, { x: -500 }, "-=.7")
      .from(containNavButton, { opacity: .4, y: -300 }, '-=.6')
      .from(buttonAnimate, { opacity: 0, stagger: 0.1 }, '-=.6')

    timeline.from(containButtonShoppingLogin, { x: 500 }, '-=.6')
      .from(buttonNavRight, { y: -300, stagger: .3 })

  }, [])

  const handleCartAnimate = () => {
    const cartAnimation = document.getElementById("cartAnimation");
    const homePage = document.getElementById("homepage");
    const containerHomePage = document.getElementById("containerHomePage");
    cartAnimation?.classList.add("translateCart");
    homePage?.classList.add("translateLeft");
    containerHomePage?.classList.add("heightContainerHomePage");
  };

  if (pathname === '/') {
    return (
      <>
        <AppBar id='appbar' classes={{ root: classes.navBarContain }} position="static">
          <Toolbar>
            <Box
              component="img"
              src={Logo}
              alt="ClothStore"
              sx={{
                width: { lg: "15%", xl: "20%" },
                position: "absolute",
                zIndex: "1",
                left: "0",
                bottom: { xl: "-245%;" },
              }}
              id='logo'
            />
            <Box
              sx={{
                display: "flex",
                alignItems: { xl: "center" },
                transform: { lg: "translateX(60%)", xl: "translateX(86%)" },
                zIndex: "10",
              }}
              id='containNavButton'
            >
              <Box
                component="img"
                src={Logo}
                alt="ClothStore"
                sx={{
                  width: { lg: "15%", xl: "20%" },
                  position: "absolute",
                  zIndex: "1",
                  left: "0",
                  bottom: { xl: "-245%;" },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: { xl: "center" },
                  transform: { lg: "translateX(60%)", xl: "translateX(130%)" },
                  zIndex: "10",
                }}
              >
                <ButtonsNav
                  link="/"
                  text="HOME"
                  nameClass="textDecoration colorPrimary buttonLink buttonAnimate"
                />
                <Box
                  component="a"
                  href="#tienda"
                  className="buttonLink colorPrimary textDecoration buttonAnimate"
                  sx={{ fontSize: { xl: "25px" } }}
                >
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, transform: "translateX(50%)" }} />

            </Box>
            <Box sx={{ flexGrow: 1, transform: "translateX(50%)" }} />

            <Box
              sx={{
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
              }}
              id='containButtonShoppingLogin'
            >
              {flagButtonTranslate ?
                <IconButton className='buttonNavRight' onClick={handleCartAnimate} size="medium" color="secondary">
                  <Badge
                    badgeContent={
                      !user ? cartLength : carrito?.publications?.length
                    }
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                :
                <Link className='buttonNavRight' to="/cart">
                  <IconButton className='buttonNavRight' onClick={handleCartAnimate} size="medium" color="secondary">
                    <Badge
                      badgeContent={
                        !user ? cartLength : carrito?.publications?.length
                      }
                      color="primary"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              }

              {user ? (
                <Box className='buttonNavRight' sx={{ fontSize: { xl: "25px" }, marginLeft: "16px" }}>
                  <ButtonsNav
                    link="/perfil"
                    text="PERFIL"
                    nameClass="textDecoration colorPrimary buttonLink"
                  />
                </Box>
              ) : (
                <Box className='buttonNavRight' sx={{ fontSize: { xl: "25px" }, marginLeft: "16px" }}>
                  <ButtonsNav
                    link="/login"
                    text="INICIAR SESION"
                    nameClass="textDecoration colorPrimary buttonLink"
                  />
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </>
    )
  } else {
    return (
      <>
        <AppBar id='appbar' classes={{ root: classes.navBarContain }} position="static">
          <Toolbar>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Volver
            </Button>
            <Box
              component="img"
              src={Logo}
              alt="ClothStore"
              sx={{
                width: { lg: "15%", xl: "20%" },
                position: "absolute",
                zIndex: "1",
                left: "40%",
                bottom: { xl: "-245%;" },
              }}
            />
            <Box sx={{ flexGrow: 1, transform: "translateX(50%)" }} />
            <Box
              sx={{
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/cart">
                <IconButton size="medium" color="secondary">
                  <Badge
                    badgeContent={
                      !user ? cartLength : carrito?.publications?.length
                    }
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>

              {user || auth.user ? (
                <Box sx={{ fontSize: { xl: "25px" }, marginLeft: "16px" }}>
                  <ButtonsNav
                    link="/perfil"
                    text="PERFIL"
                    nameClass="textDecoration colorPrimary buttonLink"
                  />
                </Box>
              ) : (
                <Box sx={{ fontSize: { xl: "25px" }, marginLeft: "16px" }}>
                  <ButtonsNav
                    link="/login"
                    text="INICIAR SESION"
                    nameClass="textDecoration colorPrimary buttonLink"
                  />
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}