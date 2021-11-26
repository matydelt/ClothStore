import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import CreatePublication from "./components/createPublication/CreatePublication";


const App = (): JSX.Element => {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="nueva-publicacion" element={<CreatePublication />} />
        <Route path="actualizar-publicacion/:publicationId" element={<CreatePublication />} />
      </Routes>
    </ProvideAuth>
  );
};

export default App;
