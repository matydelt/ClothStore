import React from "react";
import { ProvideAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticationButton from "./components/AuthenticationButton";

const App = (): JSX.Element => {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<AuthenticationButton />}></Route>
      </Routes>
    </ProvideAuth>
  );
};

export default App;
