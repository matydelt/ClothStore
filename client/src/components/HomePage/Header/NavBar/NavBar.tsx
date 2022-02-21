import { useEffect, useRef } from "react";
import ButtonsNav from "../../../GeneralComponents/ButtonsNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo/ClothStore_logotipo_sin_fondo.png";
// import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { AppBar, Toolbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/system";
import { Badge, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { gsap } from "gsap";
import { useAuth } from "../../../../hooks/useAuth";

const useStyles = makeStyles({
  navBarContain: {
    background: "transparent",
    boxShadow: "0px 0px 0px",
  },
  button: {
    "& span": {
      marginLeft: 0,
    },
    marginLeft: "2%",
  },
});

interface Props {
  flagButtonTranslate?: boolean;
  siteDetail?: boolean;
}

export default function NavBar({ flagButtonTranslate, siteDetail }: Props) {
  const { cartLength } = useAppSelector((state) => state.publicationSave);
  const user = useAppSelector((state) => state.userSignin.userInfo);
  const { carrito } = useAppSelector((state) => state.carrito);
  const auth = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const timeline = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 1,
    },
  });

  // refs
  const logo = useRef<HTMLImageElement>(null);
  const containButtonShoppingLogin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttonAnimate = document.querySelectorAll(".buttonAnimate");
    const containNavButton = document.getElementById("containNavButton");
    const buttonNavRight = document.querySelectorAll(".buttonNavRight");

    if (logo.current) {
      timeline.from(logo.current, { x: -500 }, "-=.7");
    }
    if (containNavButton) {
      timeline.from(containNavButton, { opacity: 0.4, y: -300 }, "-=.6");
    }
    if (buttonAnimate.length > 0) {
      timeline.from(buttonAnimate, { opacity: 0, stagger: 0.1 }, "-=.6");
    }
    if (containButtonShoppingLogin.current) {
      timeline.from(containButtonShoppingLogin.current, { x: 500 }, "-=.6");
    }
    if (buttonNavRight.length > 0) {
      timeline.from(buttonNavRight, { y: -300, stagger: 0.3 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCartAnimate = () => {
    const cartAnimation = document.getElementById("cartAnimation");
    const homePage = document.getElementById("homepage");
    const containerHomePage = document.getElementById("containerHomePage");
    cartAnimation?.classList.add("translateCart");
    homePage?.classList.add("translateLeft");
    containerHomePage?.classList.add("heightContainerHomePage");
  };

  if (pathname === "/") {
    return (
      <>
        <AppBar
          id="appbar"
          classes={{ root: classes.navBarContain }}
          position="static"
        >
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
                // bottom: { xl: "-245%;" },
              }}
              id="logo"
              ref={logo}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: { xl: "center" },
                transform: {
                  lg: "translateX(60%)",
                  xl: "translate(130%, 10%)",
                },
                zIndex: "10",
              }}
            >
              <Box
                sx={{
                  fontSize: { xl: "25px" },
                  marginRight: { lg: "16px", xl: "25px" },
                }}
              >
                <ButtonsNav
                  link="/"
                  text="HOME"
                  nameClass="textDecoration colorPrimary buttonLink"
                />
              </Box>

              <Box sx={{ marginRight: { lg: "16px", xl: "25px" } }}>
                <Box
                  component="a"
                  href="#tienda"
                  className="buttonLink colorPrimary textDecoration"
                  sx={{ fontSize: { xl: "25px" } }}
                >
                  TIENDA
                </Box>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, transform: "translateX(50%)" }} />

            <Box
              sx={{
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
              }}
              id="containButtonShoppingLogin"
              ref={containButtonShoppingLogin}
            >
              {/* {flagButtonTranslate ?
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
                : */}
              <Link className="buttonNavRight" to="/cart">
                <IconButton
                  className="buttonNavRight"
                  onClick={handleCartAnimate}
                  size="medium"
                  color="secondary"
                >
                  <Badge
                    badgeContent={!user ? cartLength : carrito?.length}
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              {/* } */}

              {user ? (
                <Box
                  className="buttonNavRight"
                  sx={{ fontSize: { xl: "25px" }, marginLeft: "16px" }}
                >
                  <ButtonsNav
                    link="/perfil"
                    text="PERFIL"
                    nameClass="textDecoration colorPrimary buttonLink"
                  />
                </Box>
              ) : (
                <Box
                  className="buttonNavRight"
                  sx={{ fontSize: { xl: "25px" }, marginLeft: "16px" }}
                >
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
  } else {
    return (
      <>
        <AppBar
          id="appbar"
          classes={{ root: classes.navBarContain }}
          position="static"
        >
          <Toolbar>
            {siteDetail ? (
              <Button
                onClick={() => navigate("/")}
                startIcon={<ArrowBackIcon />}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Volver
              </Button>
            ) : (
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Volver
              </Button>
            )}
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
                    badgeContent={!user ? cartLength : carrito?.length}
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
                <Box
                  sx={{
                    fontSize: { xl: "25px" },
                    marginLeft: "16px",
                    display: pathname === "/login" ? "none" : "inline",
                  }}
                >
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
