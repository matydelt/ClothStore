import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

const App = (): JSX.Element => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return <div></div>;
};

export default App;
