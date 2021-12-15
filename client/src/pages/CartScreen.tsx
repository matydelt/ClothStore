import { Box, Button, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CartItem from "../components/CartItem";
import { useAuth } from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { putCarrito, putCarritoRemove } from "../redux/actions/carritoAction";
import { RootState } from "../redux/store/store";

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
    padding: "1%",
    width: "85%",
    background: "#D6D6D6",
    display: "flex",
    justifyContent: "space-between",
    margin: "2% auto",
    borderRadius: "25px",
  },
  button: {
    "& span": {
      marginLeft: 0,
    },
  },
});

export type CartItemType = {
  id: string;
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

export type CartType = CartItemType[];

export default function CartScreen() {
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
    // setCart((prev) => {
    //   const isItemInCart = prev.find((item) => item.id === clickedItem.id);

    //   if (isItemInCart) {
    //     return prev.map((item) =>
    //       item.id === clickedItem.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     );
    //   }

    //   return [...prev, { ...clickedItem, quantity: 1 }];
    // });

    const {data} = await axios.get('publication', { params: { publicationId: clickedItem.id }})

    let cartCopy = [ ...cart ];

    cartCopy.forEach(item => {
      if (item.id === clickedItem.id && item.quantity < data.stock) {
        console.log('asdsa', item.quantity)
        item.quantity += 1
      }
    })

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
    axios.post('/checkout', order).then(({ data }) => {
      var win = window.open(data, '_blank');
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
      <Paper className={classes.rootContainer}>
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
                ? carrito?.publications.map((item: any) => (
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
      <Box className={classes.checkoutContainer}>
        <Box style={{ border: "1px solid", width: "25%" }}>
          <Typography>Descuento: </Typography>
        </Box>
        <Box style={{ width: "25%" }}>
          <Typography variant="h6">
            Subtotal: ${calculateTotal().toFixed(2)}
          </Typography>
          <Typography variant="h6">Descuento: 0%</Typography>
          <Typography variant="h6" style={{ borderTop: "1px solid gray" }}>
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
  );
}
