import { Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { List, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { getallMarks } from "../../../redux/actions/marksActions";
import { putPublications } from "../../../redux/actions/publicationActions";
import { getAllUsers } from "../../../redux/actions/usersActions";
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

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getallMarks());
    return () => {};
  }, [dispatch]);

  const classes = useStyles();

  const { loading, mark, gender, category, price, author } = useAppSelector(
    (state) => state.publicationList
  );

  const { users } = useAppSelector((state) => state.allUsers);

  const { marks } = useAppSelector((state) => state.allMarks);

  const [selectedValueGender, setSelectedValueGender] = useState(gender);
  const [selectedValueMark, setSelectedValueMark] = useState(mark);
  const [selectedValueCategory, setSelectedValueCategory] = useState(category);
  const [selectedValueAuthor, setSelectedValueAuthor] = useState(author);

  const [open1, setOpen1] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);

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

  useEffect(() => {
    dispatch(getAllUsers());
    return () => {};
  }, [dispatch]);

  const handleListItemClickGender = (value: string) => {
    selectedValueGender === value
      ? setSelectedValueGender("")
      : setSelectedValueGender(value);
  };
  const handleListItemClickCategory = (value: string) => {
    selectedValueCategory === value
      ? setSelectedValueCategory("")
      : setSelectedValueCategory(value);
  };
  const handleListItemClickMark = (value: string) => {
    selectedValueMark === value
      ? setSelectedValueMark("")
      : setSelectedValueMark(value);
  };
  const handleListItemClickAuthor = (value: string) => {
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
        height: "fit-content",
        marginRight: "30px !important",
        marginTop: "50px !important",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        paddingBottom: "1rem",
        borderRadius: "10px",
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
                onClick={() => handleListItemClickGender(value)}
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
                onClick={() => handleListItemClickCategory(value)}
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
                onClick={() => handleListItemClickAuthor(value)}
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
                onClick={() => handleListItemClickMark(value)}
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
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
    </Box>
  );
};

export default SideBarHomePage;
