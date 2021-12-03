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
  putPublications,
} from "./redux/actions/publicationActions";
import CreatePublication from "./components/createPublication/CreatePublication";
// import { ThemeProvider } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./components/controllers/themeConfig";
import Homepage from "./components/HomePage/Homepage";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import HomeUsuarios from "./components/HomeUsuarios/HomeUsuarios";
import { StylesProvider } from "@material-ui/styles";
import AdminPage from "./components/adminPage/adminPage";
import UsuariosAdmPage from "./components/adminPage/components/usuarios/usuarios";
import RequireAuth from "./components/RequireAuth";
import { RootState } from "./redux/store/store"

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const { name, order, page, mark, category, gender, price, author } = useSelector((state: RootState) => (state.publicationList))

  useEffect(() => {
    dispatch(putPublications({"name":name, "order":order, "page":page, "mark": mark, "category": category, "gender": gender, "price": price, "author": author} ));
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
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
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
            <Route path="/perfil" element={<RequireAuth><HomeUsuarios /></RequireAuth>} />
          </Routes>
        </MuiThemeProvider>
      </StylesProvider>
    </ProvideAuth>
  );
};

export default App;
