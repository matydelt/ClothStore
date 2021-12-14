import React from "react";
import ButtonsNav from "../../../GeneralComponents/ButtonsNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo/ClothStore_logotipo_sin_fondo.png";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import { MyNavBarHeader } from "../NavBar/NavBarStyles";
import { Box } from "@mui/system";
import { Badge, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { useAuth } from "../../../../hooks/useAuth";

const useStyles = makeStyles({
  button: {
    "& span": {
      marginLeft: 0,
    },
    marginLeft: "2%",
  },
});

export default function NavBar() {
  const cartLength = useSelector(
    (state: RootState) => state.publicationSave.cartLength
  );
  const user = useSelector((state: RootState) => state.userSignin.userInfo);
  const carrito: any = useSelector((state: RootState) => state.carrito.carrito);
  const auth = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  if (pathname === "/") {
    return (
      <>
        <MyNavBarHeader position="static">
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
            />
            <Box
              sx={{
                display: "flex",
                alignItems: { xl: "center" },
                transform: { lg: "translateX(60%)", xl: "translateX(130%)" },
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
        </MyNavBarHeader>
      </>
    );
  } else {
    return (
      <>
        <MyNavBarHeader position="static">
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
        </MyNavBarHeader>
      </>
    );
  }
}
