import React, { useEffect, useState } from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import { DataProvider } from "./context/DataProvider";
import { useDispatch } from "react-redux";
import { getPublications } from "./redux/actions/publicationActions";
import Carrito from "./components/carrito/carrito";
import CreatePublication from "./components/createPublication/CreatePublication";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import { ThemeProvider } from "@mui/material/styles"
import theme from "./components/controllers/themeConfig";
import Homepage from "./components/HomePage/Homepage";


const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications())
  }, [dispatch])

  return (
    <ProvideAuth>
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="nueva-publicacion" element={<CreatePublication />} />
            <Route path="actualizar-publicacion/:publicationId" element={<CreatePublication />} />
            <Route path="/publication/:publicationId" element={<PublicationDetail />} />
            <Route path="/cart" element={<Carrito />} />
          </Routes>
        </ThemeProvider>
      </DataProvider>
    </ProvideAuth >
  );
};

export default App;
