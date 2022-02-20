import { Button, Container } from "@mui/material";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CartItem from "../components/CartItem";
import { useAuth } from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { putCarrito, putCarritoRemove } from "../redux/actions/carritoAction";
import { RootState } from "../redux/store/store";
import "./CartScreen.css";
import img from "../components/assets/logo/ClothStore_sin_fondo.png";

const useStyles = makeStyles({
  rootContainer: {
    width: "100%",
    margin: "0 auto",
    border: "2px solid #00c2cb",
  },
  container: {
    maxHeight: 440,
  },
  checkoutContainer: {
    padding: "2%",
    width: "85%",
    background: "#FAF6F6",
    display: "flex",
    justifyContent: "space-between",
    margin: "2% auto",
    borderRadius: "25px",
    boxShadow: "0px 1px 2px #00c2cb",
  },
  button: {
    "& span": {
      marginLeft: 0,
    },
  },
  buttonTitle: {
    width: "271px",
    height: "42px",
    "& span": {
      marginLeft: 0,
    },
  },
  title: {
    display: "inline",
    margin: "2%",
  },
});

export type CartItemType = {
  id: string;
  author: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
  category: string;
  discount: number | undefined;
};

export type CartItemTypeDB = {
  id: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
  category?: string;
  discount: number | undefined;
};

interface Props {
  idHomepage?: string;
}

export type CartType = CartItemType[];

export default function CartScreen({ idHomepage }: Props) {
  const [cart, setCart] = useLocalStorage<CartType>("cart", []);
  const carrito: any = useSelector((state: RootState) => state.carrito.carrito);
  const auth = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const classes = useStyles();

  const calculateTotal = () => {
    if (auth.user && carrito?.publications) {
      return carrito?.publications?.reduce(
        (acc: any, item: any) => acc + item.quantity * item.price,
        0
      );
    } else {
      return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
  };

  const handleAddToCart = async (clickedItem: CartItemType) => {
    const { data } = await axios.get("publication", {
      params: { publicationId: clickedItem.id },
    });

    let cartCopy = [...cart];

    cartCopy.forEach((item) => {
      if (item.id === clickedItem.id && item.quantity < data.stock) {
        console.log("asdsa", item.quantity);
        item.quantity += 1;
      }
    });

    setCart(cartCopy);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            return acc;
          }
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartType)
    );
  };

  const handleAddQuantityToCartDB = (
    email: string | null | undefined,
    id: string
  ): void => {
    dispatch(putCarrito(email, id));
  };

  const handleRemoveQuantityToCartDB = (
    email: string | null | undefined,
    id: string
  ): void => {
    dispatch(putCarritoRemove(email, id));
  };

  const handleMercadoPago = (): void => {
    let order = carrito;
    axios.post("/checkout", order).then(({ data }) => {
      var win = window.open(data, "_blank");
      win?.focus();
      console.log(data);
    });
  };

  const handleShowHomepage = () => {
    const cartAnimation = document.getElementById("cartAnimation");
    const homePage = document.getElementById("homepage");
    const containerHomePage = document.getElementById("containerHomePage");
    cartAnimation?.classList.remove("translateCart");
    homePage?.classList.remove("translateLeft");
    containerHomePage?.classList.remove("heightContainerHomePage");
  };

  return (
    <Box
      id={idHomepage}
      sx={{
        overflow: "hidden",
        position: "relative",
        height: "100vh",
      }}
    >
      <Container>
        {/* Botón para regresar a la homepage */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            classes={{ root: classes.title }}
            variant="h4"
            color="primary"
          >
            Mi Carrito
          </Typography>
          {idHomepage ? (
            <Button
              onClick={handleShowHomepage}
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
              classes={{ root: classes.buttonTitle }}
            >
              Continua con tus compras
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/")}
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
              classes={{ root: classes.buttonTitle }}
            >
              Continua con tus compras
            </Button>
          )}
        </Box>

        {/* Tabla de items a comprar */}
        <Paper className={classes.rootContainer}>
          {(!auth?.user && cart?.length === 0) ||
          (auth?.user && carrito?.publications?.length === 0) ? (
            <Typography align="center">Aún no has seleccionado nada</Typography>
          ) : (
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {["Producto", "Precio", "Cantidad", "Total"].map(
                      (column, index) => (
                        <TableCell key={index} align="center">
                          {column}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                {auth.user
                  ? carrito?.publications?.map((item: any) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        addToCart={() =>
                          handleAddQuantityToCartDB(
                            auth.user && auth?.user?.email,
                            item.publication
                          )
                        }
                        removeFromCart={() =>
                          handleRemoveQuantityToCartDB(
                            auth.user && auth?.user?.email,
                            item.publication
                          )
                        }
                      />
                    ))
                  : cart?.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                      />
                    ))}
              </Table>
            </TableContainer>
          )}
        </Paper>
        <Box
          className={classes.checkoutContainer}
          style={{ alignItems: "center" }}
        >
          <Box style={{ width: "20%" }} component={"img"} src={img}></Box>
          <Box style={{ width: "25%" }}>
            <Typography variant="h6" align="center">
              Total: ${calculateTotal().toFixed(2)}{" "}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleMercadoPago}
              disabled={!cart.length && !carrito?.publications?.length}
              className={classes.button}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>
      <Box
        component="span"
        sx={{
          display: "block",
          zIndex: "-1",
          bgcolor: "#00c2cb",
          borderRadius: "50%",
        }}
        className="opacityCirleCart rightCircle"
      />
      <Box
        component="span"
        sx={{
          display: "block",
          zIndex: "-1",
          bgcolor: "#00c2cb",
          borderRadius: "50%",
        }}
        className="opacityCirleCart lefttCircle"
      />
    </Box>
  );
}
