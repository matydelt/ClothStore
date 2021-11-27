import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import CreatePublication from "./components/createPublication/CreatePublication";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";

const App = (): JSX.Element => {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="nueva-publicacion" element={<CreatePublication />} />
        <Route path="actualizar-publicacion/:publicationId" element={<CreatePublication />} />
        <Route path="/:publicationId" element={<PublicationDetail />} />
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
      </Routes>
    </ProvideAuth>
  );
};

export default App;
