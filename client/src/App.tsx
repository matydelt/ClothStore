import React, { useEffect } from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import CartScreen from "./pages/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  cartLength,
  getPublications,
} from "./redux/actions/publicationActions";
import CreatePublication from "./components/createPublication/CreatePublication";
// import { ThemeProvider } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./components/controllers/themeConfig";
import Homepage from "./components/HomePage/Homepage";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import HomeUsuarios from "./components/HomeUsuarios/HomeUsuarios";
import RequireAuth from "./components/RequireAuth";

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const {} = useSelector((state) => state);

  useEffect(() => {
    dispatch(
      getPublications(
        { name: "", order: "", page: "1" },
        { mark: "", category: "", gender: "", price: "", author: "" }
      )
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(cartLength());
  }, [dispatch]);

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      if (!Array.isArray(cart)) {
        localStorage.setItem("cart", "[]");
      }
    } else {
      localStorage.setItem("cart", "[]");
    }
  }, [dispatch]);

  return (
    <ProvideAuth>
      <MuiThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/nueva-publicacion" element={<CreatePublication />} />
          <Route
            path="/actualizar-publicacion/:publicationId"
            element={<CreatePublication />}
          />
          <Route
            path="/publication/:publicationId"
            element={<PublicationDetail />}
          />
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/cart" element={<CartScreen />}></Route>
          <Route
            path="/perfil"
            element={
              <RequireAuth>
                <HomeUsuarios />
              </RequireAuth>
            }
          />
        </Routes>
      </MuiThemeProvider>
    </ProvideAuth>
  );
};

export default App;
