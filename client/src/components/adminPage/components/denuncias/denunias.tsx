/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ENavBar from "../../employeeNavBar"
import NavBar from "../../navBar"
import { Link } from 'react-router-dom';
import "./denuncias.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import { deleteDenunciations, getDenunciations, putDenunciations } from "../../../../redux/actions/denunciationActions"
import { DenunciationData } from "../../../../redux/reducer/denunciationReducers"
import { publicationMessage } from "../../../../redux/actions/publicationActions"
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

    useEffect(() => {
        dispatch(getDenunciations())
    }, [dispatch])
    if (!userInfo?.type || userInfo?.type === "normal") return (<div></div>)

    async function estimar(e: React.SyntheticEvent<EventTarget>, id: string) {
        e.preventDefault()
        try {
            await dispatch(putDenunciations(id))
            await dispatch(publicationMessage(id, "su publicacion fue denunciada, y quedara desactivada hasta que la modifique y vuelva a ser aprobada"))
            await dispatch(getDenunciations())
        } catch (e) {
            console.log(e)
        }
    }
    async function desestimar(e: React.SyntheticEvent<EventTarget>, id: string) {
        e.preventDefault()
        try {
            await dispatch(deleteDenunciations(id))
            await dispatch(getDenunciations())
        } catch (e) {
            console.log(e)
        }
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
                    console.log(infractor)
                    console.log(author)
                    if (!denunciation.state) {

                        return (
                            <div style={{ flexDirection: "row", display: "flex", borderBottom: "#e6e6e6 solid 1px", justifyContent: "initial", width: "70%", alignItems: "center" }}>
                                <div className="one">
                                    <p>{infractor.name.firstName + " " + infractor.name.lastName}</p>
                                    <p>{infractor.email}</p>
                                    <p>denuncias actuales: {infractor.denunciations.length}</p>
                                </div>
                                <div className="two">
                                    <p>{author.name.firstName + " " + author.name.lastName}</p>
                                    <p>{author.email}</p></div>
                                <div className="three" style={{ display: "flex", flexDirection: "column" }}>

                                    <div style={{ display: "flex", justifyContent: "initial" }} ><button className="estimarButton" onClick={(e: React.SyntheticEvent<EventTarget>) => estimar(e, denunciation._id)}>estimar</button></div>


                                    <div style={{ display: "flex", justifyContent: "initial" }} ><button className="desestimarButton" onClick={(e: React.SyntheticEvent<EventTarget>) => desestimar(e, denunciation._id)}>desestimar</button></div>

                                </div>
                                <div className="three" ><p style={{ backgroundColor: "gray", width: "60%", borderRadius: "10px", padding: "4px", color: "white" }}>{denunciation.message}</p></div>
                                <Link to={`/publication/${publication._id}`} target={"_blank"} className="four" style={{ color: "black" }}><RemoveRedEyeIcon />Ver</Link>
                            </div>
                        )
                    } else {
                        return <div></div>
                    }
                })
                }

            </Box >

        </Box >
    )
}

export default Denuncias;
