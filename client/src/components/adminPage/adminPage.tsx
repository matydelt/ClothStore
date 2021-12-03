import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UsuariosAdmPage from './components/usuarios/usuarios';
import NavBar from './navBar';
function AdminPage() {


    return (
        <>
            <Routes>
                <Route path="/" element={<NavBar></NavBar>}></Route>
                <Route path="/usuarios" element={<UsuariosAdmPage></UsuariosAdmPage>}></Route>
            </Routes>
        </>
    );
}

export default AdminPage;
