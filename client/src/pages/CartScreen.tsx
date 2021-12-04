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
import { Container, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store/store';

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
    alignItems: 'center',
    height: '600px'
  },
  containerTotal: {
    width: '23%'
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

  console.log(carrito && carrito, 'carrito db')

  const classes = useStyles();

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.amount * item.price, 0);

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

  console.log(cart)

  return (
    <>
      <Typography variant='h3' align='center'>
        Mi Carro
      </Typography>
      {cart.length === 0  ? <Typography variant='h5'>No items</Typography> : null}


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
                carrito?.publications?.map((item: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                  />
                ))
                }
          </Table>
        </TableContainer>
        <Box component='div' className={classes.containerTotal}>
          <Typography variant='h5'>Total: $ {calculateTotal().toFixed(2)}</Typography>
        </Box>
      </Container>
    </>
  );
};



export default CartScreen;
