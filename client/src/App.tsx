import React, { useEffect } from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import CartScreen from "./pages/CartScreen";
import { useDispatch } from "react-redux";
import { cartLength, getPublications } from "./redux/actions/publicationActions";
import CreatePublication from "./components/createPublication/CreatePublication";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/controllers/themeConfig";
import Homepage from "./components/HomePage/Homepage";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import HomeUsuarios from "./components/HomeUsuarios/HomeUsuarios";
import { StylesProvider } from "@material-ui/styles";
import AdminPage from "./components/adminPage/adminPage";
import UsuariosAdmPage from "./components/adminPage/components/usuarios/usuarios";
import EmployeePage from "./components/adminPage/employeePage"
import PublicacionesAdmPage from "./components/adminPage/components/publicaciones/pubicaciones";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cartLength())
  }, [dispatch])
  useEffect(() => {
    let cart = localStorage.getItem("cart")
    if (cart) {
      cart = JSON.parse(cart)
      if (!Array.isArray(cart)) {
        localStorage.setItem("cart", "[]")
      }
    } else {
      localStorage.setItem("cart", "[]")
    }

  }, [dispatch])
  return (
    <ProvideAuth>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/admin/publicaciones" element={<PublicacionesAdmPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="/admin/usuarios" element={<UsuariosAdmPage />} />
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
            <Route path="/perfil" element={<HomeUsuarios />} />
          </Routes>
        </ThemeProvider>
      </StylesProvider>
    </ProvideAuth>
  );
};

export default App;
