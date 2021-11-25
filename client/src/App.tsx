import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import CrearPublicacion from "./components/crearPublicacion/CrearPublicacion";
import RegisterScreen from "./pages/RegisterScreen";

const App = (): JSX.Element => {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="nueva-publicacion" element={<CrearPublicacion />} />
        <Route path="/register" element={<RegisterScreen />}></Route>
      </Routes>
    </ProvideAuth>
  );
};

export default App;
