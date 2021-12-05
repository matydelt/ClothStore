import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { putPublications } from "../../../redux/actions/publicationActions";
import { Box } from "@mui/system";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { getAllUsers } from "../../../redux/actions/usersActions";
import Collapse from "@material-ui/core/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { getallMarks } from "../../../redux/actions/marksActions";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
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

  const handleListItemClickGender = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    console.log()
    selectedValueGender===value ? setSelectedValueGender("") : setSelectedValueGender(value);
  };
  const handleListItemClickCategory = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    selectedValueCategory===value ? setSelectedValueCategory("") : setSelectedValueCategory(value);
  };
  const handleListItemClickMark = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    selectedValueMark===value ? setSelectedValueMark("") : setSelectedValueMark(value);
  };
  const handleListItemClickAuthor = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    selectedValueAuthor===value ? setSelectedValueAuthor("") : setSelectedValueAuthor(value);
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
        width: "40%",
        marginTop: "20px",
      }}
    >
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
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
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedValueGender === value?true:false}
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
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
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
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedValueCategory === value?true:false}
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
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      
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
              onClick={(event) =>
                handleListItemClickAuthor(
                  event,
                  value
                )
              }
              disabled={loading}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedValueAuthor === value?true:false}
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
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >

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
              onClick={(event) =>
                handleListItemClickMark(
                  event,
                  value
                )
              }
              disabled={loading}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedValueMark === value?true:false}
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
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        disabled={loading}
      >
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
      </ButtonGroup>
    </Box>
  );
};

export default SideBarHomePage;
