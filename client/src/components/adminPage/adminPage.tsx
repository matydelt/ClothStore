import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import NavBar from './navBar';
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from '../../redux/actions/userActions';
import { User } from '../../redux/reducer/stateTypes';
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from 'react-router-dom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
function AdminPage() {
    const dispatch = useDispatch()
    interface userSignin {
        userInfo: User;
        loading: boolean;
    }
    interface State {
        userSignin: userSignin;
    }
    const state = useSelector((state: State) => state.userSignin)
    const auth = useAuth();
    useEffect(() => {
        dispatch(getUsers())
        if (!auth.user) {
            console.log(auth)
        }
    }, [dispatch])
    if (state.loading === false) {
        if (state.userInfo.type !== "admin") {
            console.log(state.userInfo.type + " false")
            return (<Navigate to="/" />)
        }
    } else {
        if (state.loading === true) {
            console.log(state.userInfo.type + " true")
            return (<div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><HourglassEmptyIcon /></div>)
        } else {
            console.log(" undefined")
            return (<Navigate to="/" />)
        }
    }


    return (
        <Box sx={{ height: "100%" }}>
            <NavBar></NavBar>
            <Box sx={{ display: "flex", marginTop: "100px", alignContent: "center", justifyContent: "center", borderRadius: "100px" }}>

                <Box sx={{ borderRadius: "10px", backgroundColor: "#3562", width: "50%", height: "50%" }}>
                    <p style={{ marginLeft: "5px" }}>Bienvenido! esta es la seccion de los empleados y admin!.</p>
                    <br></br>
                    <p style={{ marginLeft: "5px" }}>Publicaciones : Esta seccion sera donde podras ver las publicaciones que actualmente estan en revision , ahi podras aceptarlas o rechazarlas</p>
                    <br></br>
                    <p style={{ marginLeft: "5px" }}>Usuarios: En esta seccion podras elegir a tus empleados y bannear a aquellos usuarios que tu creas que son perjudiciales para la pagina</p>
                    <br></br>
                    <p style={{ marginLeft: "5px" }}>Denuncias: Aqui podras ver las publicaciones denunciadas por los usuarios , tal vez a algun empleado se le paso algo por alto al momento de aceptar una publicacion o tal vez haya algun problema con el vendedor</p>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminPage;
