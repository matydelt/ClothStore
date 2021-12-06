import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, } from "../../../../redux/actions/userActions"
import { PublicationState } from "../../../../redux/reducer/publicationReducer"
import NavBar from "../../navBar"

const PublicacionesAdmPage = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: PublicationState) => state)
    const publications = state.publicationList.publications
    console.log(publications)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    return (
        <Box>
            <NavBar></NavBar>
            <Box className="box-usuarios">
                <Box sx={{ flexDirection: "row", display: "flex", borderBottom: "black solid 1px", justifyContent: "initial", width: "70%" }} className="box">
                    <p className="one">Nombre</p>
                    <p className="two">Email</p>
                    <p className="three">Activo</p>
                    <p className="four">Empleado</p>
                </Box>

            </Box>

        </Box >
    )
}

export default PublicacionesAdmPage
