import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './components/home/Home';
import CrearPublicacion from './components/crearPublicacion/CrearPublicacion';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="nueva-publicacion" element={<CrearPublicacion />} />
    </Routes>
  );
}

export default App;
