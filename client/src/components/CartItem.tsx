import * as React from "react";
import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles({
  tableCell: {
    display: "flex",
    alignItems: "center",
  },
  imgCell: {
    width: "70px",
    objectFit: "cover",
    marginRight: "10px",
    borderRadius: "5px",
  },
  buttonAmountRigth: {
    padding: "1px 5px",
    minWidth: "5px",
    marginLeft: "15px",
  },
  buttonAmountLeft: {
    padding: "1px 5px",
    minWidth: "5px",
    marginRight: "15px",
  },
  cellButton: {
    marginLeft: "15px",
  },
});

type CartItemType = {
  id: string;
  author: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
  category: string;
  discount: number | undefined;
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
        <TableCell classes={{ root: classes.tableCell }}>
          <Box
            className={classes.imgCell}
            component="img"
            src={
              item.image ||
              "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"
            }
            alt={item.title}
          />
          <Typography variant="h5">{item.title}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>$ {item.price.toFixed(2)}</Typography>
          {item.discount && (
            <Typography color={"green"}>{item.discount}% OFF</Typography>
          )}
        </TableCell>
        <TableCell classes={{ root: classes.cellButton }} align="center">
          <Button
            disableRipple={true}
            disableFocusRipple={true}
            classes={{ root: classes.buttonAmountLeft }}
            className="buttonHoverOff"
            color="primary"
            size="small"
            disableElevation
            variant="text"
            onClick={() => {
              if (item.quantity === 1) {
                const respuesta = window.confirm(
                  "Estas seguro de que queres eliminar este producto de tu carro?"
                );
                if (respuesta) removeFromCart(item.id);
              } else removeFromCart(item.id);
            }}
          >
            <RemoveIcon />
          </Button>
          {item.quantity}
          <Button
            disableFocusRipple={true}
            disableRipple={true}
            classes={{ root: classes.buttonAmountRigth }}
            className="buttonHoverOff"
            color="primary"
            size="small"
            disableElevation
            variant="text"
            onClick={() => addToCart(item)}
          >
            <AddIcon />
          </Button>
        </TableCell>
        <TableCell align="center">
          <Typography>${(item.quantity * item.price).toFixed(2)}</Typography>
        </TableCell>
      </TableBody>
    </>
  );
};

export default CartItem;
