import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import "./cartItem.css"
type CartItemType = {
  id: string;
  amount: number;
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
  return (
    <Box className="card-box">

      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <div>
        <p>Price: $ {item.price}</p>
        <p>Total: $ {(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>{item.amount}</p>
        {item.amount === 1 ?

          <Button
            style={{ marginLeft: "5px", marginRight: "5px" }}
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            eliminar
          </Button> :
          <Button
            style={{ marginLeft: "5px", marginRight: "5px" }}
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
        }
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </Box>
  );
};

export default CartItem;
