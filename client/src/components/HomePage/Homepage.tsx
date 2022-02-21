import { useEffect } from "react";
import Header from "./Header/Header";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import Publicaciones from "./publicaciones/publicaciones";
import { Box } from "@mui/system";
import SideBarHomePage from "./SideBarHomePage/SideBarHomePage";
import Footer from "../Footer";
import { Container } from "@mui/material";
// import SearchBar from "./SearchBar";
import Paginations from "./Pagination";
import { putPublications } from "../../redux/actions/publicationActions";
import CardsBenefit from "./CardsBenefit/CardsBenefit";
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CardsCallToAction from "./CardsCallToAction/CardsCallToAction";

const useStyles = makeStyles({
  titleTienda: {
    fontWeight: 400,
    textDecoration: "underline",
  },
  containerMain: {
    height: "max-content",
    marginTop: "80px",
  },
});

const Homepage = () => {
  const { mark, gender, category, price, author, name, order, page } =
    useAppSelector((state) => state.publicationList);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(
      putPublications({
        name: name,
        order: order,
        page: page,
        mark: mark,
        category: category,
        gender: gender,
        price: price,
        author: author,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box>
        <Header />
        <CardsCallToAction />
        <CardsBenefit />
        <Container
          classes={{ root: classes.containerMain }}
          id="tienda"
          maxWidth="lg"
        >
          <Typography
            classes={{ root: classes.titleTienda }}
            align="center"
            variant="h3"
            color="primary"
          >
            Tienda
          </Typography>
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
            }}
          >
            <SideBarHomePage />
            <Publicaciones />
          </Box>
          <Paginations />
        </Container>
        <Box sx={{ height: "200px" }} />
        <Footer />
      </Box>
    </Box>
  );
};

export default Homepage;
