import React, { useEffect, useState } from "react";
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

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cartLength())
  }, [dispatch])
  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/nueva-publicacion" element={<CreatePublication />} />
          <Route
            path="/actualizar-publicacion/:publicationId"
            element={<CreatePublication />}
          />
          <Route
            path="/:publicationId"
            element={<PublicationDetail />}
          />
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/cart" element={<CartScreen />}></Route>
          <Route path="/perfil" element={<HomeUsuarios />} />
        </Routes>
      </ThemeProvider>
    </ProvideAuth>
  );
};

export default App;
