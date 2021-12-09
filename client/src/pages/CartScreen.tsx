import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import CartItem from "../components/CartItem";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import { Container, Box, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../redux/store/store';
import { useAuth } from "../hooks/useAuth";
import { putCarrito, putCarritoRemove } from "../redux/actions/carritoAction";
import { useNavigate } from "react-router";
import axios from "axios";
import { TableHeaderColumn } from "material-ui";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      width: '300px'
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const useStyles = makeStyles({
  root: {
    width: '77%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '600px'
  },
  containerTotal: {
    width: '23%',
  }
})



export type CartItemType = {
  id: string;
  amount: number;
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
  const carrito: any = useSelector((state: RootState) => state.carrito.carrito)
  const auth = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(cart)

  const classes = useStyles();

  const calculateTotal = () => {

    if (auth.user && carrito?.publications) {
      return carrito?.publications?.reduce((acc: any, item: any) => acc + item.quantity * item.price, 0);
    } else {
      return cart.reduce((acc, item) => acc + item.amount * item.price, 0);
    }

  }

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartType)
    );
  };

  const handleAddQuantityToCartDB = (email: string | null | undefined, id: string): void => {
    console.log('addquantity', email, id)
    dispatch(putCarrito(email, id))
  }

  const handleRemoveQuantityToCartDB = (email: string | null | undefined, id: string): void => {
    console.log('addquantity', email, id)
    dispatch(putCarritoRemove(email, id))
  }


  const handleMercadoPago = (): void => {
    let order = carrito;
    axios.post('/checkout', order).then(({ data }) => {
      var win = window.open(data, '_blank');
      win?.focus();
      console.log(data)

    })
  }



  return (
    <>
      <Typography variant='h3' align='center'>
        Mi Carro
      </Typography>
      {(!auth?.user && cart?.length === 0 || auth?.user && carrito?.publications?.length === 0) ? <Typography variant='h5'>No items</Typography> : null}


      {
        (!!!auth?.user && cart?.length > 0 || !!auth?.user && carrito?.publications?.length > 0) &&
        <Container maxWidth='lg' classes={{ root: classes.container }}>


          <TableContainer classes={{ root: classes.root }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell >Producto</StyledTableCell>
                  <StyledTableCell align="right">Price $</StyledTableCell>
                  <StyledTableCell align="right">Cantidad</StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                </TableRow>
              </TableHead>

              {
                !auth.user ? cart.map((item: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                  />

                ))

                  : carrito?.publications?.map((item: any) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      addToCart={() => handleAddQuantityToCartDB(auth.user && auth?.user?.email, item.publication)}
                      removeFromCart={() => handleRemoveQuantityToCartDB(auth.user && auth?.user?.email, item.publication)}
                    />
                  ))
              }
            </Table>
          </TableContainer>
          <Box component='div' className={classes.containerTotal}>
            <Typography variant='h5'>Total: $ {calculateTotal().toFixed(2)}</Typography>
            <Button variant="contained" color='secondary' fullWidth={true} onClick={handleMercadoPago}>Comprar</Button>
          </Box>
        </Container>
      }
    </>
  );
};



export default CartScreen;
