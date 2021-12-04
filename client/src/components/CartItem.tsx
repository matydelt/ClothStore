import * as React from "react";
import { Button } from "@material-ui/core";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Box } from "@mui/system";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  tableCell: {
    display: 'flex',
    alignItems: 'center',
  },
  imgCell: {
    width: '50px',
    objectFit: 'cover',
    marginRight: '10px'
  },
  buttonAmountRigth: {
    padding: '1px 5px',
    minWidth: '5px',
    marginLeft: '15px',
  },
  buttonAmountLeft: {
    padding: '1px 5px',
    minWidth: '5px',
    marginRight: '15px',
  },
  cellButton: {
    marginLeft: '15px'
  }

})

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      width: '77px',
    },
  }),
)(TableRow);


type CartItemType = {
  id: string;
  amount: number;
  quantity: number;
  price: number;
  image: string;
  title: string;
  category: string;
};

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: string) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {

  const classes = useStyles();
  return (
    <>
      <TableBody>
        <StyledTableRow>
          <TableCell classes={{ root: classes.tableCell }} component="th" scope="row">
            <Box
              className={classes.imgCell}
              component='img'
              src={item.image || "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"}
              alt={item.title}
            />
            <Typography variant='h5'>{item.title}</Typography>
          </TableCell>
          <TableCell align="right">
            ${item.price}
          </TableCell>
          <TableCell classes={{root: classes.cellButton}}  align="right">
            <Button
              disableRipple={true}
              disableFocusRipple={true}
              classes={{ root: classes.buttonAmountLeft }}
              className='buttonHoverOff'
              color='primary'
              size="small"
              disableElevation
              variant="text"
              onClick={() => removeFromCart(item.id)}
            >
              -
            </Button>
            {item.amount || item.quantity}
            <Button
              disableFocusRipple={true}
              disableRipple={true}
              classes={{ root: classes.buttonAmountRigth }}
              className='buttonHoverOff'
              color='primary'
              size="small"
              disableElevation
              variant="text"
              onClick={() => addToCart(item)}
            >
              +
            </Button>
          </TableCell>
          <TableCell align="right">${(item?.amount || item?.quantity * item.price).toFixed(2)}</TableCell>
        </StyledTableRow>
      </TableBody>
    </>
  );
};

export default CartItem;
