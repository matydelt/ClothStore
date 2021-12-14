/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, } from "../../../../redux/actions/userActions"
import { Publication } from "../../../../redux/types"
import ENavBar from "../../employeeNavBar"
import NavBar from "../../navBar"
import { Link, Navigate } from 'react-router-dom';
import "./publicaciones.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { activatePublication, publicationMessage, putPublications } from "../../../../redux/actions/publicationActions"
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
interface State {
    publicationList: any,
    userSignin: any,
}

const PublicacionesAdmPage = () => {
    const dispatch = useDispatch()
    const { userSignin, publicationList } = useSelector((state: State) => state)
    const { userInfo } = useSelector((state: State) => state.userSignin)
    const publications = publicationList.publications;
    const [mensaje, setMensaje] = useState("");
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    if (!userInfo?.type) return (<div></div>)

    async function HandlerSubmit(e: React.SyntheticEvent<EventTarget>, id: string) {
        e.preventDefault()
        await dispatch(publicationMessage(id, mensaje))
        await dispatch(putPublications({
            name: undefined, author: undefined,
            category: undefined, gender: undefined, mark: undefined,
            order: undefined, page: undefined, price: undefined
        }))
    }
    if (userSignin.loading === false) {
        if (userSignin.userInfo.type !== "admin" && userSignin.userInfo.type !== "employee") {
            return (<Navigate to="/" />)
        }
    } else {
        if (userSignin.loading === true) {
            return (<div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><HourglassEmptyIcon /></div>)
        } else {
            return (<Navigate to="/" />)
        }
    }
    console.log(publications)
    return (
        <Box>{userInfo?.type === "admin" ?
            <NavBar></NavBar> :
            <ENavBar></ENavBar>
        }
            <Box className="box-usuarios">
                <Box sx={{ flexDirection: "row", display: "flex", borderBottom: "black solid 1px", justifyContent: "initial", width: "70%" }} className="box">
                    <p className="one">#</p>
                    <p className="two">marca</p>
                    <p className="three">Activar</p>
                    <p className="four">detalle</p>
                    <p className="four">ver</p>
                </Box>
                {
                    publications.map((e: Publication) => {
                        if (!e.state && !e.isRejected) {
                            return (
                                <div style={{ flexDirection: "row", display: "flex", borderBottom: "#e6e6e6 solid 1px", justifyContent: "initial", width: "70%", alignItems: "center" }}>
                                    <div className="one">
                                        <img src={e.images[0].url} alt="no se encontro img" style={{ width: "100px" }}></img>
                                    </div>
                                    <div className="two">
                                        <p>{e.mark}</p>
                                    </div>
                                    <div className="three" style={{ display: "flex", flexDirection: "column" }}>{flag ? <div>
                                        <div style={{ display: "flex", justifyContent: "initial", marginBottom: "2px" }}>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "initial", marginBottom: "2px" }}>
                                            <button className="rechazar" onClick={() => setFlag(!flag)}>Rechazar</button>
                                        </div> <div style={{ display: "flex", justifyContent: "initial" }}>

                                            <input type="button" value={"aceptar"} className="aceptar" style={{ display: "flex", justifyContent: "center" }} onClick={async () => {
                                                await dispatch(activatePublication(e._id, true))
                                                await dispatch(putPublications({
                                                    name: undefined, author: undefined,
                                                    category: undefined, gender: undefined, mark: undefined,
                                                    order: undefined, page: undefined, price: undefined
                                                }))
                                            }} />
                                        </div></div>

                                        : <form onSubmit={(k: React.SyntheticEvent<EventTarget>) => HandlerSubmit(k, e._id)} style={{ marginTop: "3px", marginBottom: "3px" }}>
                                            <div style={{ display: "flex", justifyContent: "initial" }}>
                                                <textarea style={{ minWidth: "90%", resize: "none", minHeight: "80px" }} value={mensaje} className="text"
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): any =>
                                                        setMensaje(e.target.value)
                                                    } />
                                            </div >
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "3px" }}>
                                                <input type={"submit"} className="aceptar" />

                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "3px" }}>
                                                <input type={"button"} className="rechazar" value={"Salir"} onClick={() => setFlag(!flag)} />

                                            </div>
                                        </form>}
                                    </div>
                                    <div className="four">
                                        <div style={{ borderRadius: "10px", backgroundColor: "#3562", width: "50%", height: "50%", padding: "3px" }}>
                                            <p>{e.detail}</p>
                                        </div>
                                    </div>
                                    <div className="four">
                                        <Link to={`/publication/${e._id}`} target={"_blank"}>
                                            <RemoveRedEyeIcon sx={{ color: "black" }} />
                                        </Link>
                                    </div>
                                </div>
                            )
                        }


                    })
                }

            </Box >


        </Box >
    )
}

export default PublicacionesAdmPage
