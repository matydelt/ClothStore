import React, { useEffect } from "react";
import Header from "./Header/Header";
import { useSelector, useDispatch } from "react-redux";
import Publicaciones from "./publicaciones/publicaciones";
import { Box } from "@mui/system";
import SideBarHomePage from "./SideBarHomePage/SideBarHomePage";
import Footer from "../Footer";
import { Container } from "@mui/material";
import SearchBar from "./SearchBar";
import Paginations from "./Pagination";
import { putPublications } from "../../redux/actions/publicationActions";
import { RootState } from "../../redux/store/store";
import CardsBenefit from "./CardsBenefit/CardsBenefit";
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  titleTienda: {
    fontWeight: 400,
    textDecoration: 'underline'
  }
})


const Homepage = () => {
  const {
    mark,
    gender,
    category,
    price,
    author,
    name,
    order,
    page,
    count
  } = useSelector(
    (state: RootState) => state.publicationList
  );

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(putPublications({
      "name": name, "order": order, "page": page,
      "mark": mark, "category": category, "gender": gender, "price": price, "author": author
    }));
  }, []);

  return (
    <Box>
      <Header />
      <CardsBenefit />
      <Typography classes={{ root: classes.titleTienda }} align='center' variant="h3" color="primary">
        Tienda
      </Typography>
      <Container id="tienda" maxWidth="lg">
        <Box
          component="main"
          sx={{
            height: "100%",
            maxWidth: "1215px",
            paddingLeft: "10px",
            paddingRight: "28px",
            width: "100%",
            display: "flex",
            marginBottom: "30px",
            marginTop: "70px",
          }}
        >
          <SideBarHomePage />
          <Publicaciones />
        </Box>
        <Paginations />
      </Container>
      <Box sx={{ height: "70%" }} />
      <Footer />
    </Box>
  );
};

export default Homepage;
