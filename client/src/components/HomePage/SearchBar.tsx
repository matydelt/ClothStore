import * as React from "react";
import { useDispatch } from "react-redux";
import { putPublications } from "../../redux/actions/publicationActions";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import Autocomplete from "./Autocomplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "84%",
      paddingLeft: "1rem",
      paddingTop: "1rem",
    },
  })
);

function SearchBar() {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSearchBar = (event: any): void => {
    dispatch(putPublications({ name: text }));
    setText("");
  };

  const handleSearchBarEnter: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ): void => {
    if (event.key === "Enter") {
      dispatch(putPublications({ name: text }));
      setText("");
    }
  };

  return (
    <Box>
      <TextField
        autoComplete="off"
        classes={{ root: classes.textField }}
        placeholder="Buscar"
        type="search"
        variant="standard"
        value={text}
        onChange={(event) => setText(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                onClick={handleSearchBar}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        onKeyPress={handleSearchBarEnter}
      />
      <Autocomplete text={text}></Autocomplete>
    </Box>
  );
}

export default SearchBar;
