import { Box, Button, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
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

// const StyledTableCell = withStyles((theme: Theme) =>
//   createStyles({
//     head: {
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.common.white,
//       width: "300px",
//     },
//     body: {
//       fontSize: 14,
//     },
//   })
// )(TableCell);

// const useStyles = makeStyles({
//   root: {
//     width: "77%",
//   },
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "600px",
//   },
//   containerTotal: {
//     width: "23%",
//   },
// });

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "0 auto",
  },
  container: {
    maxHeight: 440,
  },
  buttonContainer: {
    width: "23%",
    margin: "2% auto",
  },
});
export type CartItemType = {
  id: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
  category: string;
};

export type CartItemTypeDB = {
  id: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
  category?: string;
};

export type CartType = CartItemType[];

const CartScreen = () => {
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

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            const respuesta = window.confirm(
              "Estas seguro de que queres eliminar este producto de tu carro?"
            );
            return respuesta ? acc : [...acc, item];
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
    const respuesta = window.confirm(
      "Estas seguro de que queres eliminar este producto de tu carro?"
    );
    if (respuesta) {
      dispatch(putCarritoRemove(email, id));
    }
  };

  const handleMercadoPago = (): void => {
    let order = carrito.publications;
    axios.post("/checkout", order).then(({ data }) => {
      var win = window.open(data, "_blank");
      win?.focus();
      console.log(data);
    });
  };

  return (
    <Container>
      {/* Botón para regresar a la homepage */}
      <Button
        onClick={() => navigate("/")}
        startIcon={<ArrowBackIcon />}
        variant="contained"
        color="primary"
        style={{ margin: "2%" }}
      >
        Continua con tus compras
      </Button>

      {/* Tabla de items a comprar */}
      <Paper className={classes.root}>
        {!cart.length && !carrito?.publications?.length ? (
          <Typography>Aún no has seleccionado nada</Typography>
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
                ? carrito.publications.map((item: any) => (
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
                : cart.map((item) => (
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

      {/* Botón checkout Mercado Pago */}
      <Box component="div" className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleMercadoPago}
          disabled={!cart.length && !carrito?.publications?.length}
        >
          Checkout ${calculateTotal().toFixed(2)}
        </Button>
      </Box>
    </Container>
  );
};

export default CartScreen;
