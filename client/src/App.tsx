import React, { useEffect } from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import { DataProvider } from "./context/DataProvider";
import { useDispatch } from "react-redux";
import { getPublications } from "./redux/actions/publicationActions";
import Carrito from "./components/carrito/carrito";
import CreatePublication from "./components/createPublication/CreatePublication";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";


const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications())
  }, [dispatch])

  return (
    <ProvideAuth>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="nueva-publicacion" element={<CreatePublication />} />
          <Route path="actualizar-publicacion/:publicationId" element={<CreatePublication />} />
          <Route path="/publication/:publicationId" element={<PublicationDetail />} />
          <Route path="/cart" element={<Carrito />} />
        </Routes>
      </DataProvider>
    </ProvideAuth>
  );
};

export default App;
