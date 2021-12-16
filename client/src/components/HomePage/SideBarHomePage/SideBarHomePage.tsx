import { Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { List, ListItemIcon, ListItemText, ListItem } from "@material-ui/core";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallMarks } from "../../../redux/actions/marksActions";
import { putPublications } from "../../../redux/actions/publicationActions";
import { getAllUsers } from "../../../redux/actions/usersActions";
import { RootState } from "../../../redux/store/store";
import SearchOrder from "../Order";
import SearchBar from "../SearchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "70%",
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

const SideBarHomePage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getallMarks());
    return () => {};
  }, [dispatch]);

  const classes = useStyles();

  const { loading, mark, gender, category, price, author } = useSelector(
    (state: RootState) => state.publicationList
  );

  const { users } = useSelector((state: RootState) => state.allUsers);

  const { marks } = useSelector((state: RootState) => state.allMarks);

  const [selectedValueGender, setSelectedValueGender] = React.useState(gender);
  const [selectedValueMark, setSelectedValueMark] = React.useState(mark);
  const [selectedValueCategory, setSelectedValueCategory] =
    React.useState(category);
  const [selectedValueAuthor, setSelectedValueAuthor] = React.useState(author);

  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const [open3, setOpen3] = React.useState(true);
  const [open4, setOpen4] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  React.useEffect(() => {
    dispatch(getAllUsers());
    return () => {};
  }, [dispatch]);

  const handleListItemClickGender = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    console.log();
    selectedValueGender === value
      ? setSelectedValueGender("")
      : setSelectedValueGender(value);
  };
  const handleListItemClickCategory = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    selectedValueCategory === value
      ? setSelectedValueCategory("")
      : setSelectedValueCategory(value);
  };
  const handleListItemClickMark = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    selectedValueMark === value
      ? setSelectedValueMark("")
      : setSelectedValueMark(value);
  };
  const handleListItemClickAuthor = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    selectedValueAuthor === value
      ? setSelectedValueAuthor("")
      : setSelectedValueAuthor(value);
  };

  const handleReset = () => {
    dispatch(
      putPublications({
        name: "",
        order: "",
        page: "",
        mark: "",
        category: "",
        gender: "",
        price: "",
        author: "",
      })
    );
    setSelectedValueGender("");
    setSelectedValueMark("");
    setSelectedValueCategory("");
    setSelectedValueAuthor("");
  };

  const handleSubmit = () => {
    dispatch(
      putPublications({
        name: "",
        order: "",
        page: "",
        mark: selectedValueMark,
        category: selectedValueCategory,
        gender: selectedValueGender,
        price: price,
        author: selectedValueAuthor,
      })
    );
  };

  return (
    <Box
      component="aside"
      sx={{
        width: "40% !important",
        marginRight: "30px !important",
        marginTop: "20px !important",
      }}
    >
      <SearchBar />
      <SearchOrder />
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick1}>
          <ListItemText primary="Genero" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          {["Hombre", "Mujer", "Niños"].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                dense
                role={undefined}
                button
                onClick={(event) => handleListItemClickGender(event, value)}
                disabled={loading}
                classes={{ root: classes.list }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedValueGender === value ? true : false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </Collapse>
      </List>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick2}>
          <ListItemText primary="Categoria" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          {["Remera", "Patanlon", "Zapatillas", "Zapatos"].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                dense
                role={undefined}
                button
                onClick={(event) => handleListItemClickCategory(event, value)}
                disabled={loading}
                classes={{ root: classes.list }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedValueCategory === value ? true : false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </Collapse>
      </List>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick3}>
          <ListItemText primary="Vendedor" />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          {users?.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                dense
                role={undefined}
                button
                onClick={(event) => handleListItemClickAuthor(event, value)}
                disabled={loading}
                classes={{ root: classes.list }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedValueAuthor === value ? true : false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </Collapse>
      </List>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick4}>
          <ListItemText primary="Marca" />
          {open4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open4} timeout="auto" unmountOnExit>
          {marks?.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                dense
                role={undefined}
                button
                onClick={(event) => handleListItemClickMark(event, value)}
                disabled={loading}
                classes={{ root: classes.list }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedValueMark === value ? true : false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </Collapse>
      </List>
      <Button
        color="primary"
        variant="contained"
        classes={{ root: classes.buttonGroupChild }}
        onClick={handleSubmit}
      >
        Enviar
      </Button>
      <Button
        color="primary"
        variant="contained"
        classes={{ root: classes.buttonGroupChild }}
        onClick={handleReset}
      >
        Reiniciar
      </Button>
    </Box>
  );
};

export default SideBarHomePage;
