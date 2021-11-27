import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import CrearPublicacion from "./components/crearPublicacion/CrearPublicacion";
import Homepage from "./components/HomePage/Homepage";
import { ThemeProvider } from "@mui/material/styles"
import theme from "./components/controllers/themeConfig";

const App = (): JSX.Element => {
  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home_page" element={<Homepage/>} />
        <Route path="/nueva-publicacion" element={<CrearPublicacion />} />
      </Routes>
      </ThemeProvider>
    </ProvideAuth>
  );
};

export default App;
