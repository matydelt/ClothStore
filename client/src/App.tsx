import React, { useEffect } from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import CrearPublicacion from "./components/crearPublicacion/CrearPublicacion";
import { DataProvider } from "./context/DataProvider";
import {  useDispatch } from "react-redux";
import { publications } from "./redux/actions";
import HomeUsuarios from "./components/HomeUsuarios/HomeUsuarios";

const App = (): JSX.Element => {
   const dispatch = useDispatch();

   useEffect(()=>{
     dispatch(publications())
   },[])

  return (
    <DataProvider>
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="nueva-publicacion" element={<CrearPublicacion />} />
        <Route path="/perfil" element={<HomeUsuarios/>}/>
      </Routes>
     </ProvideAuth>
    </DataProvider>
  );
};

export default App;
