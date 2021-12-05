import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { putPublications } from "../../redux/actions/publicationActions";
import { Box } from "@mui/system";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";

function SearchOrder() {  

  const { 
    loading,
    mark,
    gender,
    category,
    price,
    author,
    name,
    order,
    page} = useSelector(
    (state: RootState) => state.publicationList
  );

  const [text, setText] = React.useState(order);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setText(value);
    dispatch(
      putPublications({
        name: name,
        order: value,
        page: page,
        mark: mark,
        category: category,
        gender: gender,
        price: price,
        author: author,
      })
    );
  };
  return (
    <Box
      component="aside"
      sx={{
        width: "40%",
        marginTop: "20px",
      }}
      >
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Orden" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        
      {["Asendente", "Desendente", "Mayor Precio", "Menor Precio"].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
        <List component="div" disablePadding>
        <ListItem
              key={value}
              dense
              role={undefined}
              button
              onClick={(event) =>
                handleListItemClick(
                  event,
                  value
                )
              }
              disabled={loading}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={text === value?true:false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
        </List>
          )})}
        
      </Collapse>
    </List>
    </Box>
  );
}

export default SearchOrder;
