import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import NavBar from './employeeNavBar';
import { useDispatch } from "react-redux"
import { getUsers } from '../../redux/actions/userActions';
function EmployeePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <Box sx={{ height: "100%" }}>
            <NavBar></NavBar>
            <Box sx={{ display: "flex", marginTop: "100px", alignContent: "center", justifyContent: "center", borderRadius: "100px" }}>

                <Box sx={{ borderRadius: "10px", backgroundColor: "#3562", width: "50%", height: "50%" }}>
                    <p style={{ marginLeft: "5px" }}>Bienvenido! esta es la seccion de los empleados y admin!.</p>
                    <br></br>
                    <p style={{ marginLeft: "5px" }}>Publicaciones : Esta seccion sera donde podras ver las publicaciones que actualmente estan en revision , ahi podras aceptarlas o rechazarlas</p>
                    <br></br>
                    <p>Denuncias: Aqui podras ver las publicaciones denunciadas por los usuarios , tal vez a algun empleado se le paso algo por alto al momento de aceptar una publicacion o tal vez haya algun problema con el vendedor</p>

                </Box>
            </Box>
        </Box>
    );
}

export default EmployeePage;
