import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { putPublications } from "../../redux/actions/publicationActions";
import { Box } from "@mui/system";
import ListItemButton from "@mui/material/ListItemButton";
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      maxWidth: '50%',
      '& span': {
        margin: '0px'
      }
    },
    buttonGroup: {
      display: 'flex !importan',
      justifyContent: 'space-between',
      maxWidth: '200px',
      backgroundColor: 'transparent',
      borderRadius: '10px',
    },
    buttonGroupChild: {
      borderRadius: '10px !important',
      marginRight: '10px',
      marginTop: '15px',
      '& span': {
        margin: '0'
      }
    }
  })
);

function SearchOrder() {  

  const classes = useStyles();

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
    <Box>
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
              classes={{root: classes.list}}
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
