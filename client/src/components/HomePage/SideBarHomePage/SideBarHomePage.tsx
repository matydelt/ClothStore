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
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("");
  const { loading } = useSelector((state: RootState) => state.publicationList);

  const dispatch = useDispatch();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setSelectedValue(value);
  };

  const handleReset = () => {
    setSelectedValue("");
    dispatch(putPublications({}, {}));
  };

  const handleSubmit = () => {
    dispatch(putPublications({}, { gender: selectedValue }));
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
        className={classes.list}
        subheader={<ListSubheader>Genero</ListSubheader>}
      >
        {["Hombre", "Mujer", "Niños"].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              dense
              role={undefined}
              button
              onClick={(event) => handleListItemClick(event, value)}
              disabled={loading}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedValue === value}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
      <List
        className={classes.list}
        subheader={<ListSubheader>Categorias</ListSubheader>}
      ></List>
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
