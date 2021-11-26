import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import CrearPublicacion from "./components/crearPublicacion/CrearPublicacion";
import { DataProvider } from "./context/DataProvider";

const App = (): JSX.Element => {
  return (
    <DataProvider>
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="nueva-publicacion" element={<CrearPublicacion />} />
      </Routes>
    </ProvideAuth>
    </DataProvider>
  );
};

export default App;
