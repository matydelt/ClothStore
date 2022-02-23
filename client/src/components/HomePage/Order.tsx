import { useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/reduxHooks";
import { putPublications } from "../../redux/actions/publicationActions";
import { Box } from "@mui/system";
import ListItemButton from "@mui/material/ListItemButton";
import { List, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      maxWidth: "50%",
      "& span": {
        margin: "0px",
      },
    },
    buttonGroup: {
      display: "flex !importan",
      justifyContent: "space-between",
      maxWidth: "200px",
      backgroundColor: "transparent",
      borderRadius: "10px",
    },
    buttonGroupChild: {
      borderRadius: "10px !important",
      marginRight: "10px",
      marginTop: "15px",
      "& span": {
        margin: "0",
      },
    },
  })
);

function SearchOrder() {
  const classes = useStyles();

  const { loading, mark, gender, category, price, author, name, order, page } =
    useAppSelector((state) => state.publicationList);

  const [text, setText] = useState(order);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
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
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Orden" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {["Asendente", "Desendente", "Mayor Precio", "Menor Precio"].map(
            (value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <List component="div" disablePadding key={value}>
                  <ListItem
                    key={value}
                    dense
                    role={undefined}
                    button
                    onClick={(event) => handleListItemClick(event, value)}
                    disabled={loading}
                    classes={{ root: classes.list }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={text === value ? true : false}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItem>
                </List>
              );
            }
          )}
        </Collapse>
      </List>
    </Box>
  );
}

export default SearchOrder;
