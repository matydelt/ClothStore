/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Publication } from "../../../../redux/types"
import ENavBar from "../../employeeNavBar"
import NavBar from "../../navBar"
import { Link } from 'react-router-dom';
import "./denuncias.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { publicationMessage } from "../../../../redux/actions/publicationActions"
import CloseIcon from '@mui/icons-material/Close';
import { getDenunciations } from "../../../../redux/actions/denunciationActions"
import { Denunciation, DenunciationData } from "../../../../redux/reducer/denunciationReducers"
interface State {
    publicationList: any,
    userSignin: any,
    denunciation: any;
}

const Denuncias = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: State) => state)
    const { userInfo } = state.userSignin
    const denuncias: [DenunciationData] = state.denunciation.denunciations
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        dispatch(getDenunciations())
    }, [dispatch])
    if (!userInfo?.type || userInfo?.type === "normal") return (<div></div>)

    async function HandlerSubmit(e: React.SyntheticEvent<EventTarget>, id: string) {
        e.preventDefault()
        await dispatch(publicationMessage(id, mensaje))
        await dispatch(getDenunciations())
    }
    console.log(denuncias)
    return (
        <Box>{userInfo?.type === "admin" ?
            <NavBar></NavBar> :
            <ENavBar></ENavBar>
        }
            <Box className="box-usuarios">
                <Box sx={{ flexDirection: "row", display: "flex", borderBottom: "black solid 1px", justifyContent: "initial", width: "70%" }} className="box">
                    <p className="one">infractor</p>
                    <p className="two">Autor de la denuncia</p>
                    <p className="three">Procedimiento</p>
                    <p className="four">detalle</p>
                    <p className="four">Publicacion Denunciada</p>
                </Box>
                {denuncias?.map((e: DenunciationData) => {
                    const { denunciation, infractor, author, publication } = e
                    return (
                        <div style={{ flexDirection: "row", display: "flex", borderBottom: "#e6e6e6 solid 1px", justifyContent: "initial", width: "70%", alignItems: "center" }}>
                            <a href="#infractor" type="button" className="one" style={{ color: "black" }}><RemoveRedEyeIcon />Ver</a>
                            <a href="#author" type="button" className="two" style={{ color: "black" }}><RemoveRedEyeIcon />Ver</a>
                            <div className="three">
                                <button>estimar</button>
                                <button>desestimar</button>
                            </div>
                            <div className="three" ><p style={{ backgroundColor: "gray", width: "60%", borderRadius: "10px", padding: "4px" }}>{denunciation.message}</p></div>
                            <Link to={`/publication/${publication._id}`} target={"_blank"} className="four" style={{ color: "black" }}><RemoveRedEyeIcon />Ver</Link>
                            <div id="author" className="modal">
                                <div className="modal-contenido" style={{ display: "flex", flexDirection: "column" }}>
                                    <a href="#" style={{ display: "flex", justifyContent: "end" }}>
                                        <button style={{ color: "red", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><CloseIcon /></button>
                                    </a>
                                    <p>Este usuario reporto la publicacion</p>
                                    <p>{author.name.firstName + " " + author.name.lastName}</p>
                                    <p>{author.email}</p>
                                </div>
                            </div>
                            <div id="infractor" className="modal">
                                <div className="modal-contenido" style={{ display: "flex", flexDirection: "column" }}>
                                    <a href="#" style={{ display: "flex", justifyContent: "end" }}>
                                        <button style={{ color: "red", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><CloseIcon /></button>
                                    </a>
                                    <p>Este usuario es el dueño de la publicacion denunciada</p>
                                    <p>{infractor.name.firstName + " " + infractor.name.lastName}</p>
                                    <p>{infractor.email}</p>
                                    <p>denuncias actuales: {infractor.denunciations.length}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                }

            </Box >

        </Box >
    )
}

export default Denuncias;
